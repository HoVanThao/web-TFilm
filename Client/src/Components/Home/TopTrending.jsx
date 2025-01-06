import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Movies } from '../../Data/MovieData';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const TopTrending = () => {
    const [currentImage, setCurrentImage] = useState(Movies[0]?.titleImage); // State lưu hình ảnh hiện tại
    const [activeIndex, setActiveIndex] = useState(0); // State lưu index của slide hiện tại

    return (
        <div className="my-16">
            <Titles title="Top Trending" Icon={BsBookmarkStarFill} />
            <div className="mt-10 container w-full h-96 py-2 px-2 relative">
                {/* Hiển thị hình ảnh chính của phim */}
                <img
                    src={`/images/movies/${currentImage}`}
                    alt="movie name"
                    className="absolute top-0 right-0 w-full h-full object-fill rounded-lg"
                />

                <div className="mt-12">
                    <Swiper
                        autoplay={{ delay: 4000 }}
                        speed={1000}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        onSlideChange={(swiper) => {
                            const index = swiper.realIndex;
                            setActiveIndex(index);
                            setCurrentImage(Movies[index]?.titleImage);
                        }}
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
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {Movies.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={`p-1 h-64 hovered border bg-opacity-75 border-border bg-dry rounded-lg overflow-hidden  ${activeIndex === index ? "border-orange-700 border-2" : ""
                                        }`}
                                >
                                    <img
                                        src={`/images/movies/${movie.titleImage}`}
                                        alt={movie.name}
                                        className='w-full h-full object-fill rounded-lg'
                                    />
                                    <div className='px-4 hoveres rounded-lg gap-6 text-center absolute bg-black bg-opacity-75 top-0 left-0 right-0 bottom-0'>
                                        <button className='w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white'>
                                            <FaHeart />
                                        </button>
                                        <Link
                                            className='font-semibold text-xl transform-cpu transitions hover:text-subMain line-clamp-2'
                                            to={`/movie/${movie.name}`}
                                        >
                                            {movie.name}
                                        </Link>
                                        <Link
                                            to={`/movie/${movie.name}`}
                                            className="bg-subMain hover:text-main transitions rounded text-white px-8 py-3 font-medium sm:text-sm text-xs"
                                        >
                                            Xem ngay
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default TopTrending;
