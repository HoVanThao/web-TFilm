import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Movies } from './../../Data/MovieData';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart, FaImdb, FaPlay } from 'react-icons/fa';
import 'swiper/css';
import Titles from '../Titles';
import { BsFillCollectionFill } from 'react-icons/bs';

const BannerBottom = () => {
    const [activeMovie, setActiveMovie] = useState(Movies[0]);

    return (

        <>
            <div className='my-16'>
                <Titles title="Phim Chiếu Rạp" Icon={BsFillCollectionFill} />
                <div className='relative w-full overflow-hidden sm:mt-12 mt-6'>
                    {/* Banner chính */}
                    <div className='relative rounded overflow-hidden'>
                        <div className='w-full h-48 sm:h-96 xl:h-bannerbottom  bg-dry halftone-effect rounded-lg'>
                            <img src={`/images/movies/${activeMovie.image}`} alt={activeMovie.name}
                                className='w-full h-full object-cover rounded-lg' />
                        </div>


                        <div className='absolute linear-bg rounded-lg top-0 bottom-0 left-0 right-0 flex flex-col justify-center xl:pl-20 sm:pl-12 pl-6 text-white'>
                            <h1 className='xl:text-3xl sm:text-2xl text-xl font-bold uppercase'>{activeMovie.name}</h1>
                            <div className='flex gap-5 items-center text-gray-300'>
                                <FlexMovieItems movie={activeMovie} />
                            </div>
                            <div className='flex gap-2 items-center mt-2'>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'><FaImdb /><p>7.8/10</p></div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'><p>Si-Fi</p></div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'><p>Apr 17, 2024</p></div>
                                <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'><p>13+</p></div>
                            </div>
                            <p className='text-gray-300 text-sm mt-4 hidden lg:block'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                            </p>
                            <div className='flex gap-5 items-center mt-4'>
                                <Link to={`/movie/${activeMovie.name}`} className="bg-subMainn hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs flex items-center gap-2">
                                    <FaPlay /> Xem ngay
                                </Link>
                                <button className="bg-white hover:text-subMainn transitions text-white px-3 py-3 rounded text-sm bg-opacity-30">
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Thumbnail Slider */}
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={10}
                        className='mt-4 px-4 w-'
                    >
                        {Movies.slice(0, 10).map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className='p-1 h-5 sm:h-10 xl:h-20 w-5 sm:w-10 xl:w-20 hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                    <img src={`/images/movies/${movie.image}`} alt={movie.name}
                                        className={`w-full h-full object-cover rounded cursor-pointer transition-transform ${activeMovie === movie ? 'border-2 border-white scale-110' : ''}`}
                                        onClick={() => setActiveMovie(movie)}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>


    );
};

export default BannerBottom;