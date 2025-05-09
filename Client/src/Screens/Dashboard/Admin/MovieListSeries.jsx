import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import Table from '../../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllMoviesAction, deleteMovieByIdAction, getAllMoviesAction, getSeriesMoviesAction, getSingleMoviesAction } from '../../../Redux/Actions/moviesActions';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Notfications/Loader';
import Empty from '../../../Components/Notfications/Empty';
import DeleteConfirmModal from '../../../Components/Modals/DeleteConfirmModal';
import { RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri';

const MovieListSeries = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, movies, pages, page, totalMovies } = useSelector((state) => state.getSeriesMovies);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.deleteMovie);
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector((state) => state.deleteAllMovies);

  const [pageInput, setPageInput] = useState(page || 1);
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
    dispatch(getSeriesMoviesAction({}));
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }

  }, [dispatch, isError, deleteError, deleteAllError]);

  // Cập nhật page input khi page thay đổi
  useEffect(() => {
    setPageInput(page);
  }, [page]);

  const nextPage = () => {
    dispatch(
      getSeriesMoviesAction({
        pageNumber: page + 1,
      })
    );
  }

  const prevPage = () => {
    dispatch(
      getSeriesMoviesAction({
        pageNumber: page - 1,
      })
    );
  }

  const handlePageInput = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= pages) {
      setPageInput(value);
    }
  };

  const handleGoToPage = () => {
    if (pageInput !== page) {
      dispatch(getSeriesMoviesAction({
        pageNumber: pageInput
      }));
    }
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className='flex-btn gap-2'>
          <h2 className="text-xl font-bold">  Danh sách phim bộ có <span className="text-subMain">{totalMovies ?? 0}</span> Bộ</h2>
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

                  <div className='flex items-center py-2 px-4 gap-2 rounded-xl font-semibold border-2 border-dryGray text-white'>
                    <span>Trang</span>
                    <input
                      type='number'
                      value={pageInput}
                      onChange={handlePageInput}
                      onBlur={handleGoToPage}
                      onKeyDown={(e) => e.key === 'Enter' && handleGoToPage()}
                      className='w-16 py-1 px-2 rounded bg-dry border border-border text-center'
                      min={1}
                      max={pages}
                    />
                    <span>/ {pages}</span>
                  </div>


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

export default MovieListSeries;
