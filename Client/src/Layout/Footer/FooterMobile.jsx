import React, { useState } from 'react'
import { BiHomeHeart } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiHeart, FiUserCheck } from 'react-icons/fi'
import { CgMenuBoxed } from 'react-icons/cg';
import { NavLink } from 'react-router-dom'
import MenuDrawer from '../../Components/Drawer/MenuDrawer';


const FooterMobile = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const active = " bg-subMain text-white "
    const inActive = " transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3 "

    const Hover = ({ isActive }) => isActive ? `${active} ${inActive}` : inActive

    return (
        <>
            {/* Drawer */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
                    <MenuDrawer toggleDrawer={toggleDrawer} />
                </div>
            )}
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
                    <button onClick={toggleDrawer} className={inActive}>
                        <CgMenuBoxed />
                    </button>
                </div>
            </footer>
        </>
    )
}

export default FooterMobile