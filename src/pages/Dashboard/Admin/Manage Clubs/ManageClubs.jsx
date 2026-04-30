import React from 'react';
import useClubs from '../../../../hooks/useClubs';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const ManageClubs = () => {
  const { clubs = [], isLoading, isError, refetch } = useClubs();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const handleActionChange = async (clubId, clubName, action) => {
    let newStatus = '';
    if (action === 'approve') newStatus = 'approved';
    else if (action === 'reject') newStatus = 'rejected';
    else newStatus = 'pending';

    Swal.fire({
      title: t('club_update_title', 'Update Club Status?'),
      text: t('club_update_text', {
        clubName,
        status: newStatus,
        defaultValue: `Set "${clubName}" status to ${newStatus}?`,
      }),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0b99ce',
      cancelButtonColor: '#fb7185',
      confirmButtonText: t('confirm_update', 'Yes, Update!'),
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/clubs/${clubId}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            toast.success(
              t('club_update_success', {
                status: newStatus,
                defaultValue: `Club status updated to ${newStatus}.`,
              }),
            );
            refetch();
          }
        } catch (error) {
          console.error('Error updating club status:', error);
        }
      }
    });
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <MdOutlineDashboardCustomize className="text-[#0b99ce]" />
            {t('club_management', 'Club Management')}
          </h1>
        </div>

        <div className="stats shadow bg-white border border-slate-100 rounded-2xl">
          <div className="stat py-2 px-6">
            <div className="stat-title font-bold text-slate-400 text-xs uppercase tracking-widest">
              {t('total_clubs', 'Total Clubs')}
            </div>
            <div className="stat-value text-[#0b99ce] text-2xl">
              {clubs.length}
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[11px] tracking-[0.15em] font-black border-none">
                <th>{t('club_info', 'Club Information')}</th>
                <th>{t('manager_email', 'Manager Email')}</th>
                <th className="text-center">{t('status', 'Status')}</th>
                <th className="text-center">{t('financials', 'Financials')}</th>
                <th className="text-right">
                  {t('admin_action', 'Administrative Action')}
                </th>
              </tr>
            </thead>

            <tbody className="text-slate-600">
              {clubs.map(club => (
                <tr key={club._id} className="hover:bg-slate-50 group">
                  <td className="rounded-l-2xl border-y border-l border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-[#0b99ce] rounded-xl">
                        <FaShieldAlt />
                      </div>
                      <span className="font-extrabold text-slate-700">
                        {club.clubName}
                      </span>
                    </div>
                  </td>

                  <td className="border-y border-slate-50">
                    {club.managerEmail}
                  </td>

                  <td className="border-y border-slate-50 text-center">
                    <span
                      className={`badge border px-4 py-3 text-[10px] ${getStatusStyle(club.status)}`}
                    >
                      {club.status === 'approved' && <FaCheckCircle />}
                      {club.status === 'pending' && <FaClock />}
                      {club.status === 'rejected' && <FaTimesCircle />}
                      {t(`status_${club.status}`, club.status)}
                    </span>
                  </td>

                  <td className="border-y border-slate-50 text-center font-black">
                    ${club.membershipFee || 0}
                  </td>

                  <td className="rounded-r-2xl border-y border-r border-slate-50 text-right">
                    <select
                      className="select select-sm w-full bg-slate-50 text-xs font-bold"
                      value={
                        club.status === 'approved'
                          ? 'approve'
                          : club.status === 'rejected'
                            ? 'reject'
                            : 'pending'
                      }
                      onChange={e =>
                        handleActionChange(
                          club._id,
                          club.clubName,
                          e.target.value,
                        )
                      }
                    >
                      <option value="pending">
                        {t('set_pending', 'Set Pending')}
                      </option>
                      <option value="approve">
                        {t('approve_club', 'Approve Club')}
                      </option>
                      <option value="reject">
                        {t('reject_club', 'Reject Club')}
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClubs;
