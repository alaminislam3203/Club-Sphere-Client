import React from 'react';
import Forbidden from '../components/Forbidden/Forbidden';
import Loading from '../pages/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const MemberRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading />;
    }

    if (role !== 'member') {
        return <Forbidden />;
    }

    return children;
};

export default MemberRoute;
