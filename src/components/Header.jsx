import AOS from "aos"; // AOS for scroll-based animations
import "aos/dist/aos.css"; // AOS styles
import { AnimatePresence, motion } from "framer-motion"; // Framer Motion for animations
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Update the path to your logo

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with a duration and only once
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen); // Toggle mobile menu

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
            {["Home", "Features", "Diagnosis", "Our Team", "Contact Us"].map(
              (item, index) => (
                <motion.div
                  whileHover={{ y: -5, color: "#FF7F50" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={index}
                >
                  <Link
                    to={`#${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-accent transition duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              )
            )}
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
                {["Home", "Features", "Diagnosis", "Our Team", "Contact Us"].map(
                  (item, index) => (
                    <motion.div
                      whileHover={{ scale: 1.1, color: "#FF7F50" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      key={index}
                    >
                      <Link
                        to={`#${item.toLowerCase().replace(" ", "")}`}
                        className="hover:text-accent transition duration-300"
                        onClick={toggleMenu} // Close menu on click
                      >
                        {item}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;