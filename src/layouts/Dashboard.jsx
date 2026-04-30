import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaBuilding,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
  FaUserShield,
  FaUserTie,
} from 'react-icons/fa6';
import {
  FaUserFriends,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaHome,
  FaCog,
} from 'react-icons/fa';

import useRole from '../hooks/useRole';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const Dashboard = () => {
  const { role } = useRole();
  const { t } = useTranslation();

  const activeStyle = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
      isActive
        ? 'bg-[#0b99ce] text-white shadow-lg shadow-blue-200'
        : 'text-slate-500 hover:bg-blue-50 hover:text-[#0b99ce]'
    }`;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 1. Navbar: Sticky at the top */}
      <div className="sticky top-0 z-[100] w-full bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col min-h-0">
          {/* Mobile Header Box */}
          <div className="lg:hidden p-4 bg-white border-b flex justify-between items-center sticky top-[64px] z-50">
            <span className="font-black text-[#0b99ce] uppercase tracking-tighter ">
              Dashboard
            </span>
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle text-[#0b99ce]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>

          {/* Dynamic Page Content Area: Scrollable */}
          <main className="p-4 md:p-8 lg:p-10 flex-1 overflow-y-auto overflow-x-hidden">
            <div className="bg-[#f8fafc] min-h-[80vh] rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-8">
              <Outlet />
            </div>
          </main>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="drawer-side z-[110] ">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          {/* Sticky Sidebar wrapper for Desktop */}
          <div className="w-72 bg-white border-r border-slate-100 h-full lg:h-[calc(100vh-54px)] lg:sticky lg:top-[64px] overflow-y-auto custom-scrollbar p-6">
            <div className="mb-10 px-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                {t('sidebar_menu', 'Main Menu')}
              </p>
              <div className="h-1 w-10 bg-[#0b99ce] rounded-full"></div>
            </div>

            <nav className="space-y-2">
              <NavLink
                to={'/'}
                className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                <FaHome className="size-5" />
                <span>{t('nav_home', 'Home Page')}</span>
              </NavLink>

              <div className="py-4">
                <div className="border-t border-slate-100"></div>
              </div>

              {/* Admin Section */}
              {role === 'admin' && (
                <div className="space-y-2">
                  <NavLink to={'/dashboard/admin'} end className={activeStyle}>
                    <FaUserShield size={18} />{' '}
                    {t('admin_overview', 'Admin Overview')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/admin/manage-users'}
                    className={activeStyle}
                  >
                    <FaUsers size={18} /> {t('manage_users', 'Manage Users')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/admin/manage-clubs'}
                    className={activeStyle}
                  >
                    <FaBuilding size={18} /> {t('manage_clubs', 'Manage Clubs')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/admin/transactions'}
                    className={activeStyle}
                  >
                    <FaMoneyBillWave size={18} />{' '}
                    {t('transactions', 'Transactions')}
                  </NavLink>
                </div>
              )}

              {/* Manager Section */}
              {role === 'clubManager' && (
                <div className="space-y-2">
                  <NavLink
                    to={'/dashboard/manager'}
                    end
                    className={activeStyle}
                  >
                    <FaUserTie size={18} />{' '}
                    {t('manager_overview', 'Manager Overview')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/manager/my-clubs'}
                    className={activeStyle}
                  >
                    <FaUsers size={18} /> {t('my_clubs', 'My Clubs')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/manager/club-members'}
                    className={activeStyle}
                  >
                    <FaUserFriends size={18} />{' '}
                    {t('club_members', 'Club Members')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/manager/events-management'}
                    className={activeStyle}
                  >
                    <FaCalendarAlt size={18} />{' '}
                    {t('events_mgt', 'Events Management')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/manager/event-registrations'}
                    className={activeStyle}
                  >
                    <FaClipboardList size={18} />{' '}
                    {t('registrations', 'Registrations')}
                  </NavLink>
                </div>
              )}

              {/* Member Section */}
              {role === 'member' && (
                <div className="space-y-2">
                  <NavLink to={'/dashboard/member'} end className={activeStyle}>
                    <FaUsers size={18} />{' '}
                    {t('member_overview', 'Member Overview')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/member/my-clubs'}
                    className={activeStyle}
                  >
                    <FaBuilding size={18} /> {t('my_clubs', 'My Clubs')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/member/my-events'}
                    className={activeStyle}
                  >
                    <FaCalendarAlt size={18} /> {t('my_events', 'My Events')}
                  </NavLink>
                  <NavLink
                    to={'/dashboard/member/payment-history'}
                    className={activeStyle}
                  >
                    <FaMoneyCheckAlt size={18} />{' '}
                    {t('payment_history', 'Payments')}
                  </NavLink>
                </div>
              )}

              <div className="pt-8 px-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  {t('sidebar_account', 'Account')}
                </p>
                <NavLink to={'/dashboard/settings'} className={activeStyle}>
                  <FaCog size={18} /> {t('settings', 'Settings')}
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
