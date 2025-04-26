import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { GoEye } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Head = "text-xs text-center text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-center leading-6 whitespace-nowrap";


const Rows = (movie, i, admin) => {
    return (
        <tr key={i}>
            <td className={`${Text} px-5 py-3`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                    {/* <img className="h-full w-full object-cover" src={movie?.image ? movie?.image : "/images/user.png"} alt={movie?.name} /> */}
                    <img className="h-full w-full object-cover" src={`/images/movies/${movie?.image}`} alt={movie?.name} />
                </div>
            </td>
            <td className={`${Text} px-5 py-3 truncate`}>{movie.name}</td>
            <td className={`${Text} px-5 py-3`}> {movie.category}</td >
            <td className={`${Text} px-5 py-3`}>{movie.language}</td>
            <td className={`${Text} px-5 py-3`}>{movie.year}</td>
            <td className={`${Text} px-5 py-3`}>{movie.time}h</td>
            <td className={`${Text} flex-rows gap-2 ps-6 py-6`}>
                {
                    admin ? (
                        <>
                            <button className='bg-green-500 text-white hover:bg-main transitions border border-green-500 rounded flex-colo w-6 h-6'>
                                <FaEdit />
                            </button>
                            <button className='bg-subMainn text-white hover:bg-main transitions border border-subMainn rounded flex-colo w-6 h-6'>
                                <MdDelete />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className='bg-green-500 text-white  hover:bg-main transitions border border-green-500 rounded flex-colo w-6 h-6'>
                                <FaCloudDownloadAlt />
                            </button>
                            <Link to={`/movie/${movie?._id}`} className='bg-subMainn text-white hover:bg-main transitions border border-subMainn rounded flex-colo w-6 h-6'>
                                <GoEye />
                            </Link>
                        </>
                    )
                }

            </td>
        </tr>
    )
}

const Table = ({ data, admin }) => {

    return (
        <div className='overflow-x-auto relative w-full'>
            <table className='w-full table-auto border border-border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        <th scope='col' className={`${Head}`}>
                            Ảnh
                        </th>
                        <th scope='col' className={`${Head} `}>
                            Tên
                        </th>
                        <th scope='col' className={`${Head} `}>
                            Thể loại
                        </th>
                        <th scope='col' className={`${Head} `}>
                            Ngôn ngữ
                        </th>
                        <th scope='col' className={`${Head} `}>
                            Năm
                        </th>
                        <th scope='col' className={`${Head} `}>
                            Giờ
                        </th>
                        <th scope='col' className={`${Head} text-end`}>
                            Hành động
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-main divide-y divide-gray-800'>
                    {
                        data.map((movie, i) => Rows(movie, i, admin))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table