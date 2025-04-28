import React from 'react'
import Titles from '../Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Movie'
import Loader from '../Notfications/Loader'
import Empty from '../Notfications/Empty'


const PopularMovies = ({ movies, isLoading, title }) => {
    return (
        <>
            <div className='my-10'>
                <Titles title={title} Icon={BsCollectionFill} />
                {
                    isLoading ? <Loader /> :
                        movies?.length > 0 ? (
                            <div className='grid sm:mt-6 xl:mt-4 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2'>
                                {
                                    movies?.slice(0, 15).map((movie, index) => (
                                        <Movie key={index} movie={movie} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='mt-6'>
                                <Empty message="Có vẻ chúng ta không có bộ phim nào!" />
                            </div>
                        )
                }

            </div>
        </>
    )
}

export default PopularMovies