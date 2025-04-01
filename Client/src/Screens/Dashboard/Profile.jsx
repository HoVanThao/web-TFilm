import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Uploder from '../../Components/Uploder'
import { Input } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateValidation } from '../../Components/Validation/userValidation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { InlineError } from '../../Components/Notfications/Error'
import { ImagePreview } from '../../Components/ImagePreview'
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions'

const Profile = () => {

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin)
    const { isLoading, isError, isSuccess } = useSelector((state) => state.userUpdateProfile)
    const { isLoading: deleteLoading, isError: deleteError } = useSelector((state) => state.userDeleteProfile)
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");



    //validation user
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(UpdateValidation),
    });

    const onSubmit = (data) => {
        dispatch(updateProfileAction({ ...data, image: imageUrl }));
        //console.log({ ...data, image: imageUrl })
    }

    const deleteProfile = () => {
        window.confirm("Bạn có chắc muốn xóa tài khoản?")
        dispatch(deleteProfileAction());
    }

    useEffect(() => {
        if (userInfo) {
            setValue("fullName", userInfo?.fullName);
            setValue("email", userInfo?.email);
        }

        if (isSuccess) {
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
        }

        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
            dispatch({ type: "USER_DELETE_PROFILE_RESET" })
        }

    }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Cập Nhật Hồ Sơ</h2>
                <div className='w-full grid lg:grid-cols-12 gap-6'>
                    <div className='col-span-10'>
                        <Uploder setImageUrl={setImageUrl} />
                    </div>
                    <div className='col-span-2'>
                        <ImagePreview name={userInfo ? userInfo.fullName : 'HamPhim'} image={imageUrl} />
                    </div>
                </div>

                <div className='w-full'>
                    <Input
                        label="Họ và tên"
                        placeholder="Hồ Văn Thảo"
                        type="text"
                        name='fullName'
                        register={register("fullName")}
                        bg={true}
                    />
                    {
                        errors.fullName && <InlineError text={errors.fullName.message} />
                    }
                </div>
                <div className='w-full'>
                    <Input
                        label="Email"
                        placeholder="hovanthao0611cs@gmail.com"
                        type="email"
                        name='email'
                        register={register("email")}
                        bg={true}
                    />
                    {
                        errors.email && <InlineError text={errors.email.message} />
                    }
                </div>
                <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
                    <button disabled={deleteLoading || isLoading} className='bg-subMainn transitions hover:text-black font-medium border border-subMainn text-white py-3 px-6 rounded w-full sm:w-auto'>
                        {
                            isLoading ? "Loading..." : "Update Profile"
                        }
                    </button>
                    <button onClick={deleteProfile} disabled={deleteLoading || isLoading} className='bg-subMainn transitions hover:text-black font-medium border border-subMainn text-white py-3 px-6 rounded w-full sm:w-auto'>
                        {
                            deleteLoading ? "Deleting..." : "Delete Account"
                        }
                    </button>
                </div>
            </form>
        </SideBar>
    )
}

export default Profile