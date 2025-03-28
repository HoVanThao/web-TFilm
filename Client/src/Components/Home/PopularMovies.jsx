import React from 'react'
import Titles from '../Titles'
import { BsCollectionFill } from 'react-icons/bs'
import Movie from '../Movie'
import { Movies } from '../../Data/MovieData'

const PopularMovies = () => {
    return (
        <>
            <div className='my-10'>
                <Titles title="Phim Thịnh Hành" Icon={BsCollectionFill} />
                <div className='grid sm:mt-6 xl:mt-4 mt-2 xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2'>
                    {
                        Movies.slice(0, 10).map((movie, index) => (
                            <Movie key={index} movie={movie} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default PopularMovies