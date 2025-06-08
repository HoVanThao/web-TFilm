import sys
import os
from datetime import datetime, timedelta, timezone
from pymongo import MongoClient
from db_connect import connect_to_mongodb
import io
import pandas as pd
import numpy as np
import pickle
import json
from bson import ObjectId
from pathlib import Path
import traceback

# Cấu hình mã hóa cho stdout để hỗ trợ Unicode - cách an toàn hơn
original_stdout = sys.stdout
try:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
except Exception:
    # Nếu không thể thiết lập lại stdout, sử dụng stdout gốc
    sys.stdout = original_stdout

from generate_recommendations import (
    load_models,
    get_content_based_recommendations,
    get_collaborative_recommendations,
    combine_recommendations,
    get_user_movie_history,
    update_user_recommendations
)

def get_users_needing_update(db, hours_threshold=24):
    """Lấy danh sách users cần cập nhật recommendations"""
    current_time = datetime.now(timezone.utc).replace(tzinfo=None)
    threshold_time = current_time - timedelta(hours=hours_threshold)
    
    # Lấy users chưa có recommendations hoặc recommendations cũ
    users = db.users.find({
        '$or': [
            {'recommendations.lastUpdated': {'$lt': threshold_time}},
            {'recommendations.lastUpdated': {'$exists': False}},
            {'recommendations.movies': {'$exists': False}}
        ]
    }, {'_id': 1})
    
    return [str(user['_id']) for user in users]

def update_user(db, models, user_id, verbose=True):
    """Cập nhật recommendations cho một user"""
    try:
        if verbose:
            try:
                print(f"\nProcessing user {user_id}...")
            except:
                pass
        
        # Lấy lịch sử phim
        movie_history = get_user_movie_history(db, user_id)
        if verbose:
            try:
                print(f"- Tim thay {len(movie_history)} phim trong lich su")
            except:
                pass
        
        # Tạo recommendations
        content_recs = get_content_based_recommendations(models, movie_history, n=20)
        if verbose:
            try:
                print(f"- Da tao {len(content_recs)} content recommendations")
            except:
                pass
        
        collab_recs = get_collaborative_recommendations(models, user_id, n=20)
        if verbose:
            try:
                print(f"- Da tao {len(collab_recs)} collaborative recommendations")
            except:
                pass
        
        # Kết hợp và lưu recommendations
        final_recs = combine_recommendations(content_recs, collab_recs)
        if verbose:
            try:
                print(f"- Da ket hop thanh {len(final_recs)} recommendations")
            except:
                pass
        
        # Cập nhật vào database
        current_time = datetime.now(timezone.utc).replace(tzinfo=None)
        success = update_user_recommendations(db, user_id, final_recs[:10])
        if success:
            if verbose:
                try:
                    print("✓ Cap nhat thanh cong")
                except:
                    pass
            return True
        else:
            if verbose:
                try:
                    print("✗ Loi khi cap nhat")
                except:
                    pass
            return False
            
    except Exception as e:
        if verbose:
            try:
                print(f"✗ Loi khi xu ly user {user_id}: {str(e)}")
            except:
                pass
        return False

def safe_print(*args, **kwargs):
    """In an toàn, bắt các lỗi I/O"""
    try:
        print(*args, **kwargs)
    except:
        try:
            # Khôi phục stdout gốc và thử in lại
            sys.stdout = original_stdout
            print(*args, **kwargs)
        except:
            pass

def main():
    """Hàm chính để update recommendations cho tất cả users"""
    try:
        # Import module generate_recommendations
        import importlib.util
        import os
        
        # Lấy đường dẫn tuyệt đối đến file generate_recommendations.py
        current_dir = os.path.dirname(os.path.abspath(__file__))
        generate_recommendations_path = os.path.join(current_dir, "generate_recommendations.py")
        
        # Import module
        spec = importlib.util.spec_from_file_location("generate_recommendations", generate_recommendations_path)
        generate_recommendations = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(generate_recommendations)
        
        # Kết nối MongoDB
        db = connect_to_mongodb()
        if not db:
            safe_print("Khong the ket noi MongoDB!")
            return
        
        # Kiểm tra xem có cần cập nhật tất cả users không
        import sys
        force_all = "--force-all" in sys.argv
        
        # Lấy danh sách users
        if force_all:
            # Cập nhật tất cả users
            users = list(db.users.find({}, {"_id": 1}))
            safe_print(f"Cap nhat recommendations cho tat ca {len(users)} nguoi dung...")
        else:
            # Chỉ cập nhật users có sự thay đổi (thêm phim yêu thích, đánh giá...)
            # hoặc chưa có recommendations
            users = list(db.users.find({
                '$or': [
                    {'recommendations.lastUpdated': {'$exists': False}},
                    {'recommendations.movies': {'$size': 0}},
                    {'recommendations.lastUpdated': {'$lt': '$updatedAt'}}
                ]
            }, {"_id": 1}))
            safe_print(f"Cap nhat recommendations cho {len(users)} nguoi dung can cap nhat...")
        
        # Cập nhật recommendations cho từng user
        success_count = 0
        error_count = 0
        
        for user in users:
            user_id = str(user["_id"])
            safe_print(f"Dang xu ly user {user_id}...")
            
            success, error = run_recommendations_for_user(db, user_id, generate_recommendations)
            if success:
                success_count += 1
            else:
                error_count += 1
        
        safe_print("Ket qua:")
        safe_print(f"- Thanh cong: {success_count}")
        safe_print(f"- Loi: {error_count}")
        safe_print("Hoan thanh.! 🎉")
    
    except Exception as e:
        safe_print(f"Loi trong main(): {str(e)}")
        traceback.print_exc()

def run_recommendations_for_user(db, user_id, generate_recommendations_module):
    """Chạy recommendations cho một user"""
    try:
        # Gọi hàm từ module generate_recommendations
        movie_history = generate_recommendations_module.get_user_movie_history(db, user_id)
        
        models = generate_recommendations_module.load_models()
        if not models:
            return False, "Không thể load models"
        
        content_recs = generate_recommendations_module.get_content_based_recommendations(models, movie_history, n=20)
        collab_recs = generate_recommendations_module.get_collaborative_recommendations(models, user_id, n=20)
        
        final_recommendations = generate_recommendations_module.combine_recommendations(content_recs, collab_recs)
        
        # Sử dụng UTC time để đồng bộ với Node.js
        current_time = datetime.now(timezone.utc).replace(tzinfo=None)
        
        # Cập nhật vào MongoDB
        db.users.update_one(
            {'_id': ObjectId(user_id)},
            {
                '$set': {
                    'recommendations.movies': final_recommendations[:6],
                    'recommendations.lastUpdated': current_time
                }
            }
        )
        
        return True, None
    except Exception as e:
        error_message = f"Loi khi tao recommendations cho user {user_id}: {str(e)}"
        safe_print(error_message)
        return False, error_message

if __name__ == "__main__":
    main()

# # Cập nhật users cần thiết
# python update_all_recommendations.py

# # Cập nhật tất cả users
# python update_all_recommendations.py --force-all

# # Chạy im lặng
# python update_all_recommendations.py --quiet

# # Cập nhật users cần thiết
# python update_all_recommendations.py

# # Cập nhật tất cả users
# python update_all_recommendations.py --force-all

# # Chạy im lặng
# python update_all_recommendations.py --quiet