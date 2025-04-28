import React from 'react'
import FlexMovieItems from '../FlexMovieItems'
import { FaImdb, FaPlay, FaShareAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import Rating from '../Stars'
const MovieInfo = ({ movie, setModalOpen }) => {
    return (
        <div className='w-full xl:h-screen relative text-white'>
            <img src={movie?.image ? `/images/movies/${movie?.image}` : '/images/user.png'} alt={movie?.name} className='w-full hidden xl:inline-block h-full object-cover' />
            <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
                <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
                    <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden' >
                        <img src={movie?.image ? `/images/movies/${movie?.titleImage} ` : '/images/user.png'} alt={movie?.name} className="w-full h-full object-cover" />
                    </div>

                    <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                        <div className='col-span-3 flex flex-col gap-10'>
                            <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>{movie?.name}</h1>
                            <div className='flex items-center gap-4 font-medium text-dryGray'>
                                <div className='flex-colo bg-subMainn text-xs px-2 py-1'>
                                    HD 4K
                                </div>
                                <FlexMovieItems movie={movie} />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
                                    <FaImdb />
                                    <p>{movie?.imdbRating}</p>
                                </div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
                                    <p>{movie?.category}</p>
                                </div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
                                    <p>{movie?.year}</p>
                                </div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
                                    <p>{movie?.time}h 14m</p>
                                </div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
                                    <p>{movie?.typeFilm == 'single' ? 'Phim lẻ' : 'phim bộ'}</p>
                                </div>
                            </div>
                            <p className="text-text text-sm leading-7">{movie?.desc}</p>
                            <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                                <div className="col-span-1 flex-colo border-r border-border">
                                    <button onClick={() => setModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                                        <FaShareAlt />
                                    </button>
                                </div>
                                <div className="col-span-2 flex-colo font-medium text-sm">
                                    <p>
                                        Ngôn Ngữ : {" "}
                                        <span className="ml-2 truncate">{movie?.language}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                                    <Link
                                        to={`/watch/${movie?._id}`}
                                        className='bg-dry py-4 hover:bg-subMainn transitions border-2 border-subMainn rounded-full flex-rows gap-4 w-full sm:py-3' >
                                        <FaPlay className='w-3 h-3' />
                                        Xem ngay
                                    </Link>
                                </div>

                            </div>

                            <div className='flex mb-6 text-lg gap-2 text-star'>
                                <Rating value={movie?.rate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo