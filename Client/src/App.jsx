import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AboutUs from './Screens/AboutUs';
import HomeScreen from './Screens/HomeScreen';
import NotFound from './Screens/NotFound';
import ContactUs from './Screens/ContactUs';
import Movies from './Screens/Movies';
import SingleMovie from './Screens/SingleMovie';
import WatchPage from './Screens/WatchPage';


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App