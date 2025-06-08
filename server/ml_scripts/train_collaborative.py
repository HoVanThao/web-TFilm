import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from implicit.als import AlternatingLeastSquares
import pickle
import json
import os
from bson import ObjectId
from db_connect import connect_to_mongodb
import sys
import io
from pathlib import Path

# Cấu hình mã hóa cho stdout để hỗ trợ Unicode
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Thêm bộ chuyển đổi JSON cho ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        if isinstance(obj, pd.Timestamp):
            return obj.isoformat()
        return super().default(obj)

# Sử dụng ALS (Alternating Least Squares) cho collaborative filtering
# Xử lý dữ liệu tương tác user-movie
# Lưu model và mappings

def prepare_interaction_data(db):
    """Chuẩn bị dữ liệu tương tác user-movie từ MongoDB"""
    # Lấy tất cả reviews và liked movies
    movies_with_reviews = list(db.movies.find({}, {
        '_id': 1,
        'reviews': 1
    }))
    
    users_with_likes = list(db.users.find({}, {
        '_id': 1,
        'likedMovies': 1
    }))
    
    interactions = []
    
    # Xử lý reviews
    for movie in movies_with_reviews:
        movie_id = str(movie['_id'])
        if 'reviews' in movie and movie['reviews']:
            for review in movie['reviews']:
                user_id = str(review['userId'])
                # Tính confidence từ rating và impactScore
                confidence = float(review['rating']) / 5.0
                if 'impactScore' in review:
                    confidence *= float(review['impactScore'])
                
                interactions.append({
                    'user_id': user_id,
                    'movie_id': movie_id,
                    'confidence': confidence,
                    'type': 'review'
                })
    
    # Xử lý liked movies
    for user in users_with_likes:
        user_id = str(user['_id'])
        if 'likedMovies' in user and user['likedMovies']:
            for movie_id in user['likedMovies']:
                # Liked movies có confidence cao hơn
                interactions.append({
                    'user_id': user_id,
                    'movie_id': str(movie_id),
                    'confidence': 1.0,  # Cao nhất vì user đã like
                    'type': 'like'
                })
    
    # Convert to DataFrame
    df = pd.DataFrame(interactions)
    
    if len(df) == 0:
        print("Warning: Khong co du lieu tuong tac nao!")
        return None, None, None
    
    # Gộp các tương tác trùng lặp (nếu user vừa like vừa review)
    df_grouped = df.groupby(['user_id', 'movie_id'])['confidence'].max().reset_index()
    
    # Create user and movie mappings
    user_ids = df_grouped['user_id'].unique()
    movie_ids = df_grouped['movie_id'].unique()
    
    user_map = {id: idx for idx, id in enumerate(user_ids)}
    movie_map = {id: idx for idx, id in enumerate(movie_ids)}
    
    # Convert IDs to indices
    df_grouped['user_idx'] = df_grouped['user_id'].map(user_map)
    df_grouped['movie_idx'] = df_grouped['movie_id'].map(movie_map)
    
    print(f"Da xu ly {len(df)} tuong tac tu {len(user_ids)} users va {len(movie_ids)} movies")
    return df_grouped, user_map, movie_map

def create_sparse_matrix(df):
    """Tạo sparse matrix từ DataFrame"""
    sparse_matrix = csr_matrix((df['confidence'], 
                              (df['user_idx'], df['movie_idx'])))
    return sparse_matrix

def train_als_model(sparse_matrix, factors=100, iterations=30, regularization=0.1):
    """Training ALS model với các tham số tối ưu"""
    model = AlternatingLeastSquares(
        factors=factors,
        iterations=iterations,
        regularization=regularization,
        random_state=42,
        calculate_training_loss=True
    )
    
    # Fit model
    model.fit(sparse_matrix)
    
    return model

def save_models(model, user_map, movie_map, training_stats=None):
    """Lưu models và mappings"""
    # Tạo đường dẫn tuyệt đối đến thư mục models trong ml_scripts
    script_dir = Path(__file__).parent.absolute()
    models_dir = os.path.join(script_dir, 'models')
    
    # Tạo thư mục models nếu chưa tồn tại
    if not os.path.exists(models_dir):
        os.makedirs(models_dir)
    
    print(f"Saving models to: {models_dir}")
    
    # Lưu ALS model
    als_model_path = os.path.join(models_dir, 'als_model.pkl')
    with open(als_model_path, 'wb') as f:
        pickle.dump(model, f)
    
    # Lưu user và movie mappings
    collaborative_data = {
        'user_map': user_map,
        'movie_map': movie_map,
        'training_stats': training_stats,
        'last_updated': pd.Timestamp.now()
    }
    
    collab_data_path = os.path.join(models_dir, 'collaborative_data.json')
    with open(collab_data_path, 'w') as f:
        json.dump(collaborative_data, f, cls=JSONEncoder)

def main():
    print("Bat dau training collaborative filtering model...")
    
    # Kết nối database
    db = connect_to_mongodb()
    
    # Chuẩn bị dữ liệu
    print("Dang chuan bi du lieu tuong tac...")
    df, user_map, movie_map = prepare_interaction_data(db)
    
    if df is None:
        print("Khong co du du lieu de training!")
        return
    
    # Tạo sparse matrix
    print("Dang tao sparse matrix...")
    sparse_matrix = create_sparse_matrix(df)
    
    # Training model
    print("Dang training ALS model...")
    model = train_als_model(sparse_matrix)
    
    # Thu thập thống kê training
    training_stats = {
        'n_users': len(user_map),
        'n_movies': len(movie_map),
        'n_interactions': len(df),
        'sparsity': 1 - (len(df) / (len(user_map) * len(movie_map))),
        'model_factors': model.factors,
        'model_iterations': model.iterations
    }
    
    # Lưu models và mappings
    print("Dang luu models...")
    save_models(model, user_map, movie_map, training_stats)
    
    print(f"Hoan thanh training collaborative filtering model!")
    print(f"Thong ke:")
    for key, value in training_stats.items():
        print(f"- {key}: {value}")

if __name__ == "__main__":
    main() 