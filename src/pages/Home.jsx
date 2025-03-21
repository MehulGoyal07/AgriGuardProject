/* eslint-disable no-unused-vars */
import React from 'react';
import { I18nextProvider } from "react-i18next";
import i18n from "../../public/i18n";
import ContactUs from '../components/ContactUs';
import CropDiagnosisSection from '../components/CropDiagnosisSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  return (
    <I18nextProvider i18n={i18n}>
        <WhatsAppButton/>
        <Header/>
        <Hero/>
        <FeaturesSection/>
        <CropDiagnosisSection/>
        <ContactUs/>
        <Footer/>
    </I18nextProvider>
  )
}

export default Home