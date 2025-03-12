/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MaintenanceMode from './components/MaintenanceMode';
import ScrollToTop from './components/ScrollToTop';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';

function App() {
  const isMaintenanceMode = false; // Set this to false to disable maintenance mode

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {isMaintenanceMode ? (
          <MaintenanceMode />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;