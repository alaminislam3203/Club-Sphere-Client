import React from 'react';
import useRole from '../../../hooks/useRole';
import Admin from '../Admin/Admin';
import ClubManager from '../ClubManager/ClubManager';
import MemberOverview from '../Member/MemberOverview/MemberOverview';
import Loading from '../../Loading';

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === 'admin') {
    return <Admin />;
  } else if (role === 'clubManager') {
    return <ClubManager />;
  } else {
    return <MemberOverview />;
  }
};

export default DashboardHome;
