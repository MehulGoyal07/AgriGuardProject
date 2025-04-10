import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { motion, useAnimation } from 'framer-motion';
import { Leaf, Scan } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SignIn() {
  const { user, handleGoogleSuccess, handleGoogleFailure, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (user) {
      navigate('/marketplace');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Scan className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-800 font-display">
            Welcome to <span className="text-green-600">AgriGuard</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w-xs">
            AI-powered crop protection at your fingertips
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-green-100/50"
        >
          <div className="py-8 px-6 sm:px-10">
            <motion.div variants={itemVariants} className="mb-6">
              <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                    theme="filled_blue"
                    size="large"
                    text="signin_with"
                    shape="pill"
                    width="300"
                  />
                </div>
              </GoogleOAuthProvider>
            </motion.div>

            <motion.div variants={itemVariants} className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-sm text-gray-500 font-medium">
                  Or sign in with email
                </span>
              </div>
            </motion.div>

            {/* Email + Password Form */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              ref={ref}
              onSubmit={handleEmailLogin}
              className="space-y-5"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200"
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white font-medium shadow-md transition-all duration-200"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Sign In
                </button>
              </motion.div>
            </motion.form>
          </div>

          <motion.div
            variants={itemVariants}
            className="px-6 py-4 bg-green-50/50 border-t border-green-100/50 text-center"
          >
            <p className="text-xs text-gray-500">
              By continuing, you agree to our <a href="#" className="font-medium text-green-600 hover:text-green-700">Terms</a> and <a href="#" className="font-medium text-green-600 hover:text-green-700">Privacy Policy</a>.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            New to AgriGuard?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-green-600 hover:text-green-500 underline underline-offset-2 transition-colors"
            >
              Create an account
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
