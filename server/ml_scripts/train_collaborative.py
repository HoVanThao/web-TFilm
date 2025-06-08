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

# 1. Giải thích về confidence trong đánh giá:
# confidence = rating/5 * impactScore là công thức tính độ tin cậy của một đánh giá trong hệ thống gợi ý:
# rating/5: Chuẩn hóa điểm đánh giá về khoảng [0, 1]. Nếu người dùng đánh giá 5 sao, giá trị này sẽ là 1.0; nếu đánh giá 3 sao, giá trị sẽ là 0.6.
# impactScore: Là hệ số ảnh hưởng của đánh giá, mặc định là 1.0 (được định nghĩa trong MoviesModel.js). Hệ số này cho phép hệ thống điều chỉnh mức độ ảnh hưởng của từng đánh giá đến việc gợi ý:
# Đánh giá từ người dùng chuyên gia có thể có impactScore cao hơn
# Đánh giá spam có thể được đặt impactScore thấp
# Đánh giá chi tiết có thể có impactScore cao hơn đánh giá ngắn
# Công thức này đảm bảo rằng:
# Đánh giá cao (4-5 sao) có ảnh hưởng lớn hơn đánh giá thấp
# Hệ thống có thể tinh chỉnh ảnh hưởng của từng đánh giá thông qua impactScore
# Tạo ma trận thưa từ dữ liệu tương tác
# Dòng = user_idx, cột = movie_idx, giá trị = confidence
def create_sparse_matrix(df):
    """Tạo sparse matrix từ DataFrame"""
    sparse_matrix = csr_matrix((df['confidence'], 
                              (df['user_idx'], df['movie_idx'])))
    return sparse_matrix



# 2. Giải thích về lưu mô hình ALS dạng pickle và ánh xạ user/movie dạng JSON:
# Lưu mô hình ALS dạng pickle:
# Pickle là định dạng lưu trữ đối tượng Python, cho phép lưu toàn bộ cấu trúc và trạng thái của mô hình ALS
# Mô hình ALS chứa:
# user_factors: Ma trận các vector đặc trưng của người dùng (kích thước: số người dùng × số chiều factors)
# item_factors: Ma trận các vector đặc trưng của phim (kích thước: số phim × số chiều factors)
# Các tham số khác: regularization, iterations, alpha...
# Lưu dạng pickle giúp dễ dàng tải lại mô hình mà không cần huấn luyện lại
# factors=100 (số chiều của vector đặc trưng)
# iterations=30 (số vòng lặp)
# regularization=0.1 (hệ số điều chuẩn)

# Lưu ánh xạ user và movie dạng JSON:
# Ánh xạ user_map và movie_map là các từ điển chuyển đổi giữa ID thực (MongoDB ObjectId) và chỉ số (index) trong ma trận:
# user_map: {"677d8e1896450a1b29d2c5fb": 0, "684592942abe1d1c682555e3": 1, ...}
# movie_map: {"681d239c707a4776559110f7": 0, "681d239c707a4776559110fc": 1, ...}
# Lưu dạng JSON vì:
# Dễ đọc và chỉnh sửa thủ công nếu cần
# Tương thích tốt với các ứng dụng web/JavaScript
# Có thể dễ dàng chuyển đổi giữa các ngôn ngữ khác nhau
# Nhẹ hơn pickle và an toàn hơn khi chia sẻ
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


# Khi cần đưa ra gợi ý, hệ thống sẽ:
# Tải mô hình ALS từ file pickle
# Tải ánh xạ user/movie từ file JSON
# Chuyển đổi ID người dùng thành chỉ số bằng user_map
# Sử dụng mô hình để dự đoán và chuyển đổi ngược chỉ số phim thành ID bằng movie_map
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


# Thuật toán ALS (Alternating Least Squares) trong hệ thống gợi ý phim:
# Thu thập dữ liệu tương tác: Lấy đánh giá (rating) và phim đã thích (liked) của người dùng.
# Tính điểm tin cậy (confidence):
# Đánh giá: confidence = rating/5 × impactScore
# Phim đã thích: confidence = 1.0 (cao nhất)
# Tạo ma trận thưa: Mỗi dòng là người dùng, mỗi cột là phim, giá trị là điểm tin cậy.
# Phân rã ma trận: Tìm hai ma trận nhỏ hơn:
# Ma trận đặc trưng người dùng (user_factors)
# Ma trận đặc trưng phim (item_factors)
# Tối ưu hóa luân phiên: Cố định một ma trận và tối ưu ma trận còn lại, lặp lại nhiều lần.
# Dự đoán gợi ý: Nhân hai ma trận để dự đoán mức độ ưa thích của người dùng với phim chưa xem.
# Lưu trữ mô hình: Lưu ma trận đặc trưng dạng pickle và ánh xạ ID dạng JSON.

# Sau khi train, mô hình ALS sẽ tạo ra hai ma trận:
# user_factors: Ma trận kích thước (số_người_dùng × 100)
# Mỗi dòng là vector đặc trưng của một người dùng
# Mỗi người dùng được biểu diễn bằng 100 đặc trưng ẩn
# item_factors: Ma trận kích thước (số_phim × 100)
# Mỗi dòng là vector đặc trưng của một phim
# Mỗi phim được biểu diễn bằng 100 đặc trưng ẩn


# Cụ thể, khi dự đoán:
# Hệ thống lấy vector đặc trưng của người dùng từ ma trận user_factors[user_idx] (kích thước 1×100)
# Nhân với ma trận chuyển vị của item_factors (kích thước 100×số_phim)
# Kết quả là vector điểm số (kích thước 1×số_phim) cho biết mức độ phù hợp của người dùng với từng phim
# Sắp xếp và lấy top N phim có điểm cao nhất
# Đây là quá trình dự đoán cơ bản của mô hình ALS. Vector đặc trưng của người dùng đã được học trong quá trình huấn luyện và được lưu trong ma trận user_factors.

#====================================================
# 1. Dữ liệu đầu vào
# Ma trận tương tác: Người dùng × Phim, giá trị là độ tin cậy (confidence)
# Đánh giá: confidence = rating/5 × impactScore
# Phim đã thích: confidence = 1.0

# 2. Quá trình huấn luyện
# Phân rã ma trận tương tác thành hai ma trận nhỏ hơn:
# user_factors: Ma trận (số_người_dùng × 100)
# item_factors: Ma trận (số_phim × 100)
# Lưu trữ kết quả:
# Ma trận đặc trưng → als_model.pkl
# Ánh xạ ID → collaborative_data.json

# 3. Quá trình dự đoán
# Nhân ma trận để tính điểm phù hợp:
# score = user_factors[user_idx] · item_factors^T
# Sắp xếp và lấy top N phim có điểm cao nhất

# 4. Cập nhật khi có dữ liệu mới
# Người dùng mới/thay đổi: Tính lại user_factors cho người đó
# Phim mới: Cần huấn luyện lại toàn bộ mô hình

# 5. Ưu điểm
# Học được các đặc trưng ẩn của người dùng và phim
# Dễ dàng cập nhật khi có tương tác mới
# Kết hợp được nhiều loại tương tác (đánh giá, thích)
# Mô hình này giúp tìm ra mối liên hệ ẩn giữa người dùng và phim, từ đó gợi ý phim phù hợp với sở thích của từng người dùng

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