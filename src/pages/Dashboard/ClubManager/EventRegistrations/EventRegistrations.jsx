import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaArrowLeft, FaUsers, FaCalendarAlt, FaListUl } from 'react-icons/fa';
import { MdOutlineAssignmentInd } from 'react-icons/md';

const EventRegistrations = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const { data: registrations = [], isLoading: isRegLoading } = useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: async () => {
      const url = eventId
        ? `/event-registrations/${eventId}`
        : `/event-registrations`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  const { data: eventDetails = {}, isLoading: isEventLoading } = useQuery({
    queryKey: ['event-details', eventId],
    enabled: !!eventId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/event/${eventId}`);
      return res.data;
    },
  });

  if (isRegLoading || (eventId && isEventLoading))
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );

  return (
    <div
      className={`p-4 md:p-8 bg-slate-50 min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className={`btn btn-ghost gap-2 text-slate-500 hover:bg-slate-200 rounded-xl ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <FaArrowLeft className={isRTL ? 'rotate-180' : ''} />{' '}
          {t('btn_back', 'Back')}
        </button>
        <div className={isRTL ? 'text-right' : 'text-right'}>
          <h1
            className={`text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight ${
              isRTL ? 'justify-start flex-row-reverse' : 'justify-end'
            }`}
          >
            <MdOutlineAssignmentInd className="text-[#0b99ce]" />
            {eventId
              ? t('event_attendee_list', 'Event Attendee List')
              : t('all_registrations', 'All Registrations')}
          </h1>
          <p className="text-slate-500 font-medium italic">
            {eventId
              ? `${t('event_label', 'Event')}: ${eventDetails?.title}`
              : t(
                  'platform_overview',
                  'Platform-wide event registration overview',
                )}
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          className={`bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 ${
            isRTL ? 'flex-row-reverse' : ''
          }`}
        >
          <div className="p-4 bg-blue-50 text-[#0b99ce] rounded-2xl shadow-inner">
            <FaUsers className="text-2xl" />
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {t('total_registrations', 'Total Registrations')}
            </p>
            <h4 className="text-3xl font-black text-slate-800">
              {registrations.length}
            </h4>
          </div>
        </div>
      </div>

      {/* Attendee Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className={`table w-full ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr
                className={`text-slate-500 uppercase text-[11px] tracking-widest font-black ${
                  isRTL ? 'text-right' : ''
                }`}
              >
                <th className={`py-6 px-8 ${isRTL ? 'text-right' : ''}`}>
                  {t('table_member_email', 'Member Email')}
                </th>
                {!eventId && (
                  <th className={isRTL ? 'text-right' : ''}>
                    {t('table_event_id', 'Event ID')}
                  </th>
                )}
                <th className={isRTL ? 'text-right' : ''}>
                  {t('table_reg_date', 'Registration Date')}
                </th>
                <th className={isRTL ? 'text-right' : ''}>
                  {t('table_status', 'Status')}
                </th>
                <th className={isRTL ? 'text-right' : ''}>
                  {t('table_tx_id', 'Transaction ID')}
                </th>
                <th className={`text-right px-8 ${isRTL ? 'text-left' : ''}`}>
                  {t('table_action', 'Action')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {registrations.map((reg, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-all">
                  <td className="py-5 px-8">
                    <div
                      className={`flex items-center gap-3 ${
                        isRTL ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0b99ce] to-blue-600 rounded-full flex justify-center items-center text-white font-black shadow-md uppercase">
                        {reg.userEmail ? reg.userEmail[0] : 'U'}
                      </div>
                      <p className="font-bold text-slate-700">
                        {reg.userEmail}
                      </p>
                    </div>
                  </td>
                  {!eventId && (
                    <td className="text-xs font-mono text-slate-400">
                      {reg.eventId}
                    </td>
                  )}
                  <td className="text-slate-500 font-bold text-sm">
                    {reg.registeredAt
                      ? new Date(reg.registeredAt).toLocaleDateString(
                          i18n.language === 'ar' ? 'ar-EG' : 'en-GB',
                        )
                      : 'N/A'}
                  </td>
                  <td>
                    <span className="badge bg-emerald-100 border-emerald-200 text-emerald-700 font-black px-4 py-3 rounded-lg uppercase text-[9px]">
                      {reg.status || t('status_success', 'Success')}
                    </span>
                  </td>
                  <td className="font-mono text-xs text-slate-400">
                    {reg.paymentId ? (
                      <span className="font-bold text-slate-600">
                        {reg.paymentId}
                      </span>
                    ) : (
                      <span className="italic">{t('status_free', 'FREE')}</span>
                    )}
                  </td>
                  <td className={`px-8 ${isRTL ? 'text-left' : 'text-right'}`}>
                    <Link
                      to={`/dashboard/manager/event-registrations/${reg.eventId}`}
                      className="btn btn-sm btn-square bg-emerald-50 text-emerald-500 border-none hover:bg-emerald-500 hover:text-white"
                      title={t('view_registrations', 'View Registrations')}
                    >
                      <FaUsers />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {registrations.length === 0 && (
            <div className="flex flex-col items-center py-24 space-y-4">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">
                {t('no_registrations', 'No registrations found.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegistrations;
