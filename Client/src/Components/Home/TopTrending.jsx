import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";

// Component for movie items in the navigation list
const NavMovieItem = ({ image, title, age, details, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Clicked on:", title); // Debug: Kiểm tra xem hàm có được gọi không
        onClick(image); // Gọi hàm onClick và truyền hình ảnh của phim
    };

    return (
        <div className="relative">
            <a href="#" onClick={handleClick}>
                <img src={image} alt={title} className="w-full h-auto rounded-lg" />
            </a>
            <div className="absolute top-0 left-0 w-full h-full p-4 bg-black bg-opacity-50 text-white flex flex-col justify-end">
                <h5 className="font-bold text-lg mb-1">{title}</h5>
                <div className="flex items-center mb-2">
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded mr-2">{age}+</span>
                    <span>{details}</span>
                </div>
                <button className="bg-red-600 px-4 py-2 text-sm rounded hover:bg-red-700">
                    <i className="fa fa-play mr-1"></i>Play Now
                </button>
            </div>
        </div>
    );
};

const TopTrending = () => {
    const [currentImage, setCurrentImage] = useState("images/top-10/01.jpg"); // State để lưu hình ảnh hiện tại

    const navMovies = [
        { image: "images/top-10/01.jpg", title: "Harry Potter", age: 10, details: "8 Parts" },
        { image: "images/top-10/02.jpg", title: "The Queen's Gambit", age: 18, details: "1 Season" },
        { image: "images/top-10/03.jpg", title: "Scam 1992", age: 12, details: "1 Season" },
        { image: "images/top-10/04.jpg", title: "Stranger Things", age: 16, details: "3 Seasons" },
        { image: "images/top-10/05.jpg", title: "BoJack Horseman", age: 15, details: "6 Seasons" },
        { image: "images/top-10/06.jpg", title: "Peaky Blinders", age: 20, details: "5 Seasons" },
        { image: "images/top-10/04.jpg", title: "Stranger Things", age: 16, details: "3 Seasons" },
        { image: "images/top-10/05.jpg", title: "BoJack Horseman", age: 15, details: "6 Seasons" },
        { image: "images/top-10/06.jpg", title: "Peaky Blinders", age: 20, details: "5 Seasons" },
    ];

    // Sử dụng useCallback để đảm bảo hàm không bị tạo lại mỗi lần render
    const handleSlideChange = useCallback((image) => {
        console.log("Changing image to:", image); // Debug: Kiểm tra xem hàm có được gọi không
        setCurrentImage(image); // Cập nhật hình ảnh hiện tại
    }, []);

    return (
        <div className="my-16">
            <Titles title="Top Trending" Icon={BsBookmarkStarFill} />
            <div className="mt-10 container w-full h-96 py-2 px-2 relative">
                {/* Hiển thị hình ảnh chính của phim */}
                <img
                    src={currentImage}
                    alt="movie name"
                    className="absolute top-0 right-0 w-full h-full object-cover rounded-lg"
                />

                {/* Slide chứa danh sách phim */}
                <Swiper
                    autoplay={true}
                    speed={1000}
                    loop={true}
                    modules={[Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {navMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <NavMovieItem
                                image={movie.image}
                                title={movie.title}
                                age={movie.age}
                                details={movie.details}
                                onClick={handleSlideChange} // Truyền hàm xử lý sự kiện
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopTrending;