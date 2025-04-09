import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Filters from '../Components/Filters'
import Movie from '../Components/Movie'
import { Movies } from '../Data/MovieData'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllMoviesAction } from '../Redux/Actions/moviesActions'
import Loader from '../Components/Notfications/Loader'
import { RiMovie2Line } from "react-icons/ri";

const MoviesPage = () => {

    // const maxpage = 10
    // const [page, setPage] = useState(maxpage)
    // const HandleLoadingMore = () => {
    //     setPage(page + maxpage)
    // }

    const dispatch = useDispatch();
    const sameClass = "w-full gap-6 flex-colo min-h-screen";
    const { isLoading, isError, isSuccess, movies, pages, page } = useSelector((state) => state.getAllMovies);
    const { categories } = useSelector((state) => state.categoryGetAll);

    useEffect(() => {
        if (isError) {
            toast.error(isError);
        }
        // dispatch(getAllMoviesAction());
    }, [dispatch, isError]);

    return (
        <Layout>
            <div className='mx-5 min-h-screen px-2 mb-6'>
                <Filters categories={categories} />
                <p className='text-lg font-medium my-6'>
                    Total <span className='font-bold text-subMain'>{movies ? movies?.length : 0}</span> {' '} items Found
                </p>
                {
                    isLoading ? (
                        <div className={sameClass}>
                            <Loader />
                        </div>
                    ) :
                        movies?.length > 0 ? (
                            <>
                                <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
                                    {
                                        movies.slice(0, page)?.map((movie, index) => (
                                            <Movie key={index} movie={movie} />
                                        ))
                                    }
                                </div>
                            </>
                        ) : (
                            <div className={sameClass}>
                                <div className='w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMainn text-4xl flex-colo'>
                                    <RiMovie2Line />
                                </div>
                                <p className='text-border text-sm'>
                                    Có vẻ như chúng ta không có bộ phim nào!
                                </p>
                            </div>
                        )

                }

                {/* <div className='w-full flex-colo md:my-20 my-10'>
                    <button onClick={HandleLoadingMore} className='flex-rows bg-subMainn transitions hover:text-black gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMainn'>
                        Loading More <CgSpinner className='animate-spin' />
                    </button>
                </div> */}
            </div>
        </Layout>
    )
}

export default MoviesPage