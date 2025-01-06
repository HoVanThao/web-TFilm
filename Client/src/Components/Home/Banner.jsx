// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper/modules'
// import { Movies } from './../../Data/MovieData'
// import FlexMovieItems from '../FlexMovieItems'
// import { Link } from 'react-router-dom'
// import { FaHeart, FaImdb } from 'react-icons/fa'
// import 'swiper/css';

// const Banner = () => {
//     return (
//         <div className='relative w-full overflow-hidden' >
//             <Swiper
//                 direction='horizontal'
//                 slidesPerView={1}
//                 loop={true}
//                 speed={1000}
//                 modules={[Autoplay]}
//                 autoplay={{ delay: 4000, disableOnInteraction: false }}
//                 className='w-full xl:h-screen bg-dry sm:h-96 h-48'
//             >
//                 {Movies.slice(0, 6).map((movie, index) => (
//                     <SwiperSlide key={index} className='relative rounded overflow-hidden'>
//                         <img src={`/images/movies/${movie.image}`}
//                             alt={movie.name}
//                             className='w-full h-full object-cover'
//                         />
//                         <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-4 xl:gap-8 md:gap-4 gap-4'>
//                             <h1 className='xl:text-6xl truncate font-sans sm:text-2xl text-xl font-bold uppercase'>
//                                 {movie.name}
//                             </h1>
//                             <div className='flex gap-5 items-center text-dryGray'>
//                                 <FlexMovieItems movie={movie} />
//                             </div>
//                             <div className='flex gap-2 items-center'>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <FaImdb />
//                                     <p>7.8/10</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>Si-Fi</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>Apr 17, 2024</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>13+</p>
//                                 </div>
//                             </div>
//                             <p className='text-base text-dryGray font-normal line-clamp-3 pr-28 hidden lg:block'>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                             </p>
//                             <div className='flex gap-5 items-center'>
//                                 <Link to={`/movie/${movie.name}`} className='bg-subMain hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs'>
//                                     Xem ngay
//                                 </Link>
//                                 <button className='bg-white hover:text-subMain transitions text-white px-3 py-3 rounded text-sm bg-opacity-30'>
//                                     <FaHeart />
//                                 </button>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     )
// }

// export default Banner



// import React, { useEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper/modules'
// import { Movies } from './../../Data/MovieData'
// import FlexMovieItems from '../FlexMovieItems'
// import { Link } from 'react-router-dom'
// import { FaHeart, FaImdb } from 'react-icons/fa'
// import 'swiper/css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Banner = () => {
//     // Khởi tạo AOS
//     useEffect(() => {
//         AOS.init({ duration: 1000 });
//     }, []);
//     return (
//         <div className='relative w-full overflow-hidden' >
//             <Swiper
//                 direction='horizontal'
//                 slidesPerView={1}
//                 loop={true}
//                 speed={1000}
//                 modules={[Autoplay]}
//                 autoplay={{ delay: 4000, disableOnInteraction: false }}
//                 className='w-full xl:h-screen bg-dry sm:h-96 h-48'
//             >
//                 {Movies.slice(0, 6).map((movie, index) => (
//                     <SwiperSlide key={index} className='relative rounded overflow-hidden'>
//                         <img src={`/images/movies/${movie.image}`}
//                             alt={movie.name}
//                             className='w-full h-full object-cover'
//                         />
//                         <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-4 xl:gap-8 md:gap-4 gap-4'>
//                             <h1
//                                 className='xl:text-6xl truncate font-sans sm:text-2xl text-xl font-bold uppercase'
//                                 data-aos="fade-up"
//                                 data-aos-duration="1000"
//                                 data-aos-delay="10"
//                                 data-aos-offset="200"
//                             >
//                                 {movie.name}
//                             </h1>
//                             <div className='flex gap-5 items-center text-dryGray'>
//                                 <FlexMovieItems movie={movie} />
//                             </div>
//                             <div className='flex gap-2 items-center'>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <FaImdb />
//                                     <p>7.8/10</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>Si-Fi</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>Apr 17, 2024</p>
//                                 </div>
//                                 <div className='flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1'>
//                                     <p>13+</p>
//                                 </div>
//                             </div>
//                             <p className='text-base text-dryGray font-normal line-clamp-3 pr-28 hidden lg:block'>
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
//                             </p>
//                             <div className='flex gap-5 items-center'>
//                                 <Link to={`/movie/${movie.name}`} className='bg-subMain hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs'>
//                                     Xem ngay
//                                 </Link>
//                                 <button className='bg-white hover:text-subMain transitions text-white px-3 py-3 rounded text-sm bg-opacity-30'>
//                                     <FaHeart />
//                                 </button>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     )
// }

// export default Banner

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Movies } from './../../Data/MovieData';
import FlexMovieItems from '../FlexMovieItems';
import { Link } from 'react-router-dom';
import { FaHeart, FaImdb } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import Framer Motion
import 'swiper/css';

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                direction="horizontal"
                slidesPerView={1}
                loop={true}
                speed={1000}
                modules={[Autoplay]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)} // Theo dõi slide hiện tại
                className="w-full xl:h-screen bg-dry sm:h-96 h-48"
            >
                {Movies.slice(0, 6).map((movie, index) => (
                    <SwiperSlide key={index} className="relative rounded overflow-hidden">
                        <img
                            src={`/images/movies/${movie.image}`}
                            alt={movie.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-4 xl:gap-8 md:gap-4 gap-4">
                            {/* Movie Name */}
                            <motion.h1
                                key={`title-${currentSlide}`} // Dựa trên slide hiện tại
                                className="xl:text-6xl truncate font-sans sm:text-2xl text-xl font-bold uppercase"
                                {...fadeIn('up', 0.2)} // Hiệu ứng xuất hiện từ dưới lên
                            >
                                {movie.name}
                            </motion.h1>

                            {/* FlexMovieItems */}
                            <motion.div
                                key={`items-${currentSlide}`} // Dựa trên slide hiện tại
                                className="flex gap-5 items-center text-dryGray"
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
                                <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                    <FaImdb />
                                    <p>7.8/10</p>
                                </div>
                                <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                    <p>Si-Fi</p>
                                </div>
                                <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                    <p>Apr 17, 2024</p>
                                </div>
                                <div className="flex items-center font-medium sm:text-sm text-xs gap-x-1.5 rounded-full bg-yellow-500/10 text-yellow-500 px-2 py-1">
                                    <p>13+</p>
                                </div>
                            </motion.div>

                            {/* Mô tả */}
                            <motion.p
                                key={`description-${currentSlide}`} // Dựa trên slide hiện tại
                                className="text-base text-dryGray font-normal line-clamp-3 pr-28 hidden lg:block"
                                {...fadeIn('up', 0.8)} // Hiệu ứng xuất hiện từ dưới lên
                            >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                            </motion.p>

                            {/* Các nút */}
                            <motion.div
                                key={`buttons-${currentSlide}`} // Dựa trên slide hiện tại
                                className="flex gap-5 items-center"
                                {...fadeIn('up', 1)} // Hiệu ứng xuất hiện từ dưới lên với độ trễ lớn hơn
                            >
                                <Link
                                    to={`/movie/${movie.name}`}
                                    className="bg-subMain hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs"
                                >
                                    Xem ngay
                                </Link>
                                <button className="bg-white hover:text-subMain transitions text-white px-3 py-3 rounded text-sm bg-opacity-30">
                                    <FaHeart />
                                </button>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
