import React, { useState } from 'react'
import Titles from './../Titles'
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Autoplay, Navigation } from 'swiper/modules';
import { Movies } from '../../Data/MovieData'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from '../Stars';
import { RiMovie2Line } from 'react-icons/ri';
import Loader from '../Notfications/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { LikeMovie } from '../../Context/Functionalities';

const TopRated = ({ movies, isLoading, title, to }) => {
    const dispatch = useDispatch();
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie._id);
    }

    const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48"
    return (
        <div className='my-10 '>
            <Titles title={title} Icon={BsBookmarkStarFill} to={to} />
            <div className='sm:mt-6 xl:mt-4 mt-2'>
                {isLoading ? (
                    <div className={sameClass}>
                        <Loader />
                    </div>
                ) : movies?.length > 0 ? (
                    <Swiper

                        autoplay={true}
                        speed={2000}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {movies?.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className='p-1 h-72 hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                    <img
                                        src={movie?.image ? movie?.image : '/images/user.png'}
                                        alt={movie?.name}
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                    <div className='px-4 rounded-lg hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>
                                        <button onClick={() => LikeMovie(movie, dispatch, userInfo)} disabled={isLiked(movie) || likeLoading}
                                            className={`w-12 h-12 flex-colo transitions hover:text-subMainn rounded-full bg-white bg-opacity-30 ${isLiked(movie) ? 'text-subMainn' : 'text-white'}`}
                                        >
                                            <FaHeart />
                                        </button>
                                        <Link
                                            className='font-semibold text-xl transform-cpu transitions hover:text-subMain line-clamp-2'
                                            to={`/movie/${movie?._id}`}
                                        >
                                            {movie?.nameVn}
                                        </Link>
                                        <div className='flex gap-2 text-star'>
                                            <Rating value={movie?.rate} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
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
    )
}

export default TopRated
