// import React, { useEffect, useState } from 'react'
// import Layout from '../Layout/Layout'
// import Banner from '../Components/Home/Banner'
// import PopularMovies from '../Components/Home/PopularMovies'
// import Promos from '../Components/Home/Promos'
// import TopRated from '../Components/Home/TopRated'
// import TopTrending from '../Components/Home/TopTrending'
// import BannerBottom from '../Components/Home/BannerBottom'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllMoviesAction, getAnimeMoviesAction, getCinemaMoviesAction, getRandomMoviesAction, getSeriesMoviesAction, getSingleMoviesAction, getTopRatedMovieAction } from '../Redux/Actions/moviesActions'
// import toast from 'react-hot-toast'
// import Loader from '../Components/Notfications/Loader'

// const HomeScreen = () => {
//     const dispatch = useDispatch();
//     const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(
//         (state) => state.getRandomMovies
//     );

//     const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
//         (state) => state.getTopRatedMovie
//     );

//     const { isLoading, isError, movies } = useSelector(
//         (state) => state.getAllMovies
//     );

//     const { isLoading: cinemaLoading, isError: cinemaError, movies: cinemaMovies } = useSelector(
//         (state) => state.getCinemaMovies
//     );
//     const { isLoading: singleLoading, isError: singleError, movies: singleMovies } = useSelector(
//         (state) => state.getSingleMovies
//     );
//     const { isLoading: seriesLoading, isError: seriesError, movies: seriesMovies } = useSelector(
//         (state) => state.getSeriesMovies
//     );
//     const { isLoading: animeLoading, isError: animeError, movies: animeMovies } = useSelector(
//         (state) => state.getAnimeMovies
//     );

//     useEffect(() => {
//         dispatch(getRandomMoviesAction());
//         dispatch(getAllMoviesAction({}));
//         dispatch(getTopRatedMovieAction());
//         dispatch(getCinemaMoviesAction());
//         dispatch(getSingleMoviesAction());
//         dispatch(getSeriesMoviesAction());
//         dispatch(getAnimeMoviesAction());
//         // Hiển thị lỗi nếu có
//         if (isError || cinemaError || singleError || seriesError || animeError || topError || randomError) {
//             toast.error('Đã có lỗi xảy ra ở HomeScreen!');
//         }
//     }, [dispatch, isError, cinemaError, singleError, seriesError, animeError, topError, randomError]);

//     return (
//         <Layout>
//             <Banner movies={movies} isLoading={isLoading} />
//             <div className='mx-5 min-h-screen mb-6'>
//                 <BannerBottom movies={cinemaMovies} isLoading={cinemaLoading} />
//                 <PopularMovies movies={randomMovies} isLoading={randomLoading} title={'Phim thịnh hành'} />
//                 <TopRated movies={topMovies} isLoading={topLoading} title={'Phim được đánh giá cao'} />
//                 <PopularMovies movies={singleMovies} isLoading={singleLoading} title={'Phim lẻ hay nhất'} />
//                 <TopRated movies={animeMovies} isLoading={animeLoading} title={'Anime hay nhất'} />
//                 <PopularMovies movies={seriesMovies} isLoading={seriesLoading} title={'Phim bộ hay nhất'} />
//                 {/* <Promos /> */}

//             </div>
//         </Layout>

//     )
// }

// export default HomeScreen


import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import TopRated from '../Components/Home/TopRated'
import BannerBottom from '../Components/Home/BannerBottom'
import { useDispatch, useSelector } from 'react-redux'
import { getHomePageDataAction } from '../Redux/Actions/moviesActions'
import toast from 'react-hot-toast'

const HomeScreen = () => {
    const dispatch = useDispatch();
    const {
        isLoading,
        isError,
        randomMovies,
        topRatedMovies,
        allMovies,
        cinemaMovies,
        singleMovies,
        seriesMovies,
        animeMovies
    } = useSelector((state) => state.homePageData);

    useEffect(() => {
        dispatch(getHomePageDataAction());
        if (isError) {
            toast.error('Đã có lỗi xảy ra khi tải dữ liệu trang chủ!');
        }
    }, [dispatch, isError]);

    return (
        <Layout>
            <Banner movies={allMovies} isLoading={isLoading} />
            <div className='mx-5 min-h-screen mb-6'>
                <BannerBottom movies={cinemaMovies} isLoading={isLoading} />
                <PopularMovies movies={randomMovies} isLoading={isLoading} title={'Phim thịnh hành'} to={"/movies?year=2025"} />
                <TopRated movies={topRatedMovies} isLoading={isLoading} title={'Phim được đánh giá cao'} to={"/movies?rate=4"} />
                <PopularMovies movies={singleMovies} isLoading={isLoading} title={'Phim lẻ hay nhất'} to={"/movies?typeFilm=single"} />
                <TopRated movies={animeMovies} isLoading={isLoading} title={'Anime hay nhất'} to={"/movies?category=Anime"} />
                <PopularMovies movies={seriesMovies} isLoading={isLoading} title={'Phim bộ hay nhất'} to={"/movies?typeFilm=series"} />
            </div>
        </Layout>
    );
};

export default HomeScreen