import React, { useEffect } from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Message, Select } from '../UsedInputs'
import Rating from '../../Components/Stars'
import Empty from '../Notfications/Empty'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReviewValidation } from '../Validation/movieValidation'
import toast from 'react-hot-toast'
import { InlineError } from '../Notfications/Error'
import { Link } from 'react-router-dom'
import { reviewMovieAction } from '../../Redux/Actions/moviesActions'


const Ratings = [
    {
        title: "5 - Xuất sắc luôn",
        value: 5,
    },
    {
        title: "4 - Tuyệt vời",
        value: 4,
    },
    {
        title: "3 - Phim hay á",
        value: 3,
    },
    {
        title: "2 - Củng được",
        value: 2,
    },
    {
        title: "1 - Xem tạm thôi",
        value: 1,
    },
    {
        title: "0 - Phim chán",
        value: 0,
    }
]

const MovieRates = ({ movie }) => {
    const dispatch = useDispatch();
    const { isLoading: reviewLoading, isError: reviewError } = useSelector(
        (state) => state.createReview
    );
    const { userInfo } = useSelector(
        (state) => state.userLogin
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ReviewValidation),
    });

    const onSubmit = (data) => {
        dispatch(reviewMovieAction({
            id: movie?._id,
            review: { ...data },
        }))
    }

    useEffect(() => {
        if (reviewError) {
            toast.error(reviewError);
            dispatch({ type: "CREATE_REVIEW_RESET" });
        }
    }, [reviewError]);

    return (
        <div className='my-12'>
            <Titles title={'Đánh giá'} Icon={BsBookmarkStarFill} />
            <div className='mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-5 rounded-xl'>
                <form onSubmit={handleSubmit(onSubmit)} className='xl:col-span-2 w-full flex flex-col gap-8'>
                    <h3 className="text-xl text-text font-semibold">Bình luận - đánh giá  ({movie?.numberOfReviews}) </h3>
                    <div className="text-sm w-full">
                        <Select label='Chọn Xếp hạng' options={Ratings} name='rating' register={{ ...register('rating') }} />
                        <div className="flex mt-4 text-lg gap-2 text-star">
                            <Rating value={watch("rating", false)} />
                        </div>
                        {errors.rating && <InlineError text={errors.rating.message} />}
                    </div>
                    <div className='w-full'>
                        <Message name='comment' register={{ ...register('comment') }} label="Bình luận" placeholder="Hãy nói cảm nhận của bạn về bộ phim..." />
                        {errors.comment && <InlineError text={errors.comment.message} />}
                    </div>

                    {
                        userInfo ? (
                            <button disabled={reviewLoading} type='submit' className='bg-subMainn hover:bg-transparent border-2 border-subMainn text-white py-3 w-full flex-colo rounded'>
                                {reviewLoading ? "Loading..." : "Xác nhận"}
                            </button>
                        ) : (
                            <Link to='/login' className='bg-subMainn hover:bg-transparent border-2 border-subMainn text-white py-3 w-full flex-colo rounded'>
                                Hãy đăng nhập để bình luận
                            </Link>
                        )
                    }


                </form>
                <div className="w-full col-span-3 flex flex-col gap-6 ">
                    <div className="w-full flex flex-col bg-main gap-2 rounded-xl md:p-12 p-6 h-header overflow-y-scroll scrollbar-custom">
                        {
                            movie?.reviews?.length > 0 ? (
                                movie?.reviews?.map((review) =>
                                    <div key={review._id} className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                                        <div className="col-span-2 bg-main rounded-full hidden md:block h-24 w-24 overflow-hidden">
                                            <img
                                                src={review?.userImage ? review?.userImage : "/images/user.png"}
                                                alt={review?.userName}
                                                className="w-full h-full rounded-full object-cover" />
                                        </div>

                                        <div className="col-span-7 flex flex-col gap-2 md:ml-10 lg:ml-0 xl:ml-7 2xl: ml-0">
                                            <h2>{review?.userName}</h2>
                                            <p className="text-xs leading-6 font-medium text-text  whitespace-normal break-words">{review?.comment}</p>
                                        </div>
                                        <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                                            <Rating value={review?.rating} />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <Empty message={`Bạn hãy là người bình luận đầu tiên cho ${movie?.name}.`} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieRates