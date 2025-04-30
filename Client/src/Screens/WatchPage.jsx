import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/moviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { LikeMovie } from '../Context/Functionalities';

const WatchPage = () => {
    let { id } = useParams();
    const [play, setPlay] = useState(false);
    const sameClass = 'w-full gap-6 flex-colo min-h-screen';
    const dispatch = useDispatch();
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie?._id);
    }

    useEffect(() => {
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

    return (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12 mt-3">

                {
                    !isError && (
                        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
                            <Link to={`/movie/${movie?._id}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray hover:text-subMainn transitions'>
                                <BiArrowBack /> {movie?.name}
                            </Link>
                            <div className="flex-btn sm:w-auto w-full gap-5">
                                <button onClick={() => LikeMovie(movie, dispatch, userInfo)} disabled={isLiked(movie) || likeLoading}
                                    className={`bg-white ${isLiked(movie) ? 'text-subMainn' : 'text-white'} hover:text-subMainn transitions bg-opacity-30  rounded px-4 py-3`}
                                >
                                    <FaHeart />
                                </button>
                            </div>
                        </div>
                    )
                }

                {
                    play ? (
                        <video controls autoPlay={play} className='w-full h-full rounded'>
                            <source src={movie?.video} type="video/mp4" title={movie?.name} />
                        </video>
                    ) : (
                        <div className="w-full h-full rounded-lg overflow-hidden relative">
                            {
                                isLoading ? (
                                    <div className={sameClass}>
                                        <Loader />
                                    </div>
                                ) :
                                    isError ? (
                                        <div className={sameClass}>
                                            <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMainn text-4xl'>
                                                <RiMovie2Line />
                                            </div>
                                            <p className='text-border text-sm'>
                                                Đã có lỗi xảy ra {isError}
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                                                <button onClick={() => setPlay(true)} className='bg-white text-subMainn hover:bg-dry transitions flex-colo border  rounded-full w-20 h-20 font-medium text-xl'>
                                                    <FaPlay />
                                                </button>
                                            </div>
                                            <img src={movie?.image ? `/images/movies/${movie?.image}` : "images/user.png"} className="w-full h-full object-cover rounded-lg" />
                                        </>
                                    )
                            }

                        </div>
                    )
                }
            </div>
        </Layout>

    )
}

export default WatchPage