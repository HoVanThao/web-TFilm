import React from 'react'
import NavBar from './Navbar/NavBar'
import Footer from './Footer/Footer'
import FooterMobile from './Footer/FooterMobile'

const Layout = ({ children }) => {
    return (
        <>
            <div className='bg-main text-white'>
                <NavBar />
                {children}
                <Footer />
                <FooterMobile />
            </div>
        </>
    )
}

export default Layout