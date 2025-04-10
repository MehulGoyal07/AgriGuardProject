import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { I18nextProvider } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import i18n from "../../public/i18n";
import ContactUs from '../components/ContactUs';
import CropDiagnosisSection from '../components/CropDiagnosisSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Shared/Navbar';
import WhatsAppButton from '../components/WhatsAppButton';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  const handleDiagnosisComplete = (hasDisease) => {
    if (hasDisease) {
      navigate('/marketplace?category=remedies');
    }
  };

  const scrollToMarketplace = () => {
    if (isAuthenticated()) {
      navigate('/marketplace');
    } else {
      navigate('/auth/signin', { state: { from: '/marketplace' } });
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white"
      >
        <Navbar />
        <WhatsAppButton />
        
        <main className="flex-grow">
          <Hero 
            onShopNow={scrollToMarketplace}
            data-aos="fade-in"
          />
          
          <div className="bg-white/90 backdrop-blur-sm py-12">
            <FeaturesSection 
              data-aos="fade-up"
              onExploreMarketplace={scrollToMarketplace}
            />
          </div>
          
          <div className="bg-green-50/50 py-12">
            <CropDiagnosisSection 
              onComplete={handleDiagnosisComplete}
              data-aos="fade-up"
            />
          </div>
          
          <div className="bg-white py-12">
            <ContactUs data-aos="fade-up" />
          </div>
        </main>

        <Footer data-aos="fade-up" />
      </motion.div>
    </I18nextProvider>
  );
};

export default Home;