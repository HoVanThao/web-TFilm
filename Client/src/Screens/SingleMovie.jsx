import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom'
import { Movies } from '../Data/MovieData'
import MovieInfo from '../Components/Single/MovieInfo'
import MovieCasts from '../Components/Single/MovieCasts'
import MovieRates from '../Components/Single/MovieRates'
import { BsCollectionFill } from 'react-icons/bs'
import Titles from '../Components/Titles'
import Movie from '../Components/Movie'
import ShareMovieModal from '../Components/Modals/ShareModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieByIdAction } from '../Redux/Actions/moviesActions'
import Loader from '../Components/Notfications/Loader'
import { RiMovie2Line } from 'react-icons/ri'

const SingleMovie = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();
    const sameClass = 'w-full gap-6 flex-colo min-h-screen';
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { movies } = useSelector(
        (state) => state.getAllMovies
    );

    const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

    useEffect(() => {
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

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
                            </>
                        )
            }


        </Layout>

    )
}

export default SingleMovie