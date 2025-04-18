/* eslint-disable react/prop-types */
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
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
            {isAuthenticated() ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} className="relative">
                  <Link 
                    to="/cart" 
                    className="p-2 text-white hover:text-green-300"
                  >
                    <FaShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </motion.div>
                
                <div className="relative group">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2"
                  >
                    <ProfileCircle name={user?.name} />
                    <span className="text-white text-sm font-medium">
                      {user?.name.split(' ')[0]}
                    </span>
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-48 bg-green-700/90 backdrop-blur-sm rounded-md shadow-lg py-1 z-10 hidden group-hover:block border border-green-500/20">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-green-600/50 text-sm flex items-center"
                    >
                      <FaSignOutAlt className="h-4 w-4 mr-2" />
                      {t('header.logout')}
                    </button>
                  </div>
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
          className="md:hidden bg-primary/90 backdrop-blur-sm px-4 py-2 border-t border-green-600/20"
        >
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded ${language === 'en' ? 'bg-primary/90 text-white' : 'text-white/80 hover:text-white'}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={`px-3 py-1 rounded ${language === 'hi' ? 'bg-primary/90 text-white' : 'text-white/80 hover:text-white'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => changeLanguage('ta')}
              className={`px-3 py-1 rounded ${language === 'ta' ? 'bg-primary/90 text-white' : 'text-white/80 hover:text-white'}`}
            >
              தமிழ்
            </button>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full min-h-screen h-full bg-primary/90 backdrop-blur-sm text-white p-6 shadow-lg z-10 md:hidden"
            style={{ top: showLanguageDropdown ? '84px' : '72px' }}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-6 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
            </button>
            <nav className="flex flex-col space-y-6 mt-8 text-lg">
              {menuItems.map((item) => (
                <motion.div
                  whileHover={{ scale: 1.02, color: "#a3e635" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={item.name}
                >
                  <Link
                    to={item.path}
                    className="block py-2 hover:text-green-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-green-600/20 pt-4">
                {isAuthenticated() ? (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="py-2"
                    >
                      <Link
                        to="/cart"
                        className="flex items-center text-white hover:text-green-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaShoppingCart className="h-5 w-5 mr-2" />
                        {t('header.cart')}
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="py-2"
                    >
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-white hover:text-green-300 w-full"
                      >
                        <FaSignOutAlt className="h-5 w-5 mr-2" />
                        {t('header.logout')}
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="py-2"
                    >
                      <Link
                        to="/auth/signin"
                        className="block text-white hover:text-green-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('header.signIn')}
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="py-2"
                    >
                      <Link
                        to="/auth/signup"
                        className="block px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {t('header.signUp')}
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;