import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট করুন

// React Icons import
import { MdOutlineDashboard } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { FiHome, FiUsers, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';

const Navbar = () => {
  const { user, signOutUserFunction, loading } = useAuth();
  const { t } = useTranslation(); // t ফাংশনটি নেভিগেশন টেক্সট অনুবাদের জন্য

  const links = (
    <>
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition duration-200 ${
              isActive
                ? 'text-white bg-primary font-bold shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50 font-semibold'
            }`
          }
        >
          <FiHome className="text-xl" /> {t('nav_home', 'Home')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/clubs'}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition duration-200 ${
              isActive
                ? 'text-white bg-primary font-bold shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50 font-semibold'
            }`
          }
        >
          <FiUsers className="text-xl" /> {t('nav_clubs', 'Clubs')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/events'}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition duration-200 ${
              isActive
                ? 'text-white bg-primary font-bold shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50 font-semibold'
            }`
          }
        >
          <FiCalendar className="text-xl" /> {t('nav_events', 'Events')}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/pricing'}
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition duration-200 ${
              isActive
                ? 'text-white bg-primary font-bold shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-50 font-semibold'
            }`
          }
        >
          <FiDollarSign className="text-xl" /> {t('nav_pricing', 'Pricing')}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300 z-[99]">
      <Container>
        <nav>
          <div className="navbar min-h-[70px]">
            {/* 1. Navbar Start - Logo and Mobile Dropdown */}
            <div className="navbar-start">
              {/* Mobile Dropdown */}
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden text-gray-700 hover:bg-gray-100"
                >
                  <HiMenu className="h-6 w-6" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-[10] mt-3 w-52 p-4 shadow-xl space-y-2 border border-gray-100"
                >
                  {links}
                </ul>
              </div>

              <Link
                to={'/'}
                className="flex items-center gap-1 md:text-2xl font-extrabold text-gray-800 tracking-widest"
              >
                <span className="text-primary">CLUB</span>
                <span>SPHERE</span>
              </Link>
            </div>

            {/* 2. Navbar Center - Desktop Links */}
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
            </div>

            {/* 3. Navbar End - Auth & User Controls */}
            <div className="navbar-end gap-3">
              {loading ? (
                <span className="loading loading-ring loading-md text-primary"></span>
              ) : user ? (
                // Authenticated User Dropdown
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="m-1 transition duration-300 transform hover:scale-105 rounded-full ring-2 ring-primary ring-offset-2 p-0.5 cursor-pointer"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={
                        user?.photoURL ||
                        'https://i.ibb.co.com/tp3xgXbG/avater.jpg'
                      }
                      alt="User Avatar"
                    />
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-xl z-[10] w-64 p-4 shadow-2xl space-y-3 text-center border border-gray-100 divide-y divide-gray-100"
                  >
                    {/* User Info Header */}
                    <div className="pb-3 space-y-1">
                      <h2 className="text-xl font-bold text-gray-800">
                        {user?.displayName ||
                          t('user_default_name', 'User Name')}
                      </h2>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {/* Dropdown Links */}
                    <div className="pt-3 space-y-1">
                      <NavLink
                        to={`/dashboard`}
                        className={
                          'flex items-center justify-center gap-2 font-semibold text-gray-600 hover:text-primary transition-colors py-2 rounded-lg hover:bg-gray-50'
                        }
                      >
                        <MdOutlineDashboard className="text-xl" />{' '}
                        {t('nav_dashboard', 'Dashboard')}
                      </NavLink>
                      <NavLink
                        to={`/profile`}
                        className={
                          'flex items-center justify-center gap-2 font-semibold text-gray-600 hover:text-primary transition-colors py-2 rounded-lg hover:bg-gray-50'
                        }
                      >
                        <FaUser className="text-sm" />{' '}
                        {t('nav_profile', 'Profile')}
                      </NavLink>
                      <button
                        onClick={signOutUserFunction}
                        className={
                          'w-full flex items-center justify-center gap-2 mt-4 btn bg-red-50 hover:bg-red-100 text-red-600 border-none shadow-none hover:shadow-sm transition-all'
                        }
                      >
                        <IoIosLogOut className="text-xl" />{' '}
                        {t('nav_signout', 'Sign Out')}
                      </button>
                    </div>
                  </ul>
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-3">
                  <Link
                    to="/login"
                    className="btn bg-primary hover:bg-secondary text-white border-none font-semibold transition duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 btn-sm sm:btn-md"
                  >
                    {t('nav_login', 'Log in')}
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:inline-flex btn bg-secondary hover:bg-primary text-white border-none font-semibold transition duration-300 transform hover:scale-105 shadow-lg shadow-secondary/30"
                  >
                    {t('nav_register', 'Register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};
export default Navbar;
