from pymongo import MongoClient
import os
from dotenv import load_dotenv
import sys
from pathlib import Path

def connect_to_mongodb():
    """Kết nối với MongoDB Atlas sử dụng biến môi trường"""
    try:
        # Tìm file .env trong thư mục cha (server)
        parent_dir = Path(__file__).parent.parent
        env_path = parent_dir / '.env'
        
        # Load biến môi trường từ file .env
        load_dotenv(dotenv_path=str(env_path))
        
        # Lấy connection string từ biến môi trường
        MONGO_URI = os.environ.get('MONGO_URI')
        
        # Kiểm tra biến môi trường
        if not MONGO_URI:
            print("Lỗi: Thiếu thông tin kết nối MongoDB trong biến môi trường")
            print("Hãy kiểm tra file .env chứa MONGO_URI")
            sys.exit(1)
        
        # Kết nối
        client = MongoClient(MONGO_URI)
        db = client['web-film']  # Hoặc trích xuất tên DB từ URI
        
        return db
    except Exception as e:
        print(f"Lỗi kết nối MongoDB: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    # Test kết nối
    db = connect_to_mongodb()
    print("Kết nối MongoDB thành công!")
    print(f"Database: {db.name}")
    print(f"Collections: {db.list_collection_names()}") 