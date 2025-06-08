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