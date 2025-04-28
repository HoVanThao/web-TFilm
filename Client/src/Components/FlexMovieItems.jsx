import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { BiTime } from 'react-icons/bi'

const FlexMovieItems = ({ movie }) => {
    return (
        <>
            {/* <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{movie.category}</span>
            </div> */}
            <div className="flex items-center px-2 py-1 rounded-full  gap-2">
                <FaRegCalendarAlt className='text-dryGray w-3 h-3' />
                <span className="text-sm font-medium">{movie?.year}</span>
            </div>
            <div className="flex items-center px-2 py-1 rounded-full  gap-2">
                <BiTime className='text-dryGray w-3 h-3' />
                <span className="text-sm font-medium">{movie?.time}h 14m</span>
            </div>

        </>
    )
}

export default FlexMovieItems