import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import Table from '../../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllMoviesAction, deleteMovieByIdAction, getAllMoviesAction } from '../../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Notfications/Loader';
import Empty from '../../../Components/Notfications/Empty';
import DeleteConfirmModal from '../../../Components/Modals/DeleteConfirmModal';
import { RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';

const MovieList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, movies, pages, page } = useSelector((state) => state.getAllMovies);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteMovie);
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector((state) => state.deleteAllMovies);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => { });

  const deleteMovieHandle = (id) => {
    setConfirmTitle("Bạn có chắc muốn xóa?");
    setOnConfirmAction(() => () => {
      dispatch(deleteMovieByIdAction(id));
    });
    setIsConfirmOpen(true);
  }

  const deleteAllMoviesHandle = () => {
    setConfirmTitle("Bạn có chắc muốn xóa tất cả?");
    setOnConfirmAction(() => () => {
      dispatch(deleteAllMoviesAction());
    });
    setIsConfirmOpen(true);
  }

  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }

  }, [dispatch, isError, deleteError, deleteAllError]);

  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  }

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  }

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className='flex-btn gap-2'>
          <h2 className="text-xl font-bold">Danh sách phim</h2>
          {
            movies?.length > 0 && <button disabled={deleteAllLoading} onClick={deleteAllMoviesHandle} className='bg-subMainn font-medium transitions hover:text-black border border-subMainn text-white py-3 px-6 rounded'>
              {
                deleteAllLoading ? "Deleting..." : "Xóa tất cả"
              }
            </button>
          }

        </div>
        {
          isLoading || deleteLoading ? <Loader /> : movies?.length > 0 ?
            (
              <>
                <Table data={movies} admin={true} onDelete={deleteMovieHandle} />
                <div className='w-full flex-rows gap-6 my-5'>
                  <button onClick={prevPage} disabled={page === 1}
                    className='text-white p-2 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
                  >
                    <RiSkipBackFill className='text-xl' />
                  </button>

                  <button onClick={nextPage} disabled={page === pages}
                    className='text-white p-2 rounded-xl font-semibold border-2 border-dryGray hover:text-subMainn'
                  >
                    <RiSkipForwardFill className='text-xl' />
                  </button>
                </div>
              </>
            ) : (
              <Empty message="không có bộ phim nào!" />
            )
        }

      </div>
      {/* Modal xác nhận xóa */}
      <DeleteConfirmModal
        modalOpen={isConfirmOpen}
        setModalOpen={setIsConfirmOpen}
        onConfirm={() => {
          onConfirmAction();
          setIsConfirmOpen(false);
        }}
        title={confirmTitle}
      />
    </SideBar>
  )
}

export default MovieList;
