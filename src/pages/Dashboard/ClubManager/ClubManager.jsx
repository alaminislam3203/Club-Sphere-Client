import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  FaLayerGroup,
  FaUsers,
  FaCalendarAlt,
  FaDollarSign,
  FaChartLine,
} from 'react-icons/fa';
import { MdOutlineAnalytics } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ClubManager = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['manager-overview', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/club-manager-overview?managerEmail=${user?.email}`,
      );
      return res.data;
    },
  });

  const handleLaunchEvent = () => {
    navigate('/dashboard/manager/create-event');
  };

  const handleViewMembers = () => {
    navigate('/dashboard/manager/club-members');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-ring loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  const overviewCards = [
    {
      id: 1,
      title: t('stats_clubs_managed', 'Clubs Managed'),
      value: stats.totalClubs || 0,
      icon: <FaLayerGroup />,
      color: 'bg-blue-50 text-blue-600 shadow-blue-100',
    },
    {
      id: 2,
      title: t('stats_total_members', 'Total Members'),
      value: stats.totalMembers || 0,
      icon: <FaUsers />,
      color: 'bg-emerald-50 text-emerald-600 shadow-emerald-100',
    },
    {
      id: 3,
      title: t('stats_events_created', 'Events Created'),
      value: stats.totalEvents || 0,
      icon: <FaCalendarAlt />,
      color: 'bg-purple-50 text-purple-600 shadow-purple-100',
    },
    {
      id: 4,
      title: t('stats_total_revenue', 'Total Revenue'),
      value: `${isRTL ? '' : '$'}${(stats.totalRevenue || 0).toLocaleString()}${
        isRTL ? ' $' : ''
      }`,
      icon: <FaDollarSign />,
      color: 'bg-rose-50 text-rose-600 shadow-rose-100',
    },
  ];

  return (
    <div
      className={`p-4 md:p-8 bg-slate-50 min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* --- HEADER --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className={isRTL ? 'text-right' : 'text-left'}>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <MdOutlineAnalytics className="text-[#0b99ce]" />{' '}
            {t('manager_overview_title', 'Manager Overview')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'manager_overview_desc',
              'Overview of your managed clubs, community growth, and earnings.',
            )}
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          <FaChartLine className="text-[#0b99ce]" />{' '}
          {t('performance_live', 'Performance Live')}
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {overviewCards.map(card => (
          <div
            key={card.id}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-105 transition-all duration-300 group"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex justify-center items-center text-2xl mb-6 shadow-lg ${card.color}`}
            >
              {card.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
              {card.title}
            </p>
            <h3 className="text-3xl font-black text-slate-800 group-hover:text-[#0b99ce] transition-colors tracking-tighter">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* --- ANALYTICS WELCOME CARD --- */}
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-white shadow-2xl shadow-blue-900/20">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#0b99ce] opacity-20 rounded-full blur-[100px]"></div>
        <div
          className={`relative z-10 max-w-2xl ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            {t('manager_welcome_title', 'Manage your community like a pro!')}
          </h2>
          <p className="text-slate-400 font-medium mb-10 text-lg leading-relaxed">
            {t(
              'manager_welcome_desc',
              'Use the sidebar to create new events, verify memberships, or track financial reports for all your clubs in one centralized dashboard.',
            )}
          </p>
          <div
            className={`flex flex-wrap gap-4 ${
              isRTL ? 'justify-start flex-row-reverse' : ''
            }`}
          >
            {/* Launch Event Button */}
            <button
              onClick={handleLaunchEvent}
              className="px-10 py-5 bg-[#0b99ce] hover:bg-white hover:text-slate-900 transition-all duration-500 rounded-2xl font-black shadow-xl shadow-blue-500/20 active:scale-95 uppercase text-xs tracking-widest"
            >
              {t('launch_event_btn', 'Launch New Event')}
            </button>

            {/* View Members Button */}
            <button
              onClick={handleViewMembers}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-500 rounded-2xl font-black active:scale-95 uppercase text-xs tracking-widest"
            >
              {t('view_members_btn', 'View Members')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClubManager;
