import React from 'react'
import MainModal from './MainModal'
import { Input } from '../../Components/UsedInputs'

const CategoryModal = ({ modalOpen, setModalOpen, category }) => {
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-3xl font-bold">{category ? "Chỉnh sửa thể loại" : "Thêm thể loại"}</h2>
            <form className="flex flex-col gap-6 text-left mt-6">
                <Input
                    label="Thể loại"
                    placeholder={category ? category.title : "Category Name"}
                    type="text"
                    bg={false}
                />
                <button
                    onClick={() => setModalOpen(false)}
                    className="w-full flex-colo py-4 rounded bg-subMain transitions text-white hover:bg-main transitions border-2 border-subMain"
                >
                    {category ? "Chỉnh sửa" : "Thêm mới"}
                </button>
            </form>
        </MainModal>
    )
}

export default CategoryModal