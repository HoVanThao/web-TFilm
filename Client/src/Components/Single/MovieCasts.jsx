import React from 'react'
import Titles from '../Titles'
import { FaUserFriends } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

const MovieCasts = ({ movie }) => {

    return (
        movie?.casts?.length > 0 && (
            <div className='my-12'>
                <Titles title="Diễn viên" Icon={FaUserFriends} />
                <div className='mt-10'>
                    <Swiper autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                        // loop={true} 
                        speed={1000} modules={[Autoplay]}
                        spaceBetween={10}
                        slidesPerView="auto"

                    >
                        {
                            movie?.casts?.slice(0, 5).map((cast) => (
                                <SwiperSlide key={cast?._id} style={{ width: 'auto' }}>
                                    <div className="w-36 p-1 italic text-xs text-text rounded-xl  flex-colo bg-dry border-2 border-gray-800">
                                        <img src={cast?.image ? cast.image : '/images/user.png'} alt={cast?.name} className="w-32 h-32 mt-1 object-cover rounded-xl" />
                                        <p className="mt-2 text-center truncate">{cast?.name}</p>
                                    </div>

                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        )

    )
}

export default MovieCasts