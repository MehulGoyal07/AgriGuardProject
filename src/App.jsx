import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅ Google OAuth wrapper
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import MaintenanceMode from './components/MaintenanceMode';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AboutUs from './pages/AboutUs';
import AuthPage from './pages/AuthPage';
import ContactUs from './pages/ContactUs';
import DiseaseDetection from './pages/DiseaseDetection';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';

const clientId = '445921415562-m37dlhlaes3pp4dd23qf2tre1esavt9v.apps.googleusercontent.com'; 

function App() {
  const isMaintenanceMode = false;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
          <ScrollToTop />
          {isMaintenanceMode ? (
            <MaintenanceMode />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/detection" element={<DiseaseDetection />} />

              <Route path="/auth/*" element={<AuthPage />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              {/* Protected marketplace route */}
              <Route element={<ProtectedRoute />}>
                <Route path="/marketplace" element={<MarketplacePage />} />
              </Route>
            </Routes>
          )}
        
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
