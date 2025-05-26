/* eslint-disable react/prop-types */
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import CartIcon from "../Cart/CartIcon";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    console.log('Navbar User:', user); // Debug log
  }, [user]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: t('header.detection'), path: "/detection" },
    { name: t('header.marketplace'), path: "/marketplace" },
    { name: t('header.about'), path: "/aboutus" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setShowProfileDropdown(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setShowLanguageDropdown(false);
    if (isOpen) setIsOpen(false);
  };

  // Profile Circle Component
  const ProfileCircle = ({ name }) => {
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '';

    return (
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-medium">
        {initials || <FaUser className="h-4 w-4" />}
      </div>
    );
  };

  return (
    <header
      className="fixed top-0 left-0 w-full bg-primary/90 backdrop-blur-sm text-white p-4 md:p-6 shadow-lg z-50 transition-all duration-300 ease-in-out"
      data-aos="fade-down"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center"
        >
          <Link to="/" className="hover:opacity-90 transition duration-300 flex items-center">
            <img src={Logo} alt="AgriGuard Logo" className="h-12 w-12 md:h-14 md:w-14" />
            <span className="ml-2 text-xl font-bold hidden sm:block">AgriGuard</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Language Switcher - Icon Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="p-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <FaGlobe className="h-5 w-5" />
            </motion.button>
            
            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-40 backdrop-blur-sm rounded-md shadow-lg py-1 z-10 border bg-primary/90"
              >
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full text-left px-4 py-2 ${language === 'en' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`w-full text-left px-4 py-2 ${language === 'hi' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => changeLanguage('ta')}
                  className={`w-full text-left px-4 py-2 ${language === 'ta' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
                >
                  தமிழ்
                </button>
              </motion.div>
            )}
          </div>

          {/* Main Menu Items */}
          <div className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                key={item.name}
              >
                <Link
                  to={item.path}
                  className="text-lg hover:text-green-300 transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Links */}
          <div className="flex items-center space-x-4 ml-4">
            {isAuthenticated ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <CartIcon />
                </motion.div>
                
                <div className="relative" ref={profileDropdownRef}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-2"
                  >
                    <ProfileCircle name={user?.name} />
                    <span className="text-white text-sm font-medium">
                      {user?.name || 'User'}
                    </span>
                  </motion.button>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-md shadow-lg py-2 z-10 border border-green-100/50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user?.email || ''}</p>
                      </div>
                      <Link
                        to="/orders"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 text-sm flex items-center transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <FaShoppingCart className="h-4 w-4 mr-2 text-green-600" />
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 text-sm flex items-center transition-colors"
                      >
                        <FaSignOutAlt className="h-4 w-4 mr-2 text-green-600" />
                        {t('header.logout')}
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/auth/signin"
                    className="px-4 py-2 text-white font-medium hover:bg-green-700/50 rounded-lg"
                  >
                    {t('header.signIn')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/auth/signup"
                    className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {t('header.signUp')}
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Language Switcher Icon - Mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="text-white focus:outline-none"
          >
            <FaGlobe className="h-6 w-6" />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Language Dropdown - Mobile */}
      {showLanguageDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-primary/90 backdrop-blur-sm py-2 px-4"
        >
          <button
            onClick={() => changeLanguage('en')}
            className={`w-full text-left px-4 py-2 ${language === 'en' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className={`w-full text-left px-4 py-2 ${language === 'hi' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
          >
            हिंदी
          </button>
          <button
            onClick={() => changeLanguage('ta')}
            className={`w-full text-left px-4 py-2 ${language === 'ta' ? 'bg-green-600/50' : 'hover:bg-green-600/50'} transition-colors`}
          >
            தமிழ்
          </button>
        </motion.div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-primary/90 backdrop-blur-sm py-4"
          >
            <div className="container mx-auto px-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block text-lg text-white hover:text-green-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="block text-lg text-white hover:text-green-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('header.cart')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-lg text-white hover:text-green-300 transition-colors"
                  >
                    {t('header.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/signin"
                    className="block text-lg text-white hover:text-green-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('header.signIn')}
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block text-lg text-white hover:text-green-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('header.signUp')}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;