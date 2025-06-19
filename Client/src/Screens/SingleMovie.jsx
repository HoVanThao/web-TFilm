import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useParams } from 'react-router-dom'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import Titles from '../Components/Titles'
import Movie from '../Components/Movie'
import ShareMovieModal from '../Components/Modals/ShareModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByIdAction, getRecommendedMoviesAction } from '../Redux/Actions/moviesActions'
import Loader from '../Components/Notfications/Loader'
import { RiMovie2Line } from 'react-icons/ri'
import { SelectPartFilm } from '../Components/UsedInputs'

const SingleMovie = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState(1); // Chỉ số phần phim được chọn
    const { id } = useParams();
    const dispatch = useDispatch();
    const sameClass = 'w-full gap-6 flex-colo min-h-screen';
    const { userInfo } = useSelector((state) => state.userLogin);
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { movies } = useSelector(
        (state) => state.getAllMovies
    );

    // const RelatedMovies = movies?.filter((m) =>
    //     m?.category?.some((cat) => movie?.category?.includes(cat)) && m?._id !== movie?._id
    // ) || [];

    // Lấy recommended movies từ redux store

    const {
        isLoading: loadingRecommended,
        isError: errorRecommended,
        recommendedMovies
    } = useSelector((state) => state.recommendedMovies);


    useEffect(() => {
        dispatch(getMovieByIdAction(id));
        if (userInfo?.token) {
            dispatch(getRecommendedMoviesAction());
        }
    }, [dispatch, id, userInfo?.token]);

    // Hàm xử lý khi chọn phần phim
    const handlePartChange = (partNumber) => {
        setSelectedPart(parseInt(partNumber));
    };

    return (
        <Layout>
            {
                isLoading ? <div className={sameClass}>
                    <Loader />
                </div>
                    :
                    isError ? <div className={sameClass}>
                        <div className='flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMainn text-4xl'>
                            <RiMovie2Line />
                        </div>
                        <p className='text-border text-sm'>
                            Đã có lỗi xảy ra {isError}
                        </p>
                    </div>
                        : (
                            <>
                                <ShareMovieModal modalOpen={modalOpen} setModalOpen={setModalOpen} movie={movie} />
                                <MovieInfo movie={movie} setModalOpen={setModalOpen} />
                                <div className='container mx-auto min-h-screen px-2 my-6'>
                                    {/* Phần hiển thị danh sách tập phim nếu là series */}
                                    {movie?.typeFilm === 'series' && movie.filmParts?.length > 0 && (
                                        <div className="mb-12">
                                            <Titles title="Danh sách tập phim" Icon={BsCollectionFill} />
                                            <div className="mt-5">
                                                {/* Dropdown chọn phần phim */}
                                                <div className="w-full md:w-1/3 mb-6">
                                                    <SelectPartFilm
                                                        label="Chọn phần phim"
                                                        options={movie?.filmParts?.map((part) => ({
                                                            title: part.title,
                                                            value: part.partNumber,
                                                        }))}
                                                        onChange={handlePartChange}
                                                        value={selectedPart}
                                                    />
                                                </div>

                                                {/* Grid hiển thị các tập phim */}
                                                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                                                    {movie.filmParts
                                                        .find((part) => part.partNumber === selectedPart)
                                                        ?.episodes?.length > 0
                                                        ? movie.filmParts.find((part) => part.partNumber === selectedPart).episodes.map((episode) => (
                                                            <Link
                                                                to={`/watch/${movie._id}?ss=${selectedPart}&ep=${episode.episodeNumber}`}
                                                                key={episode.episodeNumber}
                                                                className="bg-dry border-2  rounded-md overflow-hidden border-border hover:text-subMain transition cursor-pointer"
                                                            >
                                                                <div className="p-3">
                                                                    <h3 className="text-sm font-semibold truncate flex-row">{episode.title}</h3>
                                                                </div>
                                                            </Link>
                                                        )) : <p className="text-border">Không có tập phim nào cho phần này.</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <MovieCasts movie={movie} />
                                    <MovieRates movie={movie} />
                                    {/* {
                                        RelatedMovies?.length > 0 && (
                                            <div className="my-16">
                                                <Titles title="Phim dành cho bạn" Icon={BsCollectionFill} />
                                                <div className='grid sm:mt-10 mt-6 xl:grid-cols-5 2xl:grid-cols-56 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                                    {
                                                        RelatedMovies?.slice(0, 5).map((movie, index) => (
                                                            <Movie key={index} movie={movie} />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } */}
                                    {/* Thêm phần Recommended Movies */}
                                    {userInfo?.token && !loadingRecommended && !errorRecommended && recommendedMovies?.data?.length > 0 && (
                                        <div className="my-16">
                                            <Titles title="Gợi ý cho bạn" Icon={BsCollectionFill} />
                                            <div className='grid sm:mt-10 mt-6 xl:grid-cols-5 2xl:grid-cols-56 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                                {recommendedMovies.data
                                                    ?.filter(rec => rec.movieId._id !== id)
                                                    ?.slice(0, 5)
                                                    .map((rec, index) => (
                                                        <div key={index} className="flex flex-col">
                                                            <Movie movie={rec.movieId} />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}

                                    {/* Hiển thị loading state */}
                                    {loadingRecommended && (
                                        <div className="my-16">
                                            <Titles title="Gợi ý cho bạn" Icon={BsCollectionFill} />
                                            <div className="flex justify-center mt-8">
                                                <Loader />
                                            </div>
                                        </div>
                                    )}

                                    {/* Hiển thị error state */}
                                    {errorRecommended && (
                                        <div className="my-16">
                                            <Titles title="Gợi ý cho bạn" Icon={BsCollectionFill} />
                                            <div className="flex justify-center items-center mt-8">
                                                <div className="text-center text-red-500">
                                                    <RiMovie2Line className="text-4xl mx-auto mb-2" />
                                                    <p>Đã có lỗi xảy ra</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )
            }
        </Layout>
    )
}

export default SingleMovie