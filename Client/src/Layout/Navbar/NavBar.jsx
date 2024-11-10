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



import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { CgUser } from 'react-icons/cg';

const NavBar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);

    const Hover = ({ isActive }) => (isActive ? 'hover:text-gray-300' : 'hover:text-subMain transitions text-white');

    // Close search input when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='bg-main shadow-md sticky top-0 z-20'>
            <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center'>
                {/* Logo */}
                <div className='col-span-1 lg:block hidden'>
                    <Link to="/">
                        <img src="/images/logo.png" alt='logo' className='w-full h-12 object-contain' />
                    </Link>
                </div>
                {/* search form */}
                <div className="col-span-3 flex items-center" ref={searchRef}>
                    <button
                        type='button'
                        onClick={() => setShowSearch(!showSearch)}
                        className='bg-subMain transitions hover:bg-transparent border-2 border-subMain w-12 flex-colo h-10 rounded text-white'
                    >
                        <FaSearch />
                    </button>
                    <form
                        className={`transition-all duration-300 overflow-hidden ${showSearch ? 'w-full ml-4' : 'w-0'}`}
                    >
                        <input
                            type="text"
                            placeholder='Phim, diễn viên, thể loại...'
                            className='font-medium placeholder:colors-text text-sm w-full h-10 rounded px-4 text-black'
                            style={{
                                transition: 'width 0.3s ease',
                                width: showSearch ? '100%' : '0',
                                opacity: showSearch ? '1' : '0',
                            }}
                        />
                    </form>
                </div>
                {/* menus */}
                <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
                    <NavLink to="/movies" className={Hover}>
                        Phim ảnh
                    </NavLink>
                    <NavLink to="/about-us" className={Hover}>
                        Giới thiệu
                    </NavLink>
                    <NavLink to="/contact-us" className={Hover}>
                        Liên hệ
                    </NavLink>
                    <NavLink to="/login" className={Hover}>
                        <CgUser className='w-6 h-6' />
                    </NavLink>
                    <NavLink to="/favorites" className={Hover} >
                        <div className='relative'>
                            <FaHeart className='w-6 h-6' />
                            <div className='w-6 h-6 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-4 -right-4'>
                                3
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
