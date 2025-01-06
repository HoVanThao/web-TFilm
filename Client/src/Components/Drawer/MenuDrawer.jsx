import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { BsCollectionPlay } from 'react-icons/bs';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BiPhoneCall } from 'react-icons/bi';

const MenuDrawer = ({ toggleDrawer }) => {
    const Links = [
        { name: "Phim ảnh", link: "/movies", icon: BsCollectionPlay },
        { name: "Giới thiệu", link: "/about-us", icon: HiOutlineUserGroup },
        { name: "Liên hệ", link: "/contact-us", icon: BiPhoneCall },
    ];

    const active = "bg-dryGray text-subMain";
    const hover = "hover:bg-dry";
    const inActive = "rounded font-medium text-sm transitions flex gap-6 items-center px-4 py-4";

    const Hover = ({ isActive }) => (isActive ? `${active} ${inActive}` : `${inActive} ${hover}`);

    return (
        <div className="absolute right-0 top-0 w-72 h-full bg-main text-white shadow-lg">
            <div className="flex justify-between items-center px-4 py-4 bg-dry">
                <Link to="/" onClick={toggleDrawer}>
                    <img src="/images/logo.png" alt="logo" className="w-28" />
                </Link>
                <button
                    onClick={toggleDrawer}
                    className="transitions w-10 h-10 flex justify-center items-center text-base text-white bg-subMain rounded-full hover:bg-white hover:text-subMain"
                >
                    <IoClose />
                </button>
            </div>
            <div className="w-full overflow-y-auto">
                {Links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.link}
                        onClick={toggleDrawer}
                        className={Hover}
                    >
                        <link.icon className="text-lg" /> {link.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default MenuDrawer;
