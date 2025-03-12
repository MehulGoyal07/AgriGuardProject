import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import scrollbarHide from 'tailwind-scrollbar-hide';
import animate from 'tailwindcss-animate';

export default{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for your theme
        'text-color': 'rgba(255, 255, 255, 0.75)',
        'body-color': 'rgb(255, 255, 255)',
        'trans-color': 'rgba(255, 255, 255, 0.05)',
        'primary': '#1b2316', // Dark green for primary elements
        'secondary': '#222c1d', // Slightly lighter green for secondary elements
        'accent': '#FFA500', // Orange for accents
        'highlight': '#FF7F50', // Coral for highlights
        'muted': '#F0F0F0', // Light gray for backgrounds
        'accent-dark': '#FF8C00', // Darker orange for hover states
        'secondary-light': '#2C2C2C', // Lighter dark shade for subtle elements
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Modern sans-serif font
        heading: ['"Poppins"', 'sans-serif'], // Bold font for headings
        sporty: ['"Bebas Neue"', 'sans-serif'], // Sporty font for call-to-action elements
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '1rem',
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out',
        slideUp: 'slideUp 1s ease-in-out',
        zoomIn: 'zoomIn 0.8s ease-in-out',
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { transform: 'translateY(50px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        zoomIn: {
          from: { transform: 'scale(0.9)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      backgroundImage: {
        'header-bg': 'linear-gradient(45deg, #000000, #FFA500)', // Gradient for header
        'slider-bg': "url('/src/assets/slider.jpg')", // Background for image slider
        'sports-pattern': "url('/src/assets/sports-pattern.png')", // Pattern for sports theme
        'gradient-radial': 'radial-gradient(circle, #1C1C1C, #000000)', // Radial gradient
        'gradient-accent': 'linear-gradient(45deg, #FFA500, #FF7F50)', // Accent gradient
        'home-background': "url('./assets/home-background.png')", // Existing background image
      },
      screens: {
        xs: '480px', // Extra small devices
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backdropBlur: {
        '15px': '15px', // Custom backdrop blur
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '20px',
        '3xl': '40px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxWidth: {
        '1440px': '1440px',
      },
      boxShadow: {
        'custom': '0 4px 8px rgba(0, 0, 0, 0.1)', // Custom shadow
      },
    },
  },
  plugins: [
    aspectRatio, // For responsive image ratios
    forms, // For styling forms
    scrollbarHide, // For hiding scrollbars
    animate, // For advanced animations
  ],
};