import React from 'react'
import SideBar from '../SideBar'
import { usersData } from '../../../Data/MovieData'
import Table2 from '../../../Components/Table2'
import { HiPlusCircle } from 'react-icons/hi'

const Users = () => {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Thể loại</h2>
                    <button className='bg-subMain font-medium gap-2 flex flex-row items-center transitions hover:text-main border border-subMain text-white py-2 px-4 rounded'>
                        <HiPlusCircle /> Thêm
                    </button>
                </div>
                <Table2 data={usersData} users={true} />
            </div>
        </SideBar >
    )
}

export default Users