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

const TopRated = () => {

    return (
        <div className='my-10 '>
            <Titles title='Phim hay hôm nay' Icon={BsBookmarkStarFill} />
            <div className='sm:mt-6 xl:mt-4 mt-2'>
                <Swiper

                    autoplay={true}
                    speed={1000}
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
                            slidesPerView: 7,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {Movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='p-1 h-72 hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                <img
                                    src={`/images/movies/${movie.titleImage}`}
                                    alt={movie.name}
                                    className='w-full h-full object-cover rounded-lg'
                                />
                                <div className='px-4 rounded-lg hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>
                                    <button className='w-12 h-12 flex-colo transitions hover:text-subMainn rounded-full bg-white bg-opacity-30 text-white'>
                                        <FaHeart />
                                    </button>
                                    <Link
                                        className='font-semibold text-xl transform-cpu transitions hover:text-subMain line-clamp-2'
                                        to={`/movie/${movie.name}`}
                                    >
                                        {movie.name}
                                    </Link>
                                    <div className='flex gap-2 text-star'>
                                        <Rating value={movie.rate} />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default TopRated
