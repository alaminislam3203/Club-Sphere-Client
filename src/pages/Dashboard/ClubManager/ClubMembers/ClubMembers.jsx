import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import {
  FaUsers,
  FaUserClock,
  FaEnvelope,
  FaCalendarAlt,
  FaFilter,
  FaCheckCircle,
} from 'react-icons/fa';

const DEFAULT_AVATAR = 'https://i.ibb.co.com/wNsV12M3/user.png';

const ClubMembers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [selectedClub, setSelectedClub] = useState('all');

  // ── Manager's Clubs ───────────────────────────────
  const { data: myClubs = [] } = useQuery({
    queryKey: ['manager-clubs', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  // ── Members ───────────────────────────────────────
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['club-members', user?.email, selectedClub],
    enabled: !!user?.email,
    queryFn: async () => {
      const url =
        selectedClub === 'all'
          ? `/manager/club-members?managerEmail=${user?.email}`
          : `/manager/club-members?managerEmail=${user?.email}&clubId=${selectedClub}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  // ── All Users → photo map ─────────────────────────
  // ✅ users collection থেকে photoURL নেওয়া হচ্ছে
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
    mutationFn: async ({ memberId, newStatus }) => {
      const res = await axiosSecure.patch(
        `/club-memberships/${memberId}/status`,
        { status: newStatus },
      );
      return res.data;
    },
    onSuccess: () => {
      // ✅ TanStack Query v4/v5 compatible invalidation
      queryClient.invalidateQueries({ queryKey: ['club-members'] });
      queryClient.invalidateQueries({ queryKey: ['clubs'] });
      Swal.fire({
        title: t('alert_updated', 'Updated!'),
        text: t('member_status_success', 'Member status updated successfully.'),
        icon: 'success',
        confirmButtonColor: '#0b99ce',
        customClass: { popup: 'rounded-[2rem]' },
      });
    },
    onError: () => {
      Swal.fire({
        title: t('alert_error', 'Error'),
        text: t('member_status_error', 'Failed to update member status.'),
        icon: 'error',
        confirmButtonColor: '#0b99ce',
        customClass: { popup: 'rounded-[2rem]' },
      });
    },
  });

  const handleStatusChange = (memberId, memberName, newStatus) => {
    // status label গুলো বাংলা/আরবি/ইংরেজিতে translate করা
    const statusLabel = t(`opt_${newStatus}`, newStatus);

    Swal.fire({
      title: t('status_change_q', {
        status: statusLabel,
        defaultValue: `Change status to "${statusLabel}"?`,
      }),
      text: t('status_change_confirm', {
        name: memberName,
        status: statusLabel,
        defaultValue: `Are you sure you want to mark "${memberName}" as ${statusLabel}?`,
      }),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0b99ce',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: t('confirm_btn', 'Yes, update!'),
      customClass: { popup: 'rounded-[2rem]' },
    }).then(result => {
      if (result.isConfirmed) {
        statusMutation.mutate({ memberId, newStatus });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
        <p className="text-slate-400 animate-pulse font-black uppercase text-xs tracking-widest">
          {t('loading_members', 'Loading members...')}
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* ── HEADER ─────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <FaUsers className="text-[#0b99ce]" />
            {t('club_members_title', 'Club Members')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'club_members_subtitle',
              'Manage and track memberships across your clubs.',
            )}
          </p>
        </div>

        {/* ✅ Club Filter — myClubs থেকে option render হচ্ছে */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-[1.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 group focus-within:ring-2 ring-blue-100 transition-all">
          <FaFilter className="text-slate-300 group-hover:text-[#0b99ce] transition-colors" />
          <select
            className="bg-transparent font-black uppercase text-[10px] tracking-widest text-slate-500 outline-none cursor-pointer"
            value={selectedClub}
            onChange={e => setSelectedClub(e.target.value)}
          >
            <option value="all">{t('all_clubs_option', 'All My Clubs')}</option>
            {myClubs.map(club => (
              <option key={club._id} value={club._id}>
                {club.clubName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── MEMBERS TABLE ───────────────────────────── */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">
                  {t('table_member_info', 'Member Info')}
                </th>
                <th className="bg-transparent">
                  {t('table_club_name', 'Club')}
                </th>
                <th className="bg-transparent text-center">
                  {t('table_status', 'Status')}
                </th>
                <th className="bg-transparent">
                  {t('table_joined', 'Joined')}
                </th>
                <th className="bg-transparent text-right">
                  {t('table_action', 'Change Status')}
                </th>
              </tr>
            </thead>

            <tbody>
              {members.map(member => {
                // ✅ users collection থেকে photo তোলা
                const photoURL =
                  userPhotoMap[member.userEmail] || DEFAULT_AVATAR;

                return (
                  <tr
                    key={member._id}
                    className="group transition-all duration-300"
                  >
                    {/* Member Info */}
                    <td className="bg-slate-50 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="avatar ring-4 ring-white shadow-md rounded-xl overflow-hidden shrink-0">
                          <div className="w-12 h-12">
                            <img
                              src={photoURL}
                              alt={member.userName || 'Member'}
                              className="object-cover w-full h-full"
                              onError={e => {
                                e.currentTarget.src = DEFAULT_AVATAR;
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-black text-slate-800 tracking-tight leading-tight mb-1">
                            {member.userName || '—'}
                          </p>
                          <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-bold uppercase tracking-tighter">
                            <FaEnvelope className="text-[#0b99ce] text-[9px]" />
                            {member.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Club Name */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <span className="font-bold text-slate-500 text-xs px-3 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                        {member.clubName}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors text-center">
                      <span
                        className={`inline-flex items-center gap-2 font-black px-4 py-2 text-[9px] uppercase tracking-widest rounded-xl shadow-sm border ${
                          member.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : member.status === 'pending'
                              ? 'bg-amber-50 text-amber-600 border-amber-100'
                              : 'bg-rose-50 text-rose-600 border-rose-100'
                        }`}
                      >
                        {member.status === 'active' && <FaCheckCircle />}
                        {member.status === 'pending' && <FaUserClock />}
                        {t(`status_${member.status}`, member.status)}
                      </span>
                    </td>

                    {/* Joined Date */}
                    <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                        <FaCalendarAlt className="text-[#fe3885]" />
                        {member.joinedAt
                          ? new Date(member.joinedAt).toLocaleDateString(
                              'en-GB',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              },
                            )
                          : 'N/A'}
                      </div>
                    </td>

                    {/* ✅ Status Change Select */}
                    <td className="bg-slate-50 py-5 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors text-right">
                      <div className="flex justify-end pr-2">
                        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm focus-within:border-[#0b99ce] transition-all">
                          <select
                            className="bg-transparent font-black uppercase text-[10px] tracking-widest text-slate-600 outline-none cursor-pointer"
                            value={member.status}
                            onChange={e =>
                              handleStatusChange(
                                member._id,
                                member.userName || member.userEmail,
                                e.target.value,
                              )
                            }
                            disabled={statusMutation.isPending}
                          >
                            <option value="pending">
                              {t('opt_pending', 'Pending')}
                            </option>
                            <option value="active">
                              {t('opt_approve', 'Approve')}
                            </option>
                            <option value="rejected">
                              {t('opt_reject', 'Reject')}
                            </option>
                            <option value="expired">
                              {t('opt_expire', 'Expire')}
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
          {members.length === 0 && (
            <div className="flex flex-col items-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 m-6 mt-0">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-slate-200 shadow-sm">
                <FaUsers size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                {t(
                  'no_members_match',
                  'No members found matching your criteria.',
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubMembers;
