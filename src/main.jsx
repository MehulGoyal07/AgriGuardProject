import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';

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

const RootApp = () => {
  useEffect(() => {
    addGoogleTag();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootApp />);
