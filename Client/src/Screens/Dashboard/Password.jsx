import React from 'react'
import SideBar from './SideBar'
import { Input } from '../../Components/UsedInputs'

const Password = () => {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Đổi Mật Khẩu</h2>
                <Input
                    label="Mật khẩu cũ"
                    placeholder="********"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Mật khẩu mới"
                    placeholder="********"
                    type="email"
                    bg={true}
                />
                <Input
                    label="nhập lại mật khẩu mới"
                    placeholder="********"
                    type="email"
                    bg={true}
                />
                <div className="flex justify-end items-center my-4">
                    <button className='bg-main transitions hover:text-subMain font-medium border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </SideBar>
    )
}

export default Password