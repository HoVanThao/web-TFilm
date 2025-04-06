import React from 'react';
import MainModal from './MainModal';

const DeleteConfirmModal = ({ modalOpen, setModalOpen, onConfirm, title }) => {
    // Hàm xử lý khi nhấn nút Xóa
    const handleDelete = () => {
        onConfirm(); // Gọi hàm xác nhận xóa từ component cha
    };

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-lg font-bold">Xác nhận xóa</h2>
            <div className="flex flex-col gap-6 text-left mt-6">
                <p className="text-sm text-white text-center">
                    {title}
                </p>
                <div className="flex gap-4">
                    {/* Nút Xóa */}
                    <button
                        onClick={handleDelete}
                        className="w-full text-sm flex-colo py-4 rounded bg-red-600 text-white hover:bg-red-800 transitions border-2 border-red-600"
                    >
                        Xóa
                    </button>
                    {/* Nút Hủy */}
                    <button
                        onClick={() => setModalOpen(false)}
                        className="w-full text-sm flex-colo py-4 rounded bg-gray-600 text-white hover:bg-gray-800 transitions border-2 border-gray-600"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </MainModal>
    );
};

export default DeleteConfirmModal;