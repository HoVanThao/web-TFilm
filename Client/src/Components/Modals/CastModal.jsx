import React from 'react'
import MainModal from './MainModal'
import { Input } from '../../Components/UsedInputs'
import Uploder from '../Uploder'

const CastModal = ({ modalOpen, setModalOpen, cast }) => {
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-3xl font-bold">{cast ? "Chỉnh sửa" : "Thêm mới"}</h2>
            <form className="flex flex-col gap-6 text-left mt-6">
                <Input
                    label="Tên diễn viên"
                    placeholder={cast ? cast.fullname : "Cast Name"}
                    type="text"
                    bg={false}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-border font-semibold text-sm">
                        Ảnh diễn viên
                    </p>
                    <Uploder />
                    <div className="w-32 h-32 p-2 bg-main border border-border rounded">
                        <img src={`/images/${cast ? cast.image : "user.png"}`} alt={cast?.fullname} className="w-full h-full object-cover rounded" />
                    </div>
                </div>
                <button
                    onClick={() => setModalOpen(false)}
                    className="w-full flex-colo py-4 rounded bg-subMain transitions text-white hover:bg-main transitions border-2 border-subMain"
                >
                    {cast ? "Chỉnh sửa" : "Thêm mới"}
                </button>
            </form>
        </MainModal>
    )
}

export default CastModal