/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('signup') ? 'signup' : 'signin'
  );

  // Redirect to marketplace if already logged in
  useEffect(() => {
    if (user) {
      navigate('/marketplace');
    }
  }, [user, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/auth/${tab}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Logo Header */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-8"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ 
              repeat: Infinity,
              duration: 20,
              ease: "linear"
            }}
            className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
          >
            <Leaf className="w-8 h-8 text-green-600" />
          </motion.div>
          <h1 className="text-center text-3xl font-bold text-gray-800">
            <span className="text-green-600">Agri</span>Guard
          </h1>
          <p className="mt-2 text-center text-gray-600">
            AI-powered crop protection system
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-4 mb-6"
        >
          <TabButton
            active={activeTab === 'signin'}
            onClick={() => handleTabChange('signin')}
          >
            Sign In
          </TabButton>
          <TabButton
            active={activeTab === 'signup'}
            onClick={() => handleTabChange('signup')}
          >
            Sign Up
          </TabButton>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100/50"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div 
          variants={itemVariants}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
        active
          ? 'bg-green-600 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}