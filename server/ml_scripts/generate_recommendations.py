import pandas as pd
import numpy as np
import pickle
import json
import os
from bson import ObjectId
from datetime import datetime, timezone
from db_connect import connect_to_mongodb
import sys
import io
from pathlib import Path

# Cấu hình mã hóa cho stdout để hỗ trợ Unicode
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Kết hợp cả 2 phương pháp (hybrid)
# Content-based weight: 0.3
# Collaborative weight: 0.7
# Cập nhật recommendations vào MongoDB
# cd server/ml_scripts
# python -m venv venv
# .\venv\Scripts\activate
# python -m pip install --upgrade pip
# pip install -r requirements.txt
# python train_collaborative.py
# python train_content_based.py
# python generate_recommendations.py
# deactivate

def load_models():
    """Load các models đã trained"""
    try:
        # Tạo đường dẫn tuyệt đối đến thư mục models
        script_dir = Path(__file__).parent.absolute()
        models_dir = os.path.join(script_dir, 'models')
        
        print(f"Loading models from: {models_dir}")
        
        # Load content-based models
        content_sim_path = os.path.join(models_dir, 'content_based_sim_matrix.npy')
        content_sim = np.load(content_sim_path)
        
        metadata_path = os.path.join(models_dir, 'content_based_metadata.json')
        with open(metadata_path, 'r', encoding='utf-8') as f:
            content_metadata = json.load(f)
        
        # Load collaborative models
        als_model_path = os.path.join(models_dir, 'als_model.pkl')
        with open(als_model_path, 'rb') as f:
            collab_model = pickle.load(f)
            
        collab_data_path = os.path.join(models_dir, 'collaborative_data.json')
        with open(collab_data_path, 'r') as f:
            collab_data = json.load(f)
        
        return {
            'content_sim': content_sim,
            'content_metadata': content_metadata,
            'collab_model': collab_model,
            'collab_data': collab_data
        }
    except Exception as e:
        print(f"Loi khi load models: {str(e)}")
        return None

def get_content_based_recommendations(models, movie_ids, n=10):
    """Lấy recommendations dựa trên nội dung phim"""
    content_sim = models['content_sim']
    content_metadata = models['content_metadata']
    indices = content_metadata['indices']
    
    # Tính similarity scores cho mỗi phim
    sim_scores = np.zeros(content_sim.shape[0])
    valid_movies = 0
    
    for movie_id in movie_ids:
        if str(movie_id) in indices:
            idx = int(indices[str(movie_id)])
            sim_scores += content_sim[idx]
            valid_movies += 1
    
    if valid_movies > 0:
        sim_scores /= valid_movies
    
    # Lấy top N phim có similarity cao nhất
    movie_indices = sim_scores.argsort()[::-1]
    recommendations = []
    
    for idx in movie_indices:
        # Tìm movie_id từ index
        for movie_id, movie_idx in indices.items():
            if int(movie_idx) == idx and movie_id not in movie_ids:
                recommendations.append({
                    'movieId': movie_id,
                    'score': float(sim_scores[idx]),
                    'source': 'content'
                })
                if len(recommendations) >= n:
                    break
    
    return recommendations

def get_collaborative_recommendations(models, user_id, n=10):
    """Lấy recommendations dựa trên collaborative filtering"""
    collab_model = models['collab_model']
    collab_data = models['collab_data']
    user_map = collab_data['user_map']
    movie_map = collab_data['movie_map']
    
    if str(user_id) not in user_map:
        return []
    
    # Lấy user index
    user_idx = user_map[str(user_id)]
    
    # Lấy recommendations từ model
    recommendations = []
    try:
        # Lấy top N items cho user
        user_recs = collab_model.recommend(
            user_idx,
            None,  # user_items sparse matrix
            N=n,
            filter_already_liked_items=True
        )
        
        # Convert indices back to movie IDs
        reverse_movie_map = {str(v): k for k, v in movie_map.items()}
        for movie_idx, score in user_recs:
            if str(movie_idx) in reverse_movie_map:
                recommendations.append({
                    'movieId': reverse_movie_map[str(movie_idx)],
                    'score': float(score),
                    'source': 'collaborative'
                })
    except Exception as e:
        print(f"Loi khi lay collaborative recommendations: {str(e)}")
    
    return recommendations

