import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { CategoriesData } from '../../../Data/CategoriesData'
import Table2 from '../../../Components/Table2'
import { HiPlusCircle } from 'react-icons/hi'
import CategoryModal from '../../../Components/Modals/CategoryModal'

const Categories = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState();

    const OnEditFunction = (id) => {
        setCategory(id);
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        if (modalOpen === false) {
            setCategory();
        }
    }, [modalOpen]);

    return (
        <SideBar>
            <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category} />
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Thể loại</h2>
                    <button onClick={() => setModalOpen(true)} className='bg-subMain font-medium gap-2 flex flex-row items-center transitions hover:text-main border border-subMain text-white py-2 px-4 rounded'>
                        <HiPlusCircle /> Thêm
                    </button>
                </div>
                <Table2 data={CategoriesData} users={false} OnEditFunction={OnEditFunction} />

            </div>
        </SideBar >
    )
}

export default Categories