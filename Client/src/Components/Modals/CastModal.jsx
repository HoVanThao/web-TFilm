import React, { useEffect, useState } from 'react'
import MainModal from './MainModal'
import { Input } from '../../Components/UsedInputs'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addCastAction, updateCastAction } from '../../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'
import { InlineError } from '../Notfications/Error'
import { ImagePreview } from '../ImagePreview'
import UploderCast from '../UploderCast'

const CastModal = ({ modalOpen, setModalOpen, cast }) => {
    const dispatch = useDispatch();
    const [castImage, setCastImage] = useState("");
    const [castId, setCastId] = useState("");
    // const generateId = Math.floor(Math.random() * 100000000);
    const image = castImage ? castImage : cast?.image;

    // validate movie
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required("Tên diễn viên là bắt buộc!")
            })
        ),
    });

    const onSubmit = (data) => {
        if (cast) {
            dispatch(updateCastAction({
                ...data,
                image: image,
                id: cast.id,
            }))
            toast.success("Update thành công!")
        } else {
            dispatch(addCastAction({
                ...data,
                image: image,
                id: castId,
            }))
            toast.success("create thành công!")
        }
        reset();
        setCastImage("");
        setCastId("")
        setModalOpen(false);
    }

    useEffect(() => {
        if (cast) {
            setValue("name", cast?.name);
        }
    }, [cast, setValue]);



    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <h2 className="text-3xl font-bold">{cast ? "Chỉnh sửa" : "Thêm mới"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left mt-6">
                <div className='w-full'>
                    <Input
                        label="Tên diễn viên"
                        placeholder={cast ? cast.fullname : "Văn Thảo"}
                        type="text"
                        name='name'
                        register={register("name")}
                        bg={true}
                    />
                    {
                        errors.name && <InlineError text={errors.name.message} />
                    }
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-border font-semibold text-sm">
                        Ảnh diễn viên
                    </p>
                    <UploderCast setImageUrl={setCastImage} setCastId={setCastId} />
                    <ImagePreview
                        image={
                            image ? image : "images/user.png"
                        }

                        name="castImage"
                    />
                </div>
                <button
                    type='submit'
                    onClick={() => setModalOpen(false)}
                    className="w-full flex-colo py-4 rounded bg-subMainn transitions text-white hover:bg-main transitions border-2 border-subMainn"
                >
                    {cast ? "Chỉnh sửa" : "Thêm mới"}
                </button>
            </form>
        </MainModal>
    )
}

export default CastModal