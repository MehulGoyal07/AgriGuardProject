import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Img6 from "../assets/home-background.png"; // Background image
import Img7 from "../assets/img7.png"; // Update the path to your image
import DemoVideo from "../assets/template.mp4"; // Update the path to your video
import TitleBorder1 from "../assets/title-border1.svg"; // Update the path to your SVG
import TitleBorder2 from "../assets/title-border2.svg"; // Update the path to your SVG

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize AOS
  AOS.init({ duration: 1000, once: true });

  // Toggle modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <section
      className="home__content mt-20 flex flex-col gap-8 p-6 md:p-12 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Img6})` }}
    >
      {/* First Row: Application Overview */}
      <div
        className="flex flex-col justify-center items-center text-center"
        data-aos="fade-down"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Welcome to AgriGuard
        </motion.h1>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl">
          AgriGuard leverages advanced AI technology to help farmers diagnose crop diseases quickly and effectively. Upload your crop images to get instant insights, recommendations, and treatment options.
        </p>

        <div className="flex gap-4">
          <motion.button
            id="live-demo-btn"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleModal}
          >
            Watch Demo
          </motion.button>
          <motion.button
            id="download-app-btn"
            className="bg-white text-green-600 px-6 py-3 rounded-lg border border-green-600 hover:bg-green-50 transition duration-300 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download App
          </motion.button>
        </div>
      </div>

      {/* App Overview Heading */}
      <div
        className="flex justify-center items-center mt-12"
        data-aos="fade-up"
      >
        <div className="text-center relative">
          <div className="flex justify-center gap-4">
            <img src={TitleBorder1} alt="Border Decoration" className="w-16 md:w-24" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mx-4">App Overview</h2>
            <img src={TitleBorder2} alt="Border Decoration" className="w-16 md:w-24" />
          </div>
        </div>
      </div>

      {/* Second Row: Three Full-Width Divs */}
      <div className="flex flex-col gap-8">
        {/* Box 1: Seamless Upload */}
        <motion.div
          className="bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row gap-8 items-center"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          data-aos="fade-right"
        >
          <div className="flex-1">
            <img 
              src={Img7} 
              alt="Seamless Upload" 
              className="rounded-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300 shadow-2xl" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Seamless Upload and Diagnosis</h3>
            <p className="text-gray-600">
              Easily upload crop images and receive instant disease diagnostics with our AI-powered platform.
            </p>
          </div>
        </motion.div>

        {/* Box 2: Detailed Reports */}
        <motion.div
          className="bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row gap-8 items-center"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          data-aos="fade-left"
        >
          <div className="flex-1 order-2 md:order-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Detailed Reports and Remedies</h3>
            <p className="text-gray-600">
              Get comprehensive reports on crop conditions and tailored remedies to address detected issues.
            </p>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <img 
              src={Img7} 
              alt="Detailed Reports" 
              className="rounded-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300 shadow-2xl" 
            />
          </div>
        </motion.div>

        {/* Box 3: Real-Time Monitoring */}
        <motion.div
          className="bg-white/90 p-8 rounded-lg shadow-lg backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col md:flex-row gap-8 items-center"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          data-aos="fade-right"
        >
          <div className="flex-1">
            <img 
              src={Img7} 
              alt="Real-Time Monitoring" 
              className="rounded-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300 shadow-2xl" 
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Time Monitoring</h3>
            <p className="text-gray-600">
              Monitor your crops in real-time with advanced sensors and AI analytics for proactive disease management.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal for Video */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
              onClick={toggleModal}
            >
              &times;
            </button>
            <video controls className="w-full rounded-lg">
              <source src={DemoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;