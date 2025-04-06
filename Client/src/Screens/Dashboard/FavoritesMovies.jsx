import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Table from '../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../Components/Notfications/Loader'
import Empty from '../../Components/Notfications/Empty'
import DeleteConfirmModal from '../../Components/Modals/DeleteConfirmModal'

const FavoritesMovies = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);

    const { isLoading, isError, likedMovies } = useSelector(
        (state) => state.userGetFavoriteMovies,
    )

    const { isLoading: deleteAllLoading, isError: deleteAllError, isSuccess } = useSelector(
        (state) => state.userDeleteAllFavoriteMovies,
    )

    // Hàm mở modal thay vì window.confirm
    const deleteAllMoviesHandler = () => {
        setModalOpen(true); // Mở modal xác nhận
    };

    // Hàm xử lý xóa sau khi xác nhận trong modal
    const confirmDeleteHandler = () => {
        dispatch(deleteAllFavoriteMoviesAction());
        setModalOpen(false); // Đóng modal sau khi xác nhận xóa
    };

    useEffect(() => {
        dispatch(getFavoriteMoviesAction());
        if (isError || deleteAllError) {
            toast.error(isError || deleteAllError);
            dispatch({ type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_ALL_FAVORITE_MOVIES_RESET" })
        }
    }, [dispatch, isError, deleteAllError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Phim yêu thích</h2>
                    {
                        likedMovies?.length > 0 && (
                            <button
                                disabled={deleteAllLoading}
                                onClick={deleteAllMoviesHandler}
                                className='bg-subMainn font-medium transitions hover:text-black border border-subMainn text-white py-3 px-6 rounded'>
                                {deleteAllLoading ? "Đang xóa..." : "Xóa Tất Cả"}
                            </button>
                        )
                    }

                </div>
                {
                    isLoading ? <Loader /> : likedMovies.length > 0 ? <Table data={likedMovies} admin={false} /> : <Empty message="không có phim yêu thích nào!" />
                }


            </div>
            {/* Thêm modal xác nhận xóa */}
            <DeleteConfirmModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onConfirm={confirmDeleteHandler} // Truyền hàm xác nhận xóa vào modal
                title={" Bạn có muốn xóa tất cả phim?"}
            />
        </SideBar >
    )
}

export default FavoritesMovies