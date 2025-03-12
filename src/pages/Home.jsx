/* eslint-disable no-unused-vars */
import React from 'react'
import ContactUs from '../components/ContactUs'
import CropDiagnosisSection from '../components/CropDiagnosisSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import WhatsAppButton from '../components/WhatsAppButton'

const Home = () => {
  return (
    <>
        <WhatsAppButton/>
        <Header/>
        <Hero/>
        <FeaturesSection/>
        <CropDiagnosisSection/>
        <ContactUs/>
        <Footer/>
    </>
  )
}

export default Home