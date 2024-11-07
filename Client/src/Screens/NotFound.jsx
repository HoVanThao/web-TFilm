import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
            <img className='w-full h-96 object-contain' src='/images/404.svg' alt='Not Found' />
            <h1 className='lg:text-4xl font-bold' >Page Not Found</h1>
            <Link to='/' className='bg-subMain transtions hover:text-dry text-white flex-rows gap-2 font-medium py-3 px-6 rounded-md'>
                <BiHomeAlt />Về Trang Chủ
            </Link>
        </div>
    )
}

export default NotFound