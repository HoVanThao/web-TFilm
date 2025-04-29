import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Table from '../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllFavoriteMoviesAction, deleteFavoriteMovieByIdAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions'
import toast from 'react-hot-toast'
import Loader from '../../Components/Notfications/Loader'
import Empty from '../../Components/Notfications/Empty'
import DeleteConfirmModal from '../../Components/Modals/DeleteConfirmModal'

const FavoritesMovies = () => {
    const dispatch = useDispatch();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState('');
    const [onConfirmAction, setOnConfirmAction] = useState(() => { });

    const { isLoading, isError, likedMovies } = useSelector(
        (state) => state.userGetFavoriteMovies,
    )

    const { isLoading: deleteAllLoading, isError: deleteAllError, isSuccess } = useSelector(
        (state) => state.userDeleteAllFavoriteMovies,
    )

    const { isLoading: deleteOneLoading, isError: deleteOneError, isSuccess: isSuccessOne } = useSelector(
        (state) => state.userDeleteFavoriteMovie,
    )

    const handleDeleteAll = () => {
        setConfirmTitle("Bạn có chắc chắn muốn xóa tất cả phim yêu thích không?");
        setOnConfirmAction(() => () => {
            dispatch(deleteAllFavoriteMoviesAction());
        });
        setIsConfirmOpen(true);
    };


    const handleDeleteOne = (id) => {
        setConfirmTitle("Bạn có chắc chắn muốn xóa phim này không?");
        setOnConfirmAction(() => () => {
            dispatch(deleteFavoriteMovieByIdAction(id));
        });
        setIsConfirmOpen(true);
    };



    useEffect(() => {
        dispatch(getFavoriteMoviesAction());
        if (isError || deleteAllError) {
            toast.error(isError || deleteAllError);
            dispatch({ type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_ALL_FAVORITE_MOVIES_RESET" })
        }
        if (deleteOneError) {
            toast.error(deleteOneError);
            dispatch({ type: "DELETE_FAVORITE_MOVIE_RESET" })
        }
    }, [dispatch, isError, deleteAllError, isSuccess, deleteOneError, isSuccessOne]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Phim yêu thích</h2>
                    {
                        likedMovies?.length > 0 && (
                            <button
                                disabled={deleteAllLoading}
                                onClick={handleDeleteAll}
                                className='bg-subMainn font-medium transitions hover:text-black border border-subMainn text-white py-3 px-6 rounded'>
                                {deleteAllLoading ? "Đang xóa..." : "Xóa Tất Cả"}
                            </button>
                        )
                    }

                </div>
                {
                    isLoading ? <Loader /> : likedMovies?.length > 0 ? <Table data={likedMovies} admin={false} onDelete={handleDeleteOne} /> : <Empty message="Bạn không có phim yêu thích nào!" />
                }


            </div>
            {/* Thêm modal xác nhận xóa */}
            <DeleteConfirmModal
                modalOpen={isConfirmOpen}
                setModalOpen={setIsConfirmOpen}
                onConfirm={() => {
                    onConfirmAction();
                    setIsConfirmOpen(false);
                }}
                title={confirmTitle}
            />


        </SideBar >
    )
}

export default FavoritesMovies