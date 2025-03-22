import AOS from "aos"; // AOS for scroll-based animations
import "aos/dist/aos.css"; // AOS styles
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion for animations
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Update the path to your logo

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle
  const { t, i18n } = useTranslation(); // Initialize useTranslation and i18n
  const [language, setLanguage] = useState(i18n.language); // State for selected language

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and only once
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle mobile menu

  // Menu items with translation keys
  const menuItems = [
    { key: "home", link: "#home" },
    { key: "features", link: "#features" },
    { key: "diagnosis", link: "#diagnosis" },
    { key: "marketplace", link: "/marketplace" }, // Added Marketplace link
    { key: "contactUs", link: "#contactus" },
  ];

  // Change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change language
    setLanguage(lng); // Update selected language state
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full bg-primary/90 backdrop-blur-sm text-white p-4 md:p-6 shadow-lg z-50 transition-all duration-300 ease-in-out"
        data-aos="fade-down"
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center"
          >
            <Link to="/" className="hover:opacity-90 transition duration-300">
              <img src={Logo} alt="AgriGuard Logo" className="h-14 w-14 md:h-16 md:w-16" />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8 text-lg font-sans">
            {menuItems.map((item, index) => (
              <motion.div
                whileHover={{ y: -5, color: "#FF7F50" }}
                transition={{ type: "spring", stiffness: 300 }}
                key={index}
              >
                <Link
                  to={item.link}
                  className="hover:text-accent transition duration-300"
                >
                  {t(`header.${item.key}`)}
                </Link>
              </motion.div>
            ))}

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 appearance-none cursor-pointer pr-10"
              >
                <option value="en" className="bg-primary/90 text-white">
                  English
                </option>
                <option value="hi" className="bg-primary/90 text-white">
                  हिंदी
                </option>
                <option value="ta" className="bg-primary/90 text-white">
                  தமிழ்
                </option>
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </nav>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleMenu} className="focus:outline-none">
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
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.5 }}
              className="fixed top-0 left-0 w-64 min-h-screen h-full bg-primary/95 backdrop-blur-sm text-white p-6 shadow-lg z-10 md:hidden"
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
              <nav className="flex flex-col space-y-6 mt-12 text-lg font-sans">
                {menuItems.map((item, index) => (
                  <motion.div
                    whileHover={{ scale: 1.1, color: "#FF7F50" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    key={index}
                  >
                    <Link
                      to={item.link}
                      className="hover:text-accent transition duration-300"
                      onClick={toggleMenu} // Close menu on click
                    >
                      {t(`header.${item.key}`)}
                    </Link>
                  </motion.div>
                ))}

                {/* Language Switcher for Mobile */}
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 appearance-none cursor-pointer pr-10"
                  >
                    <option value="en" className="bg-primary/90 text-white">
                      English
                    </option>
                    <option value="hi" className="bg-primary/90 text-white">
                      हिंदी
                    </option>
                    <option value="ta" className="bg-primary/90 text-white">
                      தமிழ்
                    </option>
                  </select>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;