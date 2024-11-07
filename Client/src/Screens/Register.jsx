import React from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

const Register = () => {
    return (
        <Layout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <div className='w-full 2xl:w-2/5 gap-8 flex-colo p-10 md:w-3/5 bg-dry rounded-lg border border-border'>
                    <img
                        src="/images/logo.png"
                        alt="logo"
                        className="w-full h-12 object-contain" />
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
                    <Input
                        label="Mật khẩu"
                        placeholder="********"
                        type="password"
                        bg={true}
                    />
                    <Link to="/dashboard" className='w-full bg-subMain hover:text-main transitions flex-rows gap-4 text-white p-4 rounded-lg'>
                        <FiLogIn /> Sign Up
                    </Link>
                    <p className='text-center text-border'>
                        Bạn đã có tài khoản?{" "}
                        <Link to='/login' className='text-dryGray font-semibold ml-2 transitions hover:text-subMain'>
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Register