import React from 'react';
import Forbidden from '../components/Forbidden/Forbidden';
import Loading from '../pages/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== 'admin') {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminRoute;
