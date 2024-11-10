import React from 'react'
import { BiHomeHeart } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'


const FooterMobile = () => {

    const active = " bg-subMain text-white "
    const inActive = " transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3 "

    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive

    return (
        <>
            <footer className='lg:hidden fixed z-50 bottom-0 w-full px-1'>
                <div className="bg-dry rounded-md flex-btn w-full p-1">
                    <NavLink to="/" className={Hover}>
                        <BiHomeHeart />
                    </NavLink>
                    <NavLink to="/movies" className={Hover}>
                        <BsCollectionPlay />
                    </NavLink>
                    <NavLink to="/favorites" className={Hover}>
                        <div className='relative'>
                            <FiHeart className='w-6 h-6' />
                            <div className='w-6 h-6 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-4 -right-4'>
                                3
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/login" className={Hover}>
                        <FiUserCheck />
                    </NavLink>
                </div>
            </footer>
        </>
    )
}

export default FooterMobile