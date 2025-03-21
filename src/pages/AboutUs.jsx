/* eslint-disable no-unused-vars */
import React from 'react';
import { I18nextProvider } from "react-i18next";
import i18n from "../../public/i18n";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  return (
    <I18nextProvider i18n={i18n}>
        <WhatsAppButton/>
        <Header/>
        <Footer/>
    </I18nextProvider>
  )
}

export default Home