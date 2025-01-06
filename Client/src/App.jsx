import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import HomeScreen from './Screens/HomeScreen';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import Movies from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';
import Login from './Screens/Login';
import Register from './Screens/Register';
import Profile from './Screens/Dashboard/Profile';
import Password from './Screens/Dashboard/Password';
import FavoritesMovies from './Screens/Dashboard/FavoritesMovies';
import MovieList from './Screens/Dashboard/Admin/MovieList';
import Dashboard from './Screens/Dashboard/Admin/Dashboard';

import Aos from 'aos';
import 'aos/dist/aos.css';
import Users from './Screens/Dashboard/Admin/Users';
import Categories from './Screens/Dashboard/Admin/Categories';
import AddMovie from './Screens/Dashboard/Admin/AddMovie';
import ScrollOnTop from './ScrollOnTop';


const App = () => {
  // Khởi tạo AOS trong useEffect
  useEffect(() => {
    Aos.init();
  }, []);

  return (

    <ScrollOnTop>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password" element={<Password />} />
        <Route path="/favorites" element={<FavoritesMovies />} />
        <Route path="/movieslist" element={<MovieList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ScrollOnTop>

  );
};

export default App