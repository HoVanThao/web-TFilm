import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import TopTrending from '../Components/Home/TopTrending'
import BannerBottom from '../Components/Home/BannerBottom'

const HomeScreen = () => {
    return (
        <Layout>
            <Banner />
            <div className='mx-5 min-h-screen mb-6'>
                <BannerBottom />

                <PopularMovies />
                <TopRated />

                <PopularMovies />
                <TopRated />
                <Promos />

            </div>
        </Layout>

    )
}

export default HomeScreen