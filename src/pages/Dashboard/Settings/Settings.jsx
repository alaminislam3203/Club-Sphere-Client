import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaUser, FaLock, FaBell, FaGlobe, FaPalette } from 'react-icons/fa';

import Profile from '../../Profile/Profile';
import ForgetPassword from '../../AuthPages/ForgetPassword';
import LanguageSwitcher from '../../../components/Language/LanguageSwitcher';
import ThemeToggle from '../../../components/Theme/ThemeToggle';

const Settings = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: t('profile_tab', 'Profile'), icon: <FaUser /> },
    { id: 'security', label: t('security_tab', 'Security'), icon: <FaLock /> },
    {
      id: 'notifications',
      label: t('notifications_tab', 'Notifications'),
      icon: <FaBell />,
    },
    { id: 'language', label: t('language_tab', 'Language'), icon: <FaGlobe /> },
    { id: 'theme', label: t('theme_tab', 'Theme'), icon: <FaPalette /> },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {t('settings_title_prefix', 'Account')}{' '}
            <span className="text-[#0b99ce]">
              {t('settings_title_suffix', 'Settings')}
            </span>
          </h1>
          <p className="text-slate-500 font-medium">
            {t(
              'settings_desc',
              'Manage your account preferences and security.',
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0b99ce] text-white shadow-lg shadow-blue-100'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-white p-2 md:p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* PROFILE */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Profile />
                </motion.div>
              )}

              {/* SECURITY */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <ForgetPassword />
                </motion.div>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <NotificationToggle
                    label={t('notif_email_label', 'Email Notifications')}
                    desc={t(
                      'notif_email_desc',
                      'Get updates about club activities.',
                    )}
                    active={true}
                  />
                  <NotificationToggle
                    label={t('notif_event_label', 'Event Reminders')}
                    desc={t(
                      'notif_event_desc',
                      'Get notified before an event starts.',
                    )}
                    active={true}
                  />
                </motion.div>
              )}

              {/* LANGUAGE */}
              {activeTab === 'language' && (
                <motion.div
                  key="language"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <FaGlobe className="text-[#0b99ce]" />
                    <h3 className="text-slate-800 text-xl font-bold">
                      {t('language_select_label')}
                    </h3>
                  </div>
                  <LanguageSwitcher />
                </motion.div>
              )}

              {/* THEME */}
              {activeTab === 'theme' && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <FaPalette className="text-purple-600" />
                    <h3 className="text-xl text-slate-800 font-bold">
                      {t('theme_select_label', 'Theme Mode')}
                    </h3>
                  </div>

                  <ThemeToggle />

                  <p className="text-sm text-gray-400">
                    {t(
                      'theme_note',
                      'Your theme preference will be saved automatically.',
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
// Notification Toggle
const NotificationToggle = ({ label, desc, active }) => (
  <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
    <div>
      <h4 className="font-bold text-slate-800 text-sm">{label}</h4>
      <p className="text-slate-400 text-xs">{desc}</p>
    </div>
    <input type="checkbox" defaultChecked={active} />
  </div>
);

export default Settings;
