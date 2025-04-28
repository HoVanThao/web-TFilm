import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import TopTrending from '../Components/Home/TopTrending'
import BannerBottom from '../Components/Home/BannerBottom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction } from '../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(
        (state) => state.getRandomMovies
    );

    const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
        (state) => state.getTopRatedMovie
    );

    const { isLoading, isError, movies } = useSelector(
        (state) => state.getAllMovies
    );

    useEffect(() => {
        dispatch(getRandomMoviesAction());
        dispatch(getAllMoviesAction({}));
        dispatch(getTopRatedMovieAction());
        if (isError || randomError || topError) {
            toast.error("Đã có lỗi sảy ra HomeScreen!")
        }

    }, [dispatch, isError, randomError, topError]);

    return (
        <Layout>
            <Banner movies={movies} isLoading={isLoading} />
            <div className='mx-5 min-h-screen mb-6'>
                <BannerBottom movies={movies} isLoading={isLoading} />

                <PopularMovies movies={randomMovies} isLoading={randomLoading} title={'Phim thịnh hành'} />
                <TopRated movies={topMovies} isLoading={topLoading} title={'Phim hay hôm nay'} />

                {/* <PopularMovies />
                <TopRated /> */}
                {/* <Promos /> */}

            </div>
        </Layout>

    )
}

export default HomeScreen