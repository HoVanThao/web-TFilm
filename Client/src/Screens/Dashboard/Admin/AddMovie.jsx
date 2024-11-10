import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Input, Message, Select } from '../../../Components/UsedInputs'
import Uploder from '../../../Components/Uploder'
import { CategoriesData } from '../../../Data/CategoriesData'
import { usersData } from '../../../Data/MovieData'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { ImUpload } from 'react-icons/im'
import CastModal from '../../../Components/Modals/CastModal'

const AddMovie = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);


    useEffect(() => {
        if (modalOpen === false) {
            setCast();
        }
    }, [modalOpen]);

    return (
        <SideBar>
            <CastModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Thêm mới phim</h2>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <Input
                        label="Tiêu đề phim"
                        placeholder="Tôi thấy hoa vàng trên cỏ xanh"
                        type="text"
                        bg={true}
                    />
                    <Input
                        label="Thời lượng"
                        placeholder="2h"
                        type="number"
                        bg={true}
                    />
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <Input
                        label="Ngôn ngữ"
                        placeholder="Nihongo"
                        type="text"
                        bg={true}
                    />
                    <Input
                        label="Năm"
                        placeholder="2025"
                        type="number"
                        bg={true}
                    />
                </div>
                <div className="w-full grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Ảnh không tiêu đề
                        </p>
                        <Uploder />
                        <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                            <img src="/images/movies/99.jpg" alt="" className="w-full h-full object-cover rounded" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-border font-semibold text-sm">
                            Ảnh có tiêu đề
                        </p>
                        <Uploder />
                        <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                            <img src="/images/movies/88.jpg" alt="" className="w-full h-full object-cover rounded" />
                        </div>
                    </div>
                </div>

                <Message
                    label="Mô tả phim"
                    placeholder="Giới thiệu ngắn gọn"
                />
                <div className="text-sm w-full">
                    <Select label="Thể loại" options={CategoriesData} />
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <label className="text-border font-semibold text-sm">
                        Video film
                    </label>
                    <Uploder />
                </div>
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start ">
                    <button onClick={() => setModalOpen(true)} className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded">
                        Thêm diễn viên
                    </button>
                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {
                            usersData.map((user, i) => (
                                <div key={i} className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border">
                                    <img
                                        src={`/images/${user.image ? user.image : "user.png"} `}
                                        alt={user.fullname}
                                        className="w-full h-24 object-cover rounded mb-2"
                                    />
                                    <p>{user.fullname}</p>
                                    <div className="flex-rows mt-2 w-full gap-2">
                                        <button className="w-6 h-6 flex-colo bg-subMain text-white hover:bg-main transitions border border-subMain rounded">
                                            <MdDelete />
                                        </button>
                                        <button onClick={() => { setCast(user); setModalOpen(true); }} className="w-6 h-6 flex-colo bg-green-500 text-white hover:bg-main transitions border border-green-600 rounded">
                                            <FaEdit />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <button className='bg-subMain w-full flex-rows gap-6 transitions hover:bg-dry font-medium border-2 border-subMain text-white py-4 px-6 rounded sm:w-auto'>
                    <ImUpload /> Thêm phim mới
                </button>
            </div>
        </SideBar>
    )
}

export default AddMovie