import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/moviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { LikeMovie } from '../Context/Functionalities';
import Titles from '../Components/Titles';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieRates from '../Components/Single/MovieRates';
import Movie from '../Components/Movie';
import { BsCollectionFill } from 'react-icons/bs';
import { SelectPartFilm } from '../Components/UsedInputs';

const WatchPage = () => {
    let { id } = useParams();
    const [searchParams] = useSearchParams();
    const [play, setPlay] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [selectedPart, setSelectedPart] = useState(1);
    const navigate = useNavigate(); // Thêm trong component
    const [currentEpisode, setCurrentEpisode] = useState(1); // Thêm state để theo dõi tập hiện tại
    const sameClass = 'w-full gap-6 flex-colo min-h-screen';
    const dispatch = useDispatch();
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
    const { movies } = useSelector((state) => state.getAllMovies);

    const isLiked = (movie) => {
        return likedMovies?.some((likedMovie) => likedMovie?._id === movie?._id);
    }

    useEffect(() => {
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

    // Xác định URL video (phim lẻ/phim bộ)
    useEffect(() => {
        if (movie) {
            if (movie.typeFilm === 'single') {
                // Phim lẻ: lấy từ trường video
                setVideoUrl(movie.video || '');
                setPlay(true);
            } else {
                // Phim bộ: lấy từ filmParts dựa trên query params
                const partNumber = parseInt(searchParams.get('ss')) || 1;
                const episodeNumber = parseInt(searchParams.get('ep')) || 1;

                setSelectedPart(partNumber);
                setCurrentEpisode(episodeNumber); // Cập nhật tập hiện tại từ URL

                const selectedPart = movie.filmParts?.find(
                    (part) => part.partNumber === partNumber
                );

                const selectedEpisode = selectedPart?.episodes?.find(
                    (ep) => ep.episodeNumber === episodeNumber
                );

                if (selectedEpisode?.videoUrl) {
                    setVideoUrl(selectedEpisode.videoUrl);
                    setPlay(true);
                } else {
                    setVideoUrl('');
                    setPlay(false);
                }
            }
        }
    }, [movie, searchParams]);

    useEffect(() => {
        if (videoUrl && play) {
            // Tạo một tham chiếu mới đến video element để trigger reload
            const videoElement = document.querySelector('video');
            if (videoElement) {
                videoElement.load();
                videoElement.play().catch(e => console.log("Autoplay prevented:", e));
            }
        }
    }, [videoUrl, play]);

    // Hàm xử lý khi chọn phần phim
    const handlePartChange = (partNumber) => {
        setSelectedPart(parseInt(partNumber));
        setSelectedPart(partNumber);
        // Khi đổi phần, chuyển về tập 1 của phần đó
        navigate(`/watch/${id}?ss=${partNumber}&ep=1`);
    };

    // Lấy phim liên quan
    const RelatedMovies = movies?.filter((m) =>
        m?.category?.some((cat) => movie?.category?.includes(cat)) && m?._id !== movie?._id
    ) || [];


    return (
        <Layout>
            <div className=" mx-auto p-6">

                {
                    !isError && (
                        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded-xl border border-border p-6">
                            <Link to={`/movie/${movie?._id}`} className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray hover:text-subMainn transitions'>
                                <BiArrowBack /> {movie?.nameVn}
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
                        videoUrl ? (
                            <video
                                key={`${selectedPart}-${currentEpisode}`}
                                controls
                                autoPlay={play}
                                className="w-full h-full rounded "
                            >
                                <source src={videoUrl} type="video/mp4" title={movie?.name} />
                            </video>
                        ) : (
                            <div className="w-full flex-colo xl:h-banner lg:h-bannerbottom md:h-96 h-64 border-border border bg-main bg-opacity-30 rounded-lg">

                                <Loader />

                            </div>
                        )
                    ) : (
                        <div className="w-full h-full rounded-xl border border-border overflow-hidden relative">
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
                                            <img src={movie?.image ? movie?.image : "images/user.png"} className="w-full h-full object-cover rounded-lg" />
                                        </>
                                    )
                            }

                        </div>
                    )
                }
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
                                    {movie?.filmParts
                                        .find((part) => part.partNumber === selectedPart)
                                        ?.episodes?.length > 0
                                        ? movie.filmParts.find((part) => part.partNumber === selectedPart).episodes.map((episode) => (
                                            <div
                                                key={episode.episodeNumber}
                                                onClick={() => {
                                                    navigate(`/watch/${movie._id}?ss=${selectedPart}&ep=${episode.episodeNumber}`);
                                                    setCurrentEpisode(episode.episodeNumber);
                                                    setPlay(true); // Đảm bảo set play thành true khi chọn tập mới
                                                }}
                                                // className="bg-dry border-2  rounded-md overflow-hidden border-border hover:text-subMain transition cursor-pointer"
                                                className={`bg-dry border-2 rounded-md overflow-hidden border-border  transition cursor-pointer ${currentEpisode === episode.episodeNumber
                                                    ? 'bg-subMain text-dry border-subMain'
                                                    : 'hover:border-subMain'
                                                    }`}
                                            >
                                                <div className="p-3">
                                                    <h3 className="text-sm font-semibold truncate flex-row">Tập {episode.episodeNumber}: {episode.title}</h3>
                                                </div>
                                            </div>
                                        )) : <p className="text-border">Không có tập phim nào cho phần này.</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    <MovieCasts movie={movie} />
                    <MovieRates movie={movie} />
                    {
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
                    }
                </div>


            </div>
        </Layout>

    )
}

export default WatchPage