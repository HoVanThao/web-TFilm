import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
from bson import ObjectId
from db_connect import connect_to_mongodb
import sys
import io
import os
from pathlib import Path

# Cấu hình mã hóa cho stdout để hỗ trợ Unicode
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Thêm bộ chuyển đổi JSON cho ObjectId
class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

def get_movie_data(db):
    """Lấy dữ liệu phim từ MongoDB"""
    movies = list(db.movies.find({}, {
        '_id': 1,
        'name': 1,
        'nameVn': 1,
        'desc': 1,
        'category': 1,
        'language': 1,
        'year': 1,
        'casts': 1,
        'features': 1
    }))
    return pd.DataFrame(movies)

def preprocess_text_data(df):
    """Tiền xử lý dữ liệu text của phim"""
    # Kết hợp các trường text
    df['text_features'] = df.apply(lambda x: ' '.join(filter(None, [
        x['name'],
        x['nameVn'],
        x['desc'],
        ' '.join(x['category']) if isinstance(x['category'], list) else '',
        x['language'],
        str(x['year']),
        ' '.join([cast['name'] for cast in x['casts']]) if isinstance(x['casts'], list) else ''
    ])), axis=1)
    
    return df

def train_content_based_model(df):
    """Training content-based model sử dụng TF-IDF"""
    # Tạo TF-IDF vectors
    tfidf = TfidfVectorizer(
        stop_words='english',
        max_features=5000,
        ngram_range=(1, 2)
    )
    tfidf_matrix = tfidf.fit_transform(df['text_features'])
    
    # Tính toán similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Tạo movie indices
    indices = pd.Series(df.index, index=df['_id'].astype(str))
    
    return cosine_sim, indices, tfidf

def save_model(cosine_sim, indices, tfidf, df):
    """Lưu model và metadata"""
    # Tạo đường dẫn tuyệt đối đến thư mục models trong ml_scripts
    script_dir = Path(__file__).parent.absolute()
    models_dir = os.path.join(script_dir, 'models')
    
    # Tạo thư mục models nếu chưa tồn tại
    if not os.path.exists(models_dir):
        os.makedirs(models_dir)
    
    print(f"Saving models to: {models_dir}")
    
    # Lưu similarity matrix
    sim_matrix_path = os.path.join(models_dir, 'content_based_sim_matrix.npy')
    np.save(sim_matrix_path, cosine_sim)
    
    # Lưu TF-IDF vectorizer
    import pickle
    tfidf_path = os.path.join(models_dir, 'tfidf_vectorizer.pkl')
    with open(tfidf_path, 'wb') as f:
        pickle.dump(tfidf, f)
    
    # Chuyển đổi ObjectId sang string trong DataFrame
    df_copy = df.copy()
    df_copy['_id'] = df_copy['_id'].astype(str)
    
    # Lưu indices và thông tin phim
    movie_data = {
        'indices': indices.to_dict(),
        'movies': df_copy[['_id', 'name', 'nameVn']].to_dict('records')
    }
    
    metadata_path = os.path.join(models_dir, 'content_based_metadata.json')
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(movie_data, f, ensure_ascii=False, cls=JSONEncoder)


#  xây dựng mô hình gợi ý dựa trên nội dung (content-based recommendation). 
# Đây là cách tiếp cận khác so với mô hình ALS, tập trung vào đặc điểm của phim thay vì hành vi người dùng.
# 1. Quá trình thu thập dữ liệu
# Lấy thông tin từ MongoDB: tên phim, mô tả, thể loại, ngôn ngữ, năm sản xuất, diễn viên...

# 2. Tiền xử lý dữ liệu
# Gộp tất cả thông tin thành một chuỗi văn bản duy nhất cho mỗi phim
# Ví dụ: "Avengers Endgame Biệt đội siêu anh hùng Phim về các siêu anh hùng... Action SciFi English 2019 Robert Downey Jr Chris Evans"

# 3. Xây dựng mô hình
# TF-IDF Vectorizer: Chuyển đổi văn bản thành vector số học
# TF (Term Frequency): Tần suất xuất hiện của từ trong văn bản
# IDF (Inverse Document Frequency): Đánh giá mức độ quan trọng của từ
# Cosine Similarity: Tính độ tương đồng giữa các phim dựa trên vector đặc trưng
# Kết quả là ma trận (số_phim × số_phim) thể hiện độ tương đồng giữa từng cặp phim

# 4. Lưu trữ mô hình
# Lưu ma trận tương đồng (similarity matrix) dạng numpy
# Lưu bộ chuyển đổi TF-IDF dạng pickle
# Lưu ánh xạ ID và thông tin phim dạng JSON

# Cách hoạt động của mô hình này
# Xây dựng đặc trưng: Mỗi phim được biểu diễn bằng vector TF-IDF dựa trên nội dung
# Tính toán tương đồng: Tính độ tương đồng giữa các phim dựa trên vector đặc trưng
# Gợi ý phim: Khi người dùng thích một phim, hệ thống sẽ gợi ý các phim có độ tương đồng cao


def main():
    print("Bắt đầu training content-based model...")
    
    # Kết nối MongoDB
    db = connect_to_mongodb()
    
    # Lấy dữ liệu phim
    df = get_movie_data(db)
    print(f"Đã tải {len(df)} phim từ database")
    
    # Tiền xử lý dữ liệu
    df = preprocess_text_data(df)
    print("Đã tiền xử lý text features")
    
    # Training model
    cosine_sim, indices, tfidf = train_content_based_model(df)
    print("Đã training content-based model")
    
    # Lưu model
    save_model(cosine_sim, indices, tfidf, df)
    print("Đã lưu model files")
    
    print("Hoàn thành training content-based model!")

if __name__ == "__main__":
    main() 