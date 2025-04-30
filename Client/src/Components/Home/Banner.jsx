import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart, FaImdb, FaPlay, FaFilm, FaTheaterMasks } from 'react-icons/fa';
import { RiMovie2Line } from 'react-icons/ri'
import { motion } from 'framer-motion'; // Import Framer Motion
import Loader from '../Notfications/Loader'
import 'swiper/css';
import { useDispatch, useSelector } from 'react-redux';
import { LikeMovie } from '../../Context/Functionalities.js';

const Banner = ({ movies, isLoading }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie._id);
    }

    // Định nghĩa các hiệu ứng động
    const fadeIn = (direction = 'up', delay = 0) => ({
        initial: {
            opacity: 0,
            y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
            x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
        },
        animate: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.4, delay }
        },
    });

    const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48"
    return (
        <div className="relative w-full overflow-hidden ">
            {isLoading ? (
                <div className={sameClass}>
                    <Loader />
                </div>
            ) : movies?.length > 0 ? (
                <Swiper
                    direction="horizontal"
                    slidesPerView={1}
                    loop={true}
                    speed={1000}
                    modules={[Autoplay]}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)} // Theo dõi slide hiện tại
                >
                    {movies?.slice(0, 10).map((movie, index) => (
                        <SwiperSlide key={index} className="relative rounded overflow-hidden ">
                            <div className='w-full xl:h-banner bg-dry sm:h-96 h-48 halftone-effect '>
                                <img
                                    src={movie?.image ? `/images/movies/${movie?.image}` : '/images/user.png'}
                                    alt={movie?.name}
                                    className="w-full h-full object-cover "
                                />
                            </div>

                            <div className="absolute linear-bg xl:pl-24 sm:pl-32 pl-8 top-0  right-0 bottom-0 left-0 flex flex-col justify-center lg:gap-4 xl:gap-8 md:gap-4 gap-4">
                                {/* Movie Name */}
                                <motion.h1
                                    key={`title-${currentSlide}`} // Dựa trên slide hiện tại
                                    className="xl:text-5xl truncate font-sans sm:text-2xl text-xl font-bold uppercase"
                                    {...fadeIn('up', 0.2)} // Hiệu ứng xuất hiện từ dưới lên
                                >
                                    {movie?.name}
                                </motion.h1>

                                {/* FlexMovieItems */}
                                <motion.div
                                    key={`items-${currentSlide}`} // Dựa trên slide hiện tại
                                    className="flex gap-2 items-center text-dryGray"
                                    {...fadeIn('left', 0.4)} // Hiệu ứng xuất hiện từ trái
                                >
                                    <FlexMovieItems movie={movie} />
                                </motion.div>

                                {/* Các thông tin khác */}
                                <motion.div
                                    key={`info-${currentSlide}`} // Dựa trên slide hiện tại
                                    className="flex gap-2 items-center"
                                    {...fadeIn('right', 0.6)} // Hiệu ứng xuất hiện từ phải
                                >
                                    <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                        <FaImdb />
                                        <p>{movie?.imdbRating}</p>
                                    </div>
                                    <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                        <FaTheaterMasks />
                                        <p>{movie?.category}</p>
                                    </div>

                                    <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full border-2 border-yellow-500 bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                        <FaFilm />
                                        <p>{movie?.typeFilm == 'single' ? 'Phim lẻ' : 'phim bộ'}</p>
                                    </div>
                                </motion.div>

                                {/* Mô tả */}
                                <motion.div
                                    key={`description-${currentSlide}`} // Dựa trên slide hiện tại
                                    className="w-2/5 text-base break-words text-dryGray  font-normal line-clamp-3 pr-28 hidden lg:block"
                                    {...fadeIn('up', 0.8)} // Hiệu ứng xuất hiện từ dưới lên
                                >
                                    {movie?.desc}
                                </motion.div>

                                {/* Các nút */}
                                <motion.div
                                    key={`buttons-${currentSlide}`} // Dựa trên slide hiện tại
                                    className="flex gap-5 items-center"
                                    {...fadeIn('up', 1)} // Hiệu ứng xuất hiện từ dưới lên với độ trễ lớn hơn
                                >
                                    <Link
                                        to={`/movie/${movie?._id}`}
                                        className="bg-subMainn hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs flex items-center gap-2"
                                    >
                                        <FaPlay /> Xem ngay
                                    </Link>
                                    <button onClick={() => LikeMovie(movie, dispatch, userInfo)} disabled={isLiked(movie) || likeLoading}
                                        className={`bg-white ${isLiked(movie) ? 'text-subMainn' : 'text-white'} hover:text-subMainn transitions px-3 py-3 rounded text-sm bg-opacity-30 cursor-pointer`}
                                    >
                                        <FaHeart />
                                    </button>
                                </motion.div>
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
    );
};

export default Banner;




