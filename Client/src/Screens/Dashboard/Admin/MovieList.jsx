import React, { useEffect } from 'react'
import SideBar from '../SideBar'
import Table from '../../../Components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction } from '../../../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'
import Loader from '../../../Components/Notfications/Loader'
import Empty from '../../../Components/Notfications/Empty'
import { RiSkipBackFill, RiSkipForwardFill } from 'react-icons/ri'

const MovieList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, movies, pages, page } = useSelector((state) => state.getAllMovies);

  useEffect(() => {

    if (isError) {
      toast.error(isError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError])

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
          <button className='bg-subMainn font-medium transitions hover:text-black border border-subMainn text-white py-3 px-6 rounded'>
            Xóa tất cả
          </button>
        </div>
        {
          isLoading ? <Loader /> : movies?.length > 0 ?
            (
              <>
                <Table data={movies} admin={true} />
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
    </SideBar >
  )
}

export default MovieList