def combine_recommendations(content_recs, collab_recs, content_weight=0.3, collab_weight=0.7):
    """Kết hợp recommendations từ cả hai model"""
    # Tạo dictionary để gộp scores
    combined_scores = {}
    
    # Thêm content-based recommendations
    for rec in content_recs:
        combined_scores[rec['movieId']] = {
            'score': rec['score'] * content_weight,
            'sources': ['content']
        }
    
    # Thêm collaborative recommendations
    for rec in collab_recs:
        if rec['movieId'] in combined_scores:
            combined_scores[rec['movieId']]['score'] += rec['score'] * collab_weight
            combined_scores[rec['movieId']]['sources'].append('collaborative')
        else:
            combined_scores[rec['movieId']] = {
                'score': rec['score'] * collab_weight,
                'sources': ['collaborative']
            }
    
    # Convert to list và sort theo score
    recommendations = []
    for movie_id, data in combined_scores.items():
        recommendations.append({
            'movieId': ObjectId(movie_id),
            'score': data['score'],
            'reason': 'Dua tren ' + ' va '.join(data['sources']),
            'timestamp': datetime.now()
        })
    
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    return recommendations

def update_user_recommendations(db, user_id, recommendations):
    """Cập nhật recommendations vào MongoDB"""
    try:
        # Lấy thời gian hiện tại theo UTC (không sử dụng múi giờ local)
        current_time = datetime.now(timezone.utc).replace(tzinfo=None)
        
        db.users.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'recommendations.movies': recommendations,
                    'recommendations.lastUpdated': current_time
                }
            }
        )
        print(f"Da cap nhat {len(recommendations)} recommendations cho user {user_id}")
        return True
    except Exception as e:
        print(f"Loi khi cap nhat MongoDB: {str(e)}")
        return False

def get_user_movie_history(db, user_id):
    """Lấy lịch sử phim của user (đã xem, đã thích)"""
    try:
        user = db.users.find_one(
            {'_id': ObjectId(user_id)},
            {'likedMovies': 1}
        )
        
        # Lấy phim đã review
        reviewed_movies = db.movies.distinct(
            '_id',
            {'reviews.userId': ObjectId(user_id)}
        )
        
        movie_history = set()
        
        # Thêm phim đã thích
        if user and 'likedMovies' in user:
            movie_history.update([str(movie_id) for movie_id in user['likedMovies']])
        
        # Thêm phim đã review
        movie_history.update([str(movie_id) for movie_id in reviewed_movies])
        
        return list(movie_history)
    except Exception as e:
        print(f"Loi khi lay lich su phim: {str(e)}")
        return []

# Quá trình kết hợp gồm các bước:
# 1. Lấy kết quả từ hai mô hình:
# content_recs: Danh sách phim gợi ý từ mô hình content-based
# collab_recs: Danh sách phim gợi ý từ mô hình collaborative filtering

# 2. Áp dụng trọng số:
# Content-based: score * 0.3 (30% trọng số)
# Collaborative: score * 0.7 (70% trọng số)

# 3.Kết hợp điểm số:
# Nếu một phim xuất hiện trong cả hai danh sách, điểm số sẽ được cộng lại
# Ví dụ: Phim A có điểm content = 0.8, điểm collab = 0.9
# Điểm cuối cùng = 0.8 * 0.3 + 0.9 * 0.7 = 0.24 + 0.63 = 0.87

# 4. Sắp xếp kết quả:
# Sắp xếp phim theo điểm số từ cao xuống thấp
# Lấy top phim có điểm cao nhất

# Cách tiếp cận hybrid này kết hợp ưu điểm của cả hai phương pháp:
# Collaborative filtering: Học từ hành vi người dùng (70% trọng số)
# Content-based: Dựa trên nội dung phim (30% trọng số)
# Điều này giúp hệ thống gợi ý vừa phù hợp với sở thích người dùng, vừa có thể giới thiệu phim mới dựa trên nội dung.
def main():
    """Hàm chính để generate recommendations"""
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python generate_recommendations.py <user_id>")
        return
    
    user_id = sys.argv[1]
    print(f"Generating recommendations for user {user_id}")
    
    # Load models
    models = load_models()
    if not models:
        print("Khong the load models!")
        return
    
    # Kết nối MongoDB
    db = connect_to_mongodb()
    
    # Lấy lịch sử phim của user
    movie_history = get_user_movie_history(db, user_id)
    print(f"Da tim thay {len(movie_history)} phim trong lich su")
    
    # Lấy recommendations từ cả hai model
    content_recs = get_content_based_recommendations(models, movie_history, n=20)
    print(f"Da tao {len(content_recs)} content-based recommendations")
    
    collab_recs = get_collaborative_recommendations(models, user_id, n=20)
    print(f"Da tao {len(collab_recs)} collaborative recommendations")
    
    # Kết hợp recommendations
    final_recommendations = combine_recommendations(content_recs, collab_recs)
    print(f"Da ket hop thanh {len(final_recommendations)} recommendations")
    
    # Cập nhật vào MongoDB
    if update_user_recommendations(db, user_id, final_recommendations[:6]):
        print("Hoan thanh!")
    else:
        print("Co loi khi cap nhat recommendations!")

if __name__ == "__main__":
    main() 