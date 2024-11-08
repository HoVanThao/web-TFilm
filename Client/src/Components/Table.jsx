import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa';
import { GoEye } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";


const Rows = (movie, i, admin) => {
    return (
        <tr key={i}>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                    <img className="h-full w-full object-cover" src={`/images/movies/${movie.titleImage}`} alt={movie?.name} />
                </div>
            </td>
            <td className={`${Text} truncate`}>{movie.name}</td>
            <td className={`${Text}`}> {movie.category}</td >
            <td className={`${Text}`}>{movie.language}</td>
            <td className={`${Text}`}>{movie.year}</td>
            <td className={`${Text}`}>{movie.time}</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {
                    admin ? (
                        <>
                            <button className='bg-green-500 text-white hover:bg-main transitions border border-green-500 rounded flex-colo w-6 h-6'>
                                <FaEdit />
                            </button>
                            <button className='bg-subMain text-white hover:bg-main transitions border border-subMain rounded flex-colo w-6 h-6'>
                                <MdDelete />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className='bg-green-500 text-white hover:bg-main transitions border border-green-500 rounded flex-colo w-6 h-6'>
                                <FaCloudDownloadAlt />
                            </button>
                            <Link to={`/movie/${movie?.name}`} className='bg-subMain text-white hover:bg-main transitions border border-subMain rounded flex-colo w-6 h-6'>
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