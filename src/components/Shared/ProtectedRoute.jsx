/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader'; // Create a simple loading spinner component

const ProtectedRoute = ({ roles = [], children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />; // Show loader while checking auth state
  }

  // 1. Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // 2. Check if route requires specific roles
  if (roles.length > 0 && !roles.some(role => user?.roles?.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. If all checks pass, render the child routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;