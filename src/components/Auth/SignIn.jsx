import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import { Leaf, Scan } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { handleGoogleSuccess, loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      // Redirect to intended page or marketplace
      const from = location.state?.from?.pathname || '/marketplace';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Scan className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-800 font-display">
            Welcome to <span className="text-green-600">AgriGuard</span>
          </h2>
        </div>

        <div className="mt-8 bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-green-100/50">
          <div className="py-8 px-6 sm:px-10">
            <div className="mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Google login failed')}
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="pill"
                width="300"
              />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-5">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow-md"
              >
                <Leaf className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            New to AgriGuard?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Create an account
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}