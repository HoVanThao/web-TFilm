import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector(
        (state) => state.userGetFavoriteMovies,
    )
    const Hover = ({ isActive }) => (isActive ? 'hover:text-subMainn transitions text-white' : 'hover:text-subMainn transitions text-white');

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/movies/${search}`);
            setSearch(search);
        } else {
            navigate(`/movies`)
        }
    }

    return (
        <div className='bg-navbar shadow-md sticky top-0 z-20'>
            <div className='w-full mx-auto py-3 px-6 lg:grid gap-5  grid-cols-12 justify-between items-center'>
                {/* Logo */}
                <div className='col-span-2 lg:block hidden'>
                    <Link to="/">
                        <img src="/images/logo.png" alt='logo' className='w-full h-12 object-cover' />
                    </Link>
                </div>

                <form onSubmit={handleSearch} className="relative col-span-3 flex items-center">
                    <FaSearch className="absolute left-3 text-white" />
                    <input
                        type="search"
                        value={search || ''}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm kiếm phim..."
                        className="w-full h-10 pl-10 pr-4 text-white font-medium text-sm bg-dry border border-gray-600 rounded-lg
                  focus:outline-none focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50
                  transition-all duration-200 ease-in-out"
                    />
                </form>


                {/* menus */}
                <div className='col-span-7 font-medium text-sm hidden xl:gap-9 2xl:gap-12 lg:gap-4 justify-between lg:flex xl:justify-end items-center'>

                    <NavLink to="/movies" className={Hover}>
                        Duyệt phim
                    </NavLink>
                    <NavLink to="/movies?typeFilm=series" className={Hover}>
                        Phim bộ
                    </NavLink>
                    <NavLink to="/movies?typeFilm=single" className={Hover}>
                        Phim lẻ
                    </NavLink>
                    <NavLink to="/movies?category=Chiếu Rạp" className={Hover}>
                        Phim chiếu rạp
                    </NavLink>
                    <NavLink to="/movies?category=Anime" className={Hover}>
                        Phim hoạt hình
                    </NavLink>
                    <NavLink
                        to={userInfo?.isAdmin ? "/dashboard" : userInfo ? "/profile" : "/login"}
                        className={Hover}>
                        {
                            userInfo ? (
                                <img src={userInfo?.image ? userInfo?.image : "/images/user.png"} alt={userInfo?.fullName} className='w-8 h-8 rounded-full border object-cover border-dryGray' />
                            ) : (
                                <CgUser className='w-6 h-6' />
                            )
                        }

                    </NavLink>
                    <NavLink to={userInfo?.isAdmin ? "/favorites" : userInfo ? "/favorites" : "/login"} className={Hover} >
                        <div className='relative'>
                            <FaHeart className='w-6 h-6' />
                            <div className='w-6 h-6 flex-colo rounded-full text-xs bg-subMainn text-white absolute -top-4 -right-4'>
                                {
                                    likedMovies?.length
                                }
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
