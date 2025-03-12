// ScrollToTop.js

import { useEffect } from 'react'; // Hook to handle side effects
import { useLocation } from 'react-router-dom'; // Hook to access the current route

const ScrollToTop = () => {
  const { pathname } = useLocation();  // This gets the current URL path (route)

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top-left corner of the window (x: 0, y: 0)
  }, [pathname]);  // This effect runs whenever the "pathname" (current route) changes

  return null;  // This component doesn't render anything to the DOM
};

export default ScrollToTop;
