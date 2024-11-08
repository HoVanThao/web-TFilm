import React from 'react'
import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt, FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { HiViewGridAdd } from 'react-icons/hi'
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri'
import Layout from '../../Layout/Layout'
import { NavLink } from 'react-router-dom'


const SideBar = ({ children }) => {

    const SideLinks = [
        {
            name: "Bảng điều khiển",
            link: "/dashboard",
            icon: BsFillGridFill,
        },
        {
            name: "Danh sách phim",
            link: "/movieslist",
            icon: FaListAlt,
        },
        {
            name: "Thêm phim mới",
            link: "/addmovie",
            icon: RiMovie2Fill,
        },
        {
            name: "Thể loại",
            link: "/categories",
            icon: HiViewGridAdd,
        },
        {
            name: "Người dùng",
            link: "/users",
            icon: FaUsers,
        },
        {
            name: "Cập nhật hồ sơ",
            link: "/profile",
            icon: FiSettings,
        },
        {
            name: "Phim yêu thích",
            link: "/favorites",
            icon: FaHeart,
        },
        {
            name: "Thay đổi mật khẩu",
            link: "/password",
            icon: RiLockPasswordLine,
        }
    ]

    const active = "bg-dryGray text-subMain"
    const hover = "hover:text-white hover:bg-main"
    const inActive = "rounded font-medium text-sm transitions flex gap-3 items-center p-4"

    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;


    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2">
                <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        {
                            SideLinks.map((link, index) => (
                                <NavLink to={link.link} key={index} className={Hover}>
                                    <link.icon /> <p>{link.name}</p>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="10"
                        data-aos-offset="200"
                        className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SideBar