import React from 'react'
import { Link } from 'react-router-dom'

const Titles = ({ title, Icon, to }) => {
    const content = (
        <div className='w-full flex sm:gap-8 gap-4 items-center cursor-pointer hover:text-subMain transition'>
            <Icon className="sm:w-6 sm:h-6 w-4 h-4 text-subMain" />
            <h2 className="sm:text-xl font-bold text-lg">{title}</h2>
        </div>
    )

    return to ? (
        <Link to={to} className="block w-full">
            {content}
        </Link>
    ) : (
        content
    )
}

export default Titles