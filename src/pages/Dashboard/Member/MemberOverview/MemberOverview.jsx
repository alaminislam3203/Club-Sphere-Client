import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  FaLayerGroup,
  FaCalendarCheck,
  FaClock,
  FaArrowRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';

const MemberOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['member-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          {t('member_welcome_prefix', 'Hello')}, {user?.displayName}!
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          {t(
            'member_welcome_subtitle',
            "Here's what's happening with your clubs and events.",
          )}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 flex items-center gap-6 border border-slate-50 group hover:scale-[1.02] transition-transform duration-300">
          <div className="p-5 bg-blue-50 text-[#0b99ce] rounded-3xl text-3xl shadow-inner group-hover:bg-[#0b99ce] group-hover:text-white transition-colors">
            <FaLayerGroup />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {t('stats_clubs_joined', 'Clubs Joined')}
            </p>
            <h4 className="text-4xl font-black text-slate-800 mt-1">
              {stats.totalClubs || 0}
            </h4>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-rose-900/5 flex items-center gap-6 border border-slate-50 group hover:scale-[1.02] transition-transform duration-300">
          <div className="p-5 bg-rose-50 text-rose-500 rounded-3xl text-3xl shadow-inner group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <FaCalendarCheck />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {t('stats_events_reg', 'Events Registered')}
            </p>
            <h4 className="text-4xl font-black text-slate-800 mt-1">
              {stats.totalEvents || 0}
            </h4>
          </div>
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-2">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <FaClock className="text-[#0b99ce]" />{' '}
            {t('member_schedule_title', 'Your Upcoming Schedule')}
          </h3>
          <Link
            to="/dashboard/member/my-events"
            className="text-[#0b99ce] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-tighter"
          >
            {t('view_all', 'View All')} <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-4">
          {stats.upcomingEvents?.length > 0 ? (
            stats.upcomingEvents.map(event => (
              <div
                key={event._id}
                className="flex flex-col md:flex-row justify-between items-center p-6 bg-slate-50 rounded-3xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100 group"
              >
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm font-black text-[#0b99ce] border border-slate-100">
                    <span className="text-xl leading-none">
                      {new Date(event.eventDate).getDate()}
                    </span>
                    <span className="text-[10px] uppercase mt-1">
                      {new Date(event.eventDate).toLocaleString('default', {
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-black text-slate-800 group-hover:text-[#0b99ce] transition-colors text-lg tracking-tight">
                      {event.title}
                    </h5>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0b99ce]"></span>
                      {event.location}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/events/${event._id}`}
                  className="mt-4 md:mt-0 w-full md:w-auto btn btn-sm h-12 px-6 bg-white border-slate-200 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#0b99ce] hover:text-white hover:border-[#0b99ce] shadow-sm transition-all"
                >
                  {t('view_details', 'View Details')}
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm text-3xl">
                <FaCalendarCheck />
              </div>
              <p className="text-slate-400 font-bold italic">
                {t('no_upcoming_events', 'No upcoming events scheduled yet.')}
              </p>
              <Link
                to="/events"
                className="btn btn-link text-[#0b99ce] font-black uppercase text-xs tracking-widest no-underline hover:underline"
              >
                {t('browse_events_btn', 'Browse Events')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
