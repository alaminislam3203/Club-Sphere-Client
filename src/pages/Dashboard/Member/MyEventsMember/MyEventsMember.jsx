import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  FaCalendarAlt,
  FaLayerGroup,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';

const MyEventsMember = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const { data: myEvents = [], isLoading } = useQuery({
    queryKey: ['member-events', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/event-registrations?userEmail=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  const filteredEvents = myEvents.filter(
    event => event?.eventTitle && event.eventTitle.trim() !== '',
  );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
          <MdEventAvailable className="text-[#0b99ce]" />
          {t('my_events_title', 'My Events')}
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          {t('my_events_subtitle', 'Showing registrations for your account')}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black">
                <th>{t('table_col_event', 'Event Title')}</th>
                <th>{t('table_col_club', 'Club')}</th>
                <th>{t('table_col_reg_date', 'Registration Date')}</th>
                <th className="text-right">
                  {t('table_col_status', 'Status')}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEvents.map((event, index) => (
                <tr key={index} className="group transition-all duration-300">
                  {/* Event Title */}
                  <td className="bg-slate-50 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-blue-50/50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white text-[#0b99ce] rounded-xl shadow-sm group-hover:bg-[#0b99ce] group-hover:text-white transition-all">
                        <FaCalendarAlt className="text-lg" />
                      </div>
                      <span className="font-black text-slate-700">
                        {event.eventTitle}
                      </span>
                    </div>
                  </td>

                  {/* Club */}
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase">
                      <FaLayerGroup className="text-[#fe3885]" />
                      {event.clubName || t('joined_event', 'Joined Event')}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="bg-slate-50 border-y border-slate-100 text-xs font-bold text-slate-500">
                    {event.registeredAt
                      ? new Date(event.registeredAt).toLocaleDateString(
                          'en-GB',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          },
                        )
                      : t('tba', 'TBA')}
                  </td>

                  {/* Status */}
                  <td className="bg-slate-50 rounded-r-[1.5rem] border-y border-r border-slate-100 text-right">
                    <div className="flex items-center justify-end gap-2 text-emerald-600 font-black text-[10px] uppercase">
                      <FaCheckCircle className="text-emerald-500" />
                      <span className="bg-white px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
                        {event.status || t('status_registered', 'Registered')}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200 m-6 mt-0">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                <FaClock size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs text-center">
                {t('no_events_found', 'No events found')} <br />
                {t('no_events_subtitle', 'for your account.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEventsMember;
