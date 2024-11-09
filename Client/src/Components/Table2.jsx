import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";


const Rows = (data, i, users, OnEditFunction) => {
    return (
        <tr key={i}>
            {
                // users
                users ? (
                    <>
                        <td className={`${Text}`}>
                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                <img className="h-full w-full object-cover" src={`/images/${data.image ? data.image : "user.png"}`} alt={data?.fullname} />
                            </div>
                        </td>
                        <td className={`${Text}`}>{data?._id ? data._id : '2R75T8'}</td>
                        <td className={`${Text}`}> {data?.createAt ? data.createAt : '12, Jan 2024'}</td >
                        <td className={`${Text}`}>{data.fullname}</td>
                        <td className={`${Text}`}>{data.email}</td>
                        <td className={`${Text} float-right flex-rows gap-2`}>
                            <button className='bg-subMain text-white hover:bg-main transitions border border-subMain rounded flex-colo w-6 h-6'>
                                <MdDelete />
                            </button>
                        </td>
                    </>
                ) : (
                    //the loai
                    <>
                        <td className={`${Text} font-bold`}>{data?._id ? data._id : '2R75T8'}</td>
                        <td className={`${Text}`}> {data?.createAt ? data.createAt : '12, Jan 2024'}</td >
                        <td className={`${Text}`}>{data.title}</td>
                        <td className={`${Text} float-right flex-rows gap-2`}>
                            <button onClick={() => OnEditFunction(data)} className='bg-green-500 text-white hover:bg-main transitions border border-green-500 rounded flex-colo w-6 h-6'>
                                <FaEdit />
                            </button>
                            <button className='bg-subMain text-white hover:bg-main transitions border border-subMain rounded flex-colo w-6 h-6'>
                                <MdDelete />
                            </button>
                        </td>
                    </>
                )
            }

        </tr>
    )
}

const Table2 = ({ data, users, OnEditFunction }) => {

    return (
        <div className='overflow-x-auto relative w-full'>
            <table className='w-full table-auto border border-border divide-y divide-border'>
                <thead>
                    <tr className='bg-dryGray'>
                        {
                            users ? (
                                <>
                                    <th scope='col' className={`${Head}`}>
                                        Ảnh
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Id
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Ngày
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Họ Và Tên
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Email
                                    </th>
                                </>
                            ) : (
                                <>
                                    <th scope='col' className={`${Head}`}>
                                        Id
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Ngày
                                    </th>
                                    <th scope='col' className={`${Head} `}>
                                        Tiêu đề
                                    </th>

                                </>
                            )

                        }
                        <th scope='col' className={`${Head} text-end`}>
                            Hành động
                        </th>

                    </tr>
                </thead>
                <tbody className='bg-main divide-y divide-gray-800'>
                    {
                        data.map((data, i) => Rows(data, i, users, OnEditFunction))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table2