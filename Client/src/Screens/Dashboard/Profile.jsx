import React from 'react'
import SideBar from './SideBar'
import Uploder from '../../Components/Uploder'
import { Input } from '../../Components/UsedInputs'

const Profile = () => {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Cập Nhật Hồ Sơ</h2>
                <Uploder />
                <Input
                    label="Họ và tên"
                    placeholder="Hồ Văn Thảo"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Email"
                    placeholder="hovanthao0611cs@gmail.com"
                    type="email"
                    bg={true}
                />
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                    <button className='bg-main transitions hover:text-subMain font-medium border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Lưu thông tin
                    </button>
                    <button className='bg-main transitions hover:text-subMain font-medium border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Xóa tài khoản
                    </button>
                </div>
            </div>
        </SideBar>
    )
}

export default Profile