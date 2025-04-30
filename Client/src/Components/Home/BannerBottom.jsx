import React, { useEffect, useState } from 'react';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart, FaImdb, FaPlay, FaFilm, FaTheaterMasks } from 'react-icons/fa';
import 'swiper/css';
import Titles from '../Titles';
import { BsFillCollectionFill } from 'react-icons/bs';
import { RiMovie2Line } from 'react-icons/ri';
import Loader from '../Notfications/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { LikeMovie } from '../../Context/Functionalities';

const BannerBottom = ({ movies, isLoading }) => {
    const [activeMovie, setActiveMovie] = useState(null); // khởi tạo null
    const dispatch = useDispatch();
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie?._id);
    }

    // Mỗi lần movies thay đổi và có dữ liệu => set lại activeMovie
    useEffect(() => {
        if (movies && movies.length > 0) {
            setActiveMovie(movies[0]);
        }
    }, [movies]);
    const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48"
    return (

        <>
            <div className='my-6'>
                <Titles title="Phim Chiếu Rạp" Icon={BsFillCollectionFill} />
                <div className='relative w-full overflow-visible sm:mt-6 xl:mt-4 mt-2'>
                    {
                        isLoading ? (
                            <div className={sameClass}>
                                <Loader />
                            </div>
                        ) : movies?.length > 0 ? (

                            <>
                                {/* Banner chính */}
                                <div className='relative rounded overflow-hidden'>
                                    <div className='w-full h-48 sm:h-96 xl:h-bannerbottom border-2 bg-dry halftone-effect rounded-3xl'>
                                        <img src={activeMovie?.image ? `/images/movies/${activeMovie?.image}` : '/images/user.png'} alt={activeMovie?.name}
                                            className='w-full h-full object-cover rounded-3xl' />
                                    </div>


                                    <div className='absolute linear-bg rounded-3xl top-0 bottom-0 left-0 right-0 flex flex-col justify-center xl:pl-20 sm:pl-12 pl-6 text-white'>
                                        <h1 className='xl:text-3xl sm:text-2xl text-xl font-bold uppercase'>{activeMovie?.name}</h1>
                                        <div className='flex gap-5 mt-2 items-center text-gray-300'>
                                            <FlexMovieItems movie={activeMovie} />
                                        </div>
                                        <div className='flex gap-2 items-center mt-2'>
                                            <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full  border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1'><FaImdb /><p>{activeMovie?.imdbRating}</p></div>
                                            <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1'> <FaTheaterMasks /><p>{activeMovie?.category}</p></div>
                                            <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1'><FaFilm /><p>{activeMovie?.typeFilm == 'single' ? 'Phim lẻ' : 'phim bộ'}</p></div>
                                        </div>
                                        <p className='text-gray-300 w-2/5 text-sm mt-4 hidden lg:block'>
                                            {activeMovie?.desc}
                                        </p>
                                        <div className='flex gap-5 items-center mt-4'>
                                            <Link to={`/movie/${activeMovie?._id}`} className="bg-subMainn hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs flex items-center gap-2">
                                                <FaPlay /> Xem ngay
                                            </Link>
                                            <button onClick={() => LikeMovie(activeMovie, dispatch, userInfo)} disabled={isLiked(activeMovie) || likeLoading}
                                                className={`bg-white hover:text-subMainn transitions ${isLiked(activeMovie) ? 'text-subMainn' : 'text-white'} px-3 py-3 rounded text-sm bg-opacity-30`}>
                                                <FaHeart />
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                {/* Thumbnail List */}
                                <div className="absolute left-0 -bottom-10  right-0  flex-rows gap-2 my-4 px-4 z-10">
                                    {movies?.slice(0, 10).map((movie, index) => (
                                        <div key={index}
                                            className={`p-1 xl:h-20 xl:w-20 lg:h-14 lg:w-14 sm:h-12 sm:w-12 h-3 w-3 border border-border bg-dry rounded-lg overflow-hidden cursor-pointer transition-transform ${activeMovie === movie ? 'border-2 border-white scale-110' : ''}`}
                                            onClick={() => setActiveMovie(movie)}
                                        >
                                            <img src={`/images/movies/${movie?.image}`} alt={movie?.name}
                                                className="w-full h-full object-cover rounded" />
                                        </div>
                                    ))}
                                </div>
                            </>

                        ) : (
                            <div className={sameClass}>
                                <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMainn text-4xl'>
                                    <RiMovie2Line />
                                </div>
                                <p className='text-border text-sm'>
                                    Có vẻ như chúng ta không có phim nào cả!
                                </p>
                            </div>
                        )
                    }

                </div>
            </div>
        </>


    );
};

export default BannerBottom;



