import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Function to add the Google Tag script dynamically
const addGoogleTag = () => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-CJDDMN4Y92';
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CJDDMN4Y92');
  `;
  document.head.appendChild(script2);
};

// Root component to initialize the Google Tag
const RootApp = () => {
  useEffect(() => {
    addGoogleTag();  // Add the Google Tag when the component mounts
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootApp />);
