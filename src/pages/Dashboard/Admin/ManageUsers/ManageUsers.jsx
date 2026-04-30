import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import {
  FaUserShield,
  FaUsers,
  FaUserTie,
  FaUserEdit,
  FaFilter,
  FaSearch,
  FaEnvelope,
  FaCalendarAlt,
} from 'react-icons/fa';
import { MdOutlineManageAccounts } from 'react-icons/md';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [filterRole, setFilterRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const handleChangeRole = (userId, role) => {
    const updateInfo = { role };

    axiosSecure
      .patch(`/users/${userId}/role`, updateInfo)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: t('alert_role_updated_title', 'Role Updated'),
            text: t('alert_role_updated_msg', { role: role }),
            showConfirmButton: false,
            timer: 1500,
            customClass: { popup: 'rounded-[2rem]' },
          });
          queryClient.invalidateQueries(['users']);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: t('alert_failed', 'Update Failed'),
          text: t('alert_role_failed_msg', 'Could not change the user role.'),
        });
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
      </div>
    );

  if (isError)
    return (
      <div className="alert alert-error shadow-lg max-w-md mx-auto mt-10 rounded-2xl text-white font-bold">
        <span>
          {t(
            'error_loading_users',
            'Error loading users. Please try again later.',
          )}
        </span>
      </div>
    );

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = role => {
    switch (role) {
      case 'admin':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'clubManager':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      default:
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  };

  return (
    <div className="p-2 md:p-6 bg-slate-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <MdOutlineManageAccounts className="text-[#0b99ce]" />
            {t('manage_users_title', 'Manage Users')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'manage_users_subtitle',
              'Manage permissions and roles for all community members.',
            )}
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-50 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#0b99ce] rounded-2xl">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('total_users', 'Total Users')}
            </p>
            <p className="text-2xl font-black text-slate-800">{users.length}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-50 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder={t('search_placeholder', 'Search by name or email...')}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all font-bold text-slate-700 outline-none"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100 w-full">
            <FaFilter className="text-slate-300" />
            <select
              className="bg-transparent font-black uppercase text-[10px] tracking-widest text-slate-500 outline-none w-full"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
            >
              <option value="all">{t('role_all', 'All Roles')}</option>
              <option value="admin">{t('role_admin', 'Admins')}</option>
              <option value="clubManager">
                {t('role_manager', 'Club Managers')}
              </option>
              <option value="member">{t('role_member', 'Members')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">
                  {t('table_user_info', 'User Info')}
                </th>
                <th className="bg-transparent">
                  {t('table_contact', 'Contact')}
                </th>
                <th className="bg-transparent text-center">
                  {t('table_role', 'Current Role')}
                </th>
                <th className="bg-transparent">
                  {t('table_joined', 'Joined Date')}
                </th>
                <th className="bg-transparent">
                  {t('table_action', 'Assign Role')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user._id}
                  className="group transition-all duration-300"
                >
                  <td className="bg-slate-50 py-4 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="avatar ring-4 ring-white shadow-md rounded-full overflow-hidden">
                        <div className="h-12 w-12">
                          <img
                            src={
                              user.photoURL ||
                              'https://i.ibb.co/mJR9nkv/user-placeholder.png'
                            }
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-slate-800 tracking-tight">
                          {user.name}
                        </div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                          ID: {user._id.slice(-8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                      <FaEnvelope className="text-[#0b99ce]" /> {user.email}
                    </div>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors text-center">
                    <span
                      className={`badge border-none font-black text-[9px] uppercase tracking-[0.15em] px-4 py-3 rounded-xl shadow-sm ${getRoleBadge(
                        user.role,
                      )}`}
                    >
                      {user.role === 'admin' && (
                        <FaUserShield className="mr-1.5" />
                      )}
                      {user.role === 'clubManager' && (
                        <FaUserTie className="mr-1.5" />
                      )}
                      {user.role === 'member' && <FaUsers className="mr-1.5" />}
                      {t(`role_${user.role}`, user.role)}
                    </span>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                      <FaCalendarAlt className="text-[#fe3885]" />
                      {new Date(
                        user.createdAt || Date.now(),
                      ).toLocaleDateString('en-GB')}
                    </div>
                  </td>
                  <td className="bg-slate-50 py-4 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center p-1.5 bg-white rounded-[1rem] border border-slate-200 shadow-sm focus-within:border-[#0b99ce] transition-all">
                      <FaUserEdit className="ml-2 text-emerald-500" />
                      <select
                        className="bg-transparent font-black uppercase text-[10px] tracking-widest text-emerald-700 outline-none px-2 py-1 w-full"
                        value={user.role}
                        onChange={e =>
                          handleChangeRole(user._id, e.target.value)
                        }
                      >
                        <option value="admin">Admin</option>
                        <option value="clubManager">Manager</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
              <FaUsers size={48} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
              {t('no_users_match', 'No users found matching your criteria.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
