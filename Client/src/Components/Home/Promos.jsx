import React from 'react'
import { FiUser } from 'react-icons/fi'

const Promos = () => {
    return (
        <>
            <div className="my-20 py-10 md:px-20 px-8 bg-dry">
                <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
                    <div className='flex lg:gap-10 gap-6 flex-col'>
                        <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-loose'>
                            Tải phim và xem ngoại tuyến. <br /> Thưởng thức trên điện thoại di động.
                        </h1>
                        <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
                            Với tính năng Tải Phim Xem Ngoại Tuyến tại TFilmHaven, bạn có thể lưu trữ những bộ phim yêu thích để thưởng thức mọi lúc, mọi nơi,
                            ngay cả khi không có kết nối Internet. Chỉ cần vài bước đơn giản, bạn sẽ có cả kho phim trong tầm tay,
                            sẵn sàng đồng hành cùng bạn trên mọi chuyến đi, từ những lúc chờ đợi đến những hành trình xa.
                            Đặc biệt, bạn có thể thưởng thức trên thiết bị di động một cách dễ dàng và tiện lợi, mang cả thế giới điện ảnh theo bên mình!
                        </p>
                        <div className='flex gap-4 md:text-lg text-sm'>
                            <div className='flex-colo bg-black text-subMain px-6 py-3 rounded font-bold'>
                                HD 4K
                            </div>
                            <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold'>
                                <FiUser />2K
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src='/images/mobile.png' alt='Mobile app' className='w-full object-contain' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Promos