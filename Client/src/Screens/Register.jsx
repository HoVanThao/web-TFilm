import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InlineError } from '../Components/Notfications/Error'
import toast from 'react-hot-toast'
import { registerAction } from '../Redux/Actions/userActions'
import { RegisterValidation } from '../Components/Validation/userValidation'

const Register = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userRegister)

    //validation user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterValidation),
    });

    const onSubmit = (data) => {
        dispatch(registerAction(data))
    }

    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/dashboard");
        }
        else if (userInfo) {
            navigate("/profile");
        }

        if (isSuccess) {
            toast.success(`Chào mừng ${userInfo?.fullName} đến với HamPhim`);
            dispatch({ type: "USER_REGISTER_RESET" });
        }

        if (isError) {
            toast.error(isError);
            dispatch({ type: "USER_REGISTER_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

    return (
        <Layout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full 2xl:w-2/5 gap-8 flex-colo p-10 md:w-3/5 bg-dry rounded-lg border border-border'>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="w-full h-12 object-contain" />
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
                    <div className='w-full'>
                        <Input
                            label="Mật khẩu"
                            placeholder="********"
                            type="password"
                            bg={true}
                            name='password'
                            register={register("password")}
                        />
                        {
                            errors.password && <InlineError text={errors.password.message} />
                        }
                    </div>
                    <div className='w-full'>
                        <Input
                            label="Nhập lại mật khẩu"
                            placeholder="********"
                            type="password"
                            bg={true}
                            name='confirmPassword'
                            register={register("confirmPassword")}
                        />
                        {
                            errors.confirmPassword && <InlineError text={errors.confirmPassword.message} />
                        }
                    </div>
                    <button type='submit' disabled={isLoading} className='w-full bg-subMainn hover:text-main transitions flex-rows gap-4 text-white p-4 rounded-lg'>
                        {isLoading ? ("Loading...") : (
                            <>
                                <FiLogIn /> Sign Up
                            </>
                        )}
                    </button>
                    <p className='text-center text-border'>
                        Bạn đã có tài khoản?{" "}
                        <Link to='/login' className='text-dryGray font-semibold ml-2 transitions hover:text-subMain'>
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Register