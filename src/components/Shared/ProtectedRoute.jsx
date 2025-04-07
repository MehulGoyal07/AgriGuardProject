import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoute;
