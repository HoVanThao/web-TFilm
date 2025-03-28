import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import Filters from '../Components/Filters'
import Movie from '../Components/Movie'
import { Movies } from '../Data/MovieData'
import { CgSpinner } from 'react-icons/cg'

const MoviesPage = () => {

    const maxpage = 10
    const [page, setPage] = useState(maxpage)
    const HandleLoadingMore = () => {
        setPage(page + maxpage)
    }

    return (
        <Layout>
            <div className='mx-5 min-h-screen px-2 mb-6'>
                <Filters />
                <p className='text-lg font-medium my-6'>
                    Total <span className='font-bold text-subMain'>{Movies?.length}</span> {' '} items Found
                </p>
                <div className='grid sm:mt-6 mt-4 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 gap-2'>
                    {
                        Movies.slice(0, page)?.map((movie, index) => (
                            <Movie key={index} movie={movie} />
                        ))
                    }
                </div>
                <div className='w-full flex-colo md:my-20 my-10'>
                    <button onClick={HandleLoadingMore} className='flex-rows bg-subMainn transitions hover:text-black gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMainn'>
                        Loading More <CgSpinner className='animate-spin' />
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default MoviesPage