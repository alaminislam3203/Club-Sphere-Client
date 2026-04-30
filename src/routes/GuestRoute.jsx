import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading';

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
