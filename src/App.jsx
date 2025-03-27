/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import MaintenanceMode from './components/MaintenanceMode';
import ScrollToTop from './components/ScrollToTop';
import AboutUs from './pages/AboutUs';
import AuthPage from './pages/AuthPage';
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
            <Route path = "/auth" element={<AuthPage/>}>
               <Route path="signin" element={<SignIn />} />
               <Route path="signup" element={<SignUp />} />
            </Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;