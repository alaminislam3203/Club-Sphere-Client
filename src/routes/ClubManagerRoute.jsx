import React from 'react';
import Forbidden from '../components/Forbidden/Forbidden';
import Loading from '../pages/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const ClubManagerRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    // Allow roles: manager OR admin
    if (role !== 'clubManager' ) {
        return <Forbidden />;
    }

    return children;
};

export default ClubManagerRoute;
