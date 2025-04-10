import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaChartLine, FaLeaf, FaRobot, FaSeedling, FaUsers } from 'react-icons/fa';
import { GiFarmTractor, GiPlantRoots } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';
import img from '../assets/farmer.jpg';
import Footer from '../components/Footer';
import Navbar from '../components/Shared/Navbar';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const stats = [
    { value: '95%', label: 'Detection Accuracy', icon: <MdHealthAndSafety className="text-4xl" /> },
    { value: '10K+', label: 'Farmers Served', icon: <FaUsers className="text-4xl" /> },
    { value: '50+', label: 'Crop Varieties', icon: <GiPlantRoots className="text-4xl" /> },
    { value: '24/7', label: 'Support', icon: <FaRobot className="text-4xl" /> },
  ];

  const features = [
    {
      title: 'AI-Powered Diagnosis',
      description: 'Our deep learning models analyze crop images with precision comparable to agricultural experts.',
      icon: <FaRobot className="text-3xl text-green-600" />,
    },
    {
      title: 'Instant Recommendations',
      description: 'Get tailored treatment plans and preventive measures within seconds of uploading an image.',
      icon: <FaChartLine className="text-3xl text-green-600" />,
    },
    {
      title: 'Marketplace Integration',
      description: 'Direct access to purchase recommended treatments from verified agricultural suppliers.',
      icon: <GiFarmTractor className="text-3xl text-green-600" />,
    },
    {
      title: 'Continuous Learning',
      description: 'Our system improves with every diagnosis, adapting to new diseases and regional variations.',
      icon: <FaSeedling className="text-3xl text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="mt-20 flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-700 to-green-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/path/to/leaf-pattern.png')] bg-repeat opacity-30"></div>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="container mx-auto px-6 text-center relative z-10"
          >
            <motion.div 
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <FaLeaf className="text-6xl text-green-300" />
            </motion.div>
            <h1 
              className="text-5xl font-bold mb-6"
              data-aos="fade-up"
            >
              Revolutionizing Agriculture with AI
            </h1>
            <p 
              className="text-xl max-w-3xl mx-auto mb-10"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              AgriGuard combines cutting-edge artificial intelligence with agricultural expertise to protect crops and empower farmers worldwide.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-800 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Try Disease Detection
            </motion.button>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-green-600 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                className="lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={img} 
                    alt="Farmers using AgriGuard" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent"></div>
                </div>
              </motion.div>
              
              <div className="lg:w-1/2" data-aos="fade-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2023 by a team of AI researchers and agricultural scientists, AgriGuard was born from a simple observation: 
                  most crop diseases go undetected until it&apos;s too late, causing billions in losses annually.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;ve developed a proprietary deep learning system trained on over 500,000 images of healthy and diseased crops, 
                  capable of identifying 200+ common diseases with laboratory-grade accuracy.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Meet Our Team
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4" data-aos="fade-up">
                How Our Technology Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                Simple steps to protect your crops with AI precision
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-16" data-aos="fade-up">
              Trusted by Farmers Worldwide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay={item * 100}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <FaUsers className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Rajesh Patel</h4>
                      <p className="text-sm text-gray-500">Cotton Farmer, Gujarat</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    &quot;AgriGuard detected a fungal infection in my cotton crop weeks before visible symptoms appeared. 
                    The recommended treatment saved me from losing 40% of my yield this season.&quot;
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <star key={star} className="text-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-700 to-green-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6" data-aos="fade-up">
              Ready to Protect Your Crops?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="200">
              Join thousands of farmers who are already using AgriGuard to secure their harvests.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-800 font-semibold px-8 py-3 rounded-lg shadow-lg"
              >
                Get Started for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white font-semibold px-8 py-3 rounded-lg shadow-lg"
              >
                Contact Our Experts
              </motion.button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;