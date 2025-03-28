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
            <div className='my-6'>
                <Titles title="Phim Chiếu Rạp" Icon={BsFillCollectionFill} />
                <div className='relative w-full overflow-visible sm:mt-6 xl:mt-4 mt-2'>

                    {/* Banner chính */}
                    <div className='relative rounded overflow-hidden'>
                        <div className='w-full h-48 sm:h-96 xl:h-bannerbottom border-2 bg-dry halftone-effect rounded-3xl'>
                            <img src={`/images/movies/${activeMovie.image}`} alt={activeMovie.name}
                                className='w-full h-full object-cover rounded-3xl' />
                        </div>


                        <div className='absolute linear-bg rounded-3xl top-0 bottom-0 left-0 right-0 flex flex-col justify-center xl:pl-20 sm:pl-12 pl-6 text-white'>
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


                    {/* Thumbnail List */}
                    <div className="absolute left-0 -bottom-10  right-0  flex-rows gap-2 my-4 px-4 z-10">
                        {Movies.slice(0, 10).map((movie, index) => (
                            <div key={index}
                                className={`p-1 xl:h-20 xl:w-20 lg:h-14 lg:w-14 sm:h-12 sm:w-12 h-3 w-3 border border-border bg-dry rounded-lg overflow-hidden cursor-pointer transition-transform ${activeMovie === movie ? 'border-2 border-white scale-110' : ''}`}
                                onClick={() => setActiveMovie(movie)}
                            >
                                <img src={`/images/movies/${movie.image}`} alt={movie.name}
                                    className="w-full h-full object-cover rounded" />
                            </div>
                        ))}
                    </div>


                    {/* Thumbnail Slider */}
                    {/* <Swiper
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
                    </Swiper> */}

                </div>
            </div>
        </>


    );
};

export default BannerBottom;