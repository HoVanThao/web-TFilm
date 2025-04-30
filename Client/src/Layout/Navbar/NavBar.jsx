// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { FaHeart, FaSearch } from 'react-icons/fa'
// import { CgUser } from 'react-icons/cg';

// const NavBar = () => {

//     const Hover = ({ isActive }) => (isActive ? 'hover:text-gray-300' : 'hover:text-subMain transitions text-white');

//     return (
//         <>
//             <div className='bg-main shadow-md sticky top-0 z-20'>
//                 <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
//                     {/* Logo */}
//                     <div className='col-span-1 lg:block hidden'>
//                         <Link to="/">
//                             <img src="/images/logo.png" alt='logo' className='w-full h-12 object-contain' />
//                         </Link>
//                     </div>
//                     {/* search form */}
//                     <div className="col-span-3">
//                         <form className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
//                             <button type='submit' className='bg-subMain transitions hover:bg-transparent border-2 border-subMain w-12 flex-colo h-12 rounded text-white'>
//                                 <FaSearch />
//                             </button>
//                             <input type="text" placeholder='Search Movie Name from here' className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black' />
//                         </form>
//                     </div>
//                     {/* menus */}
//                     <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center' >
//                         <NavLink to="/movies" className={Hover}>
//                             Movies
//                         </NavLink>
//                         <NavLink to="/about-us" className={Hover}>
//                             About Us
//                         </NavLink>
//                         <NavLink to="/contact-us" className={Hover}>
//                             Contact Us
//                         </NavLink>
//                         <NavLink to="/login" className={Hover}>
//                             <CgUser className='w-6 h-6' />
//                         </NavLink>
//                         <NavLink to="/favorite" className={`${Hover} relative`}>
//                             <FaHeart className='w-6 h-6' />
//                             <div className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>
//                                 3
//                             </div>
//                         </NavLink>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default NavBar


// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { FaHeart, FaSearch } from 'react-icons/fa';
// import { CgUser } from 'react-icons/cg';

// const NavBar = () => {
//     const [showSearch, setShowSearch] = useState(false);

//     const Hover = ({ isActive }) => (isActive ? 'hover:text-gray-300' : 'hover:text-subMain transitions text-white');

//     return (
//         <div className='bg-main shadow-md sticky top-0 z-20'>
//             <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
//                 {/* Logo */}
//                 <div className='col-span-1 lg:block hidden'>
//                     <Link to="/">
//                         <img src="/images/logo.png" alt='logo' className='w-full h-12 object-contain' />
//                     </Link>
//                 </div>
//                 {/* search form */}
//                 <div className="col-span-3 flex items-center">
//                     <button
//                         type='button'
//                         onClick={() => setShowSearch(!showSearch)}
//                         className='bg-subMain transitions hover:bg-transparent border-2 border-subMain w-12 flex-colo h-10 rounded text-white'
//                     >
//                         <FaSearch />
//                     </button>
//                     <form
//                         className={`transition-all duration-300 overflow-hidden ${showSearch ? 'w-full ml-4' : 'w-0'}`}
//                     >
//                         <input
//                             type="text"
//                             placeholder='Search Movie here'
//                             className='font-medium placeholder:colors-text text-sm w-full h-10 rounded px-4 text-black'
//                             style={{
//                                 transition: 'width 0.3s ease',
//                                 width: showSearch ? '100%' : '0',
//                                 opacity: showSearch ? '1' : '0',
//                             }}
//                         />
//                     </form>
//                 </div>
//                 {/* menus */}
//                 <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
//                     <NavLink to="/movies" className={Hover}>
//                         Movies
//                     </NavLink>
//                     <NavLink to="/about-us" className={Hover}>
//                         About Us
//                     </NavLink>
//                     <NavLink to="/contact-us" className={Hover}>
//                         Contact Us
//                     </NavLink>
//                     <NavLink to="/login" className={Hover}>
//                         <CgUser className='w-6 h-6' />
//                     </NavLink>
//                     <NavLink to="/favorite" className={`${Hover} relative`}>
//                         <FaHeart className='w-6 h-6' />
//                         <div className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>
//                             3
//                         </div>
//                     </NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NavBar;



// import React, { useState, useRef, useEffect } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { FaHeart, FaSearch } from 'react-icons/fa';
// import { CgUser } from 'react-icons/cg';

// const NavBar = () => {
//     const [showSearch, setShowSearch] = useState(false);
//     const searchRef = useRef(null);

//     const Hover = ({ isActive }) => (isActive ? 'hover:text-gray-300' : 'hover:text-subMain transitions text-white');

//     // Close search input when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (searchRef.current && !searchRef.current.contains(event.target)) {
//                 setShowSearch(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className='bg-main shadow-md sticky top-0 z-20'>
//             <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
//                 {/* Logo */}
//                 <div className='col-span-1 lg:block hidden'>
//                     <Link to="/">
//                         <img src="/images/logo.png" alt='logo' className='w-full h-12 object-contain' />
//                     </Link>
//                 </div>
//                 {/* search form */}
//                 <div className="col-span-3 flex items-center" ref={searchRef}>
//                     <button
//                         type='button'
//                         onClick={() => setShowSearch(!showSearch)}
//                         className='bg-subMain transitions hover:bg-transparent border-2 border-subMain w-12 flex-colo h-10 rounded text-white'
//                     >
//                         <FaSearch />
//                     </button>
//                     <form
//                         className={`transition-all duration-300 overflow-hidden ${showSearch ? 'w-full ml-4' : 'w-0'}`}
//                     >
//                         <input
//                             type="text"
//                             placeholder='Phim, diễn viên, thể loại...'
//                             className='font-medium placeholder:colors-text text-sm w-full h-10 rounded px-4 text-black'
//                             style={{
//                                 transition: 'width 0.3s ease',
//                                 width: showSearch ? '100%' : '0',
//                                 opacity: showSearch ? '1' : '0',
//                             }}
//                         />
//                     </form>
//                 </div>
//                 {/* menus */}
//                 <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
//                     <NavLink to="/movies" className={Hover}>
//                         Phim ảnh
//                     </NavLink>
//                     <NavLink to="/about-us" className={Hover}>
//                         Giới thiệu
//                     </NavLink>
//                     <NavLink to="/contact-us" className={Hover}>
//                         Liên hệ
//                     </NavLink>
//                     <NavLink to="/login" className={Hover}>
//                         <CgUser className='w-6 h-6' />
//                     </NavLink>
//                     <NavLink to="/favorites" className={Hover} >
//                         <div className='relative'>
//                             <FaHeart className='w-6 h-6' />
//                             <div className='w-6 h-6 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-4 -right-4'>
//                                 3
//                             </div>
//                         </div>
//                     </NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NavBar;


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
                        placeholder="Tìm kiếm phim, diễn viên"
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
                    <NavLink to="/movies?category=Chiếu rạp" className={Hover}>
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
