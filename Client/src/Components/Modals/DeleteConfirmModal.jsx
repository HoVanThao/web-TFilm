import React from 'react';
import MainModal from './MainModal';

const DeleteConfirmModal = ({ modalOpen, setModalOpen, onConfirm }) => {
    // Hàm xử lý khi nhấn nút Xóa
    const handleDelete = () => {
        onConfirm(); // Gọi hàm xác nhận xóa từ component cha
    };

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-3xl font-bold">Xác nhận xóa</h2>
            <div className="flex flex-col gap-6 text-left mt-6">
                <p className="text-lg text-white text-center">
                    Bạn có chắc chắn muốn xóa tất cả phim yêu thích không?
                </p>
                <div className="flex gap-10">
                    {/* Nút Xóa */}
                    <button
                        onClick={handleDelete}
                        className="w-full flex-colo py-4 rounded bg-red-600 text-white hover:bg-red-700 transitions border-2 border-red-600"
                    >
                        Xóa
                    </button>
                    {/* Nút Hủy */}
                    <button
                        onClick={() => setModalOpen(false)}
                        className="w-full flex-colo py-4 rounded bg-gray-600 text-white hover:bg-gray-700 transitions border-2 border-gray-600"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </MainModal>
    );
};

export default DeleteConfirmModal;