/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('signup') ? 'signup' : 'signin'
  );

  // Redirect to marketplace if already logged in
  if (user) {
    return <Navigate to="/marketplace" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-12 px-4 sm:px-0">
        <div className="flex justify-center space-x-4 mb-8">
          <TabButton
            active={activeTab === 'signin'}
            onClick={() => setActiveTab('signin')}
            to="/auth/signin"
          >
            Sign In
          </TabButton>
          <TabButton
            active={activeTab === 'signup'}
            onClick={() => setActiveTab('signup')}
            to="/auth/signup"
          >
            Sign Up
          </TabButton>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Routes>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route index element={<Navigate to="signin" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, children, ...props }) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors duration-200 ${
        active
          ? 'bg-white text-green-600 border-t-2 border-l-2 border-r-2 border-green-600'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}