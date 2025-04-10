import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navigate, Route, Routes } from 'react-router-dom'; // Added Navigate import
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
// import ProtectedRoute from './components/Shared/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';

const clientId = '445921415562-m37dlhlaes3pp4dd23qf2tre1esavt9v.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <Routes>

        <Route path="/" element={<Home />} />  
        
        <Route path="/marketplace" element={<MarketplacePage />} />  
          <Route path="/auth" element={<AuthPage />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/marketplace" element={<MarketplacePage />} />
          </Route> */}
          
          <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;