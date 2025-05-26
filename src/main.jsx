/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './index.css';

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
      <GoogleOAuthProvider 
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        onScriptLoadSuccess={() => console.log('Google OAuth script loaded successfully')}
        onScriptLoadError={() => console.error('Google OAuth script failed to load')}
      >
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootApp />);
