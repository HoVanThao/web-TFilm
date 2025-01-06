import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import PopularMovies from '../Components/Home/PopularMovies'
import Promos from '../Components/Home/Promos'
import TopRated from '../Components/Home/TopRated'
import TopTrending from '../Components/Home/TopTrending'

const HomeScreen = () => {
    return (
        <Layout>
            <div className='mx-1'>
                <Banner />
            </div>
            <div className='container mx-auto min-h-screen px-2 mb-6'>
                <PopularMovies />
                <TopTrending />
                <TopRated />
                <Promos />

            </div>
        </Layout>

    )
}

export default HomeScreen