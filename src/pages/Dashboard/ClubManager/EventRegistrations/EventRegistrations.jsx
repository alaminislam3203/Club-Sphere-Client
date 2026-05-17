import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaArrowLeft, FaUsers, FaTicketAlt } from 'react-icons/fa';
import { MdOutlineAssignmentInd, MdOutlineFreeBreakfast } from 'react-icons/md';

const DEFAULT_AVATAR = 'https://i.ibb.co.com/wNsV12M3/user.png';

const EventRegistrations = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // ── Registrations ────────────────────────────────
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

  // ── Event Details ─────────────────────────────────
  const { data: eventDetails = {}, isLoading: isEventLoading } = useQuery({
    queryKey: ['event-details', eventId],
    enabled: !!eventId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/event/${eventId}`);
      return res.data;
    },
  });

  // ── All Users → photo map ─────────────────────────
  const { data: users = [] } = useQuery({
    queryKey: ['all-users-photo-map'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const userPhotoMap = useMemo(() => {
    const map = {};
    users.forEach(u => {
      if (u.email) map[u.email] = u.photoURL || DEFAULT_AVATAR;
    });
    return map;
  }, [users]);

  // ── Status Mutation ───────────────────────────────
  const statusMutation = useMutation({
    mutationFn: async ({ regId, newStatus }) => {
      const res = await axiosSecure.patch(
        `/event-registrations/${regId}/status`,
        { status: newStatus },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event-registrations'] });
      Swal.fire({
        title: t('alert_updated', 'Updated!'),
        text: t(
          'reg_status_success',
          'Registration status updated successfully.',
        ),
        icon: 'success',
        confirmButtonColor: '#0b99ce',
        customClass: { popup: 'rounded-[2rem]' },
      });
    },
    onError: () => {
      Swal.fire({
        title: t('alert_error', 'Error'),
        text: t('reg_status_error', 'Failed to update registration status.'),
        icon: 'error',
        confirmButtonColor: '#0b99ce',
        customClass: { popup: 'rounded-[2rem]' },
      });
    },
  });

  const handleStatusChange = (regId, userEmail, newStatus) => {
    const statusLabel = t(`opt_${newStatus}`, newStatus);

    Swal.fire({
      title: t('status_change_q', {
        status: statusLabel,
        defaultValue: `Change status to "${statusLabel}"?`,
      }),
      text: t('status_change_confirm', {
        name: userEmail,
        status: statusLabel,
        defaultValue: `Are you sure you want to mark "${userEmail}" as ${statusLabel}?`,
      }),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0b99ce',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: t('confirm_btn', 'Yes, update!'),
      customClass: { popup: 'rounded-[2rem]' },
    }).then(result => {
      if (result.isConfirmed) {
        statusMutation.mutate({ regId, newStatus });
      }
    });
  };

  if (isRegLoading || (eventId && isEventLoading))
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
        <p className="text-slate-400 animate-pulse font-black uppercase text-xs tracking-widest">
          {t('loading_data', 'Loading...')}
        </p>
      </div>
    );

  // ── Stats ─────────────────────────────────────────
  const paidCount = registrations.filter(r => r.paymentType === 'paid').length;
  const freeCount = registrations.filter(r => r.paymentType !== 'paid').length;

  const eventName =
    eventDetails?.eventTitle ||
    eventDetails?.title ||
    registrations[0]?.eventTitle ||
    '—';

  return (
    <div
      className={`p-4 md:p-8 bg-slate-50 min-h-screen font-sans ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-black uppercase text-xs tracking-widest transition-colors"
        >
          <FaArrowLeft className={isRTL ? 'rotate-180' : ''} />
          {t('btn_back', 'Back')}
        </button>

        <div className="text-right">
          <h1 className="text-3xl font-black text-slate-800 flex items-center justify-end gap-3 tracking-tight">
            <MdOutlineAssignmentInd className="text-[#0b99ce]" />
            {eventId
              ? t('event_attendee_list', 'Event Attendee List')
              : t('all_registrations', 'All Registrations')}
          </h1>
          {eventId && (
            <p className="text-slate-500 font-medium mt-1">
              <span className="text-[#0b99ce] font-black">{eventName}</span>
            </p>
          )}
        </div>
      </div>

      {/* ── Summary Cards ────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-blue-50 text-[#0b99ce] rounded-2xl shadow-inner">
            <FaUsers className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('total_registrations', 'Total Registrations')}
            </p>
            <h4 className="text-3xl font-black text-slate-800">
              {registrations.length}
            </h4>
          </div>
        </div>

        {/* Paid */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl shadow-inner">
            <FaTicketAlt className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('paid_registrations', 'Paid')}
            </p>
            <h4 className="text-3xl font-black text-slate-800">{paidCount}</h4>
          </div>
        </div>

        {/* Free */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl shadow-inner">
            <MdOutlineFreeBreakfast className="text-2xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('free_registrations', 'Free')}
            </p>
            <h4 className="text-3xl font-black text-slate-800">{freeCount}</h4>
          </div>
        </div>
      </div>

      {/* ── Attendee Table ───────────────────────────── */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">#</th>
                <th className="bg-transparent">
                  {t('table_member_email', 'Member Email')}
                </th>
                {!eventId && (
                  <th className="bg-transparent">
                    {t('table_event_title', 'Event')}
                  </th>
                )}
                <th className="bg-transparent">
                  {t('table_payment_type', 'Type')}
                </th>
                <th className="bg-transparent">
                  {t('table_tx_id', 'Transaction ID')}
                </th>
                <th className="bg-transparent">
                  {t('table_reg_date', 'Registered')}
                </th>
                <th className="bg-transparent text-right">
                  {t('table_action', 'Change Status')}
                </th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((reg, index) => {
                const txId = reg.paymentId || reg.transactionId || '—';
                const isPaid = reg.paymentType === 'paid';
                // ── photo from users collection ──
                const photoURL = userPhotoMap[reg.userEmail] || DEFAULT_AVATAR;

                return (
                  <tr
                    key={reg._id || index}
                    className="group transition-all duration-300"
                  >
                    {/* # */}
                    <td className="bg-slate-50 py-4 rounded-l-[1.5rem] border-y border-l border-slate-100 font-black text-slate-300 text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </td>

                    {/* Email + Photo */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="avatar ring-4 ring-white shadow-md rounded-xl overflow-hidden shrink-0">
                          <div className="w-10 h-10">
                            <img
                              src={photoURL}
                              alt={reg.userEmail}
                              className="object-cover w-full h-full"
                              onError={e => {
                                e.currentTarget.src = DEFAULT_AVATAR;
                              }}
                            />
                          </div>
                        </div>
                        <p className="font-bold text-slate-700 text-sm">
                          {reg.userEmail}
                        </p>
                      </div>
                    </td>

                    {/* Event Title (only when no eventId param) */}
                    {!eventId && (
                      <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                        <p className="font-bold text-slate-600 text-sm truncate max-w-[160px]">
                          {reg.eventTitle || '—'}
                        </p>
                      </td>
                    )}

                    {/* Payment Type Badge */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                          isPaid
                            ? 'bg-white text-emerald-600 border-emerald-100'
                            : 'bg-white text-purple-600 border-purple-100'
                        }`}
                      >
                        {isPaid
                          ? t('type_paid', 'Paid')
                          : t('type_free', 'Free')}
                      </span>
                    </td>

                    {/* Transaction ID */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <span className="font-mono text-[10px] text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">
                        {txId !== '—' ? `...${String(txId).slice(-12)}` : '—'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <p className="text-xs font-bold text-slate-500">
                        {reg.registeredAt
                          ? new Date(reg.registeredAt).toLocaleDateString(
                              i18n.language === 'ar' ? 'ar-EG' : 'en-GB',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              },
                            )
                          : 'N/A'}
                      </p>
                    </td>

                    {/* Change Status Select */}
                    <td className="bg-slate-50 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors text-right pr-4">
                      <div className="flex justify-end">
                        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm focus-within:border-[#0b99ce] transition-all">
                          <select
                            className="bg-transparent font-black uppercase text-[10px] tracking-widest text-slate-600 outline-none cursor-pointer"
                            value={reg.status || 'registered'}
                            onChange={e =>
                              handleStatusChange(
                                reg._id,
                                reg.userEmail,
                                e.target.value,
                              )
                            }
                            disabled={statusMutation.isPending}
                          >
                            <option value="registered">
                              {t('opt_registered', 'Registered')}
                            </option>
                            <option value="approved">
                              {t('opt_approved', 'Approved')}
                            </option>
                            <option value="rejected">
                              {t('opt_rejected', 'Rejected')}
                            </option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Empty State */}
          {registrations.length === 0 && (
            <div className="flex flex-col items-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 m-6 mt-0 space-y-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-200 shadow-sm">
                <FaUsers size={36} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
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
