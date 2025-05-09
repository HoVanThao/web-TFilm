import React from 'react'
import FlexMovieItems from '../FlexMovieItems'
import { FaPlay, FaShareAlt, FaTheaterMasks, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Rating from '../Stars'
import { useDispatch, useSelector } from 'react-redux'
import { LikeMovie } from '../../Context/Functionalities'
const MovieInfo = ({ movie, setModalOpen }) => {

    const dispatch = useDispatch();
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie?._id);
    }

    return (
        <div className='w-full xl:h-screen relative text-white'>
            <img src={movie?.image ? movie?.image : '/images/user.png'} alt={movie?.name} className='w-full hidden xl:inline-block h-full object-cover' />
            <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
                <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
                    <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden' >
                        <img src={movie?.image ? movie?.titleImage : '/images/user.png'} alt={movie?.name} className="w-full h-full object-cover" />
                    </div>

                    <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                        <div className='col-span-4 flex flex-col gap-10'>
                            <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>{movie?.nameVn}</h1>
                            <h1 className='xl:text-2xl capitalize font-sans text-lg font-bold'>{movie?.name}</h1>
                            <div className='flex items-center gap-4 font-medium text-dryGray'>
                                <div className='flex-colo bg-subMainn text-xs px-2 py-1'>
                                    HD 4K
                                </div>
                                <FlexMovieItems movie={movie} className='text-shadow' />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {(Array.isArray(movie?.category) ? movie.category : [movie?.category])
                                    .filter(cat => cat)
                                    .map((cat, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center font-medium text-shadow sm:text-sm text-xs gap-x-1.5 rounded-lg border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1"
                                        >
                                            {index === 0 && <FaTheaterMasks />}
                                            <p>{cat}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <p className="text-shadow text-sm leading-7">{movie?.desc}</p>
                            <div className="grid sm:grid-cols-7 grid-cols-3 gap-4 p-4 bg-main border border-gray-800 rounded-lg">
                                <div className="col-span-1 flex-colo border-r border-border">
                                    <button onClick={() => setModalOpen(true)} className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20">
                                        <FaShareAlt />
                                    </button>
                                </div>
                                <div className="col-span-2 flex-colo font-medium text-sm">
                                    <p>
                                        Quốc Gia : {" "}
                                        <span className="ml-2 truncate">{movie?.language}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-3 col-span-3 flex justify-end font-medium text-sm gap-6">
                                    <Link
                                        to={
                                            movie?.typeFilm === 'single'
                                                ? `/watch/${movie?._id}`
                                                : movie?.filmParts?.length > 0 &&
                                                    movie.filmParts[0].episodes?.length > 0
                                                    ? `/watch/${movie._id}?ss=${movie.filmParts[0].partNumber}&ep=${movie.filmParts[0].episodes[0].episodeNumber}`
                                                    : `/watch/${movie._id}`
                                        }

                                        className='bg-dry py-4 hover:bg-subMainn transitions border-2 border-subMainn rounded-xl flex-rows gap-4 w-full sm:py-3' >
                                        <FaPlay className='w-3 h-3' />
                                        Xem ngay
                                    </Link>
                                </div>
                                <div className="flex-btn sm:w-auto w-full col-span-1">
                                    <button
                                        onClick={() => LikeMovie(movie, dispatch, userInfo)}
                                        disabled={isLiked(movie) || likeLoading}
                                        className={`w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20 ${isLiked(movie) ? 'text-subMainn' : 'text-white'
                                            } hover:text-subMainn transitions`}
                                    >
                                        <FaHeart />
                                    </button>
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