import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  FaEdit,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimes,
} from 'react-icons/fa';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ['user-profile-data', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  const uploadToImgBB = async file => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`,
      formData,
    );
    return res.data.data.url;
  };

  const handleUpdateProfile = async e => {
    e.preventDefault();
    setIsUpdating(true);

    const name = e.target.name.value;
    const profileFile = e.target.profilePic.files[0];

    try {
      let profileUrl = user?.photoURL;
      if (profileFile) {
        profileUrl = await uploadToImgBB(profileFile);
      }

      await updateUserProfile({ displayName: name, photoURL: profileUrl });
      await axiosSecure.patch(`/users/update/${user?.email}`, {
        name: name,
        photoURL: profileUrl,
      });

      Swal.fire({
        icon: 'success',
        title: t('alert_updated_title', 'Updated!'),
        text: t('alert_updated_msg', 'Profile changes saved successfully.'),
        showConfirmButton: false,
        timer: 1800,
        customClass: { popup: 'rounded-[2rem]' },
      });

      queryClient.invalidateQueries(['user-profile-data']);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Update Error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100"
        >
          {/* Cover Header */}
          <div
            className="h-48 w-full bg-cover bg-center relative transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${
                userData?.coverPhoto ||
                'https://images.unsplash.com/photo-1579546678183-a9c1c49ea0d2'
              })`,
            }}
          >
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="p-2 bg-white rounded-full shadow-2xl relative">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* Info Header */}
          <div className="pt-20 pb-10 px-8 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                {user?.displayName || t('unknown_user', 'Unknown User')}
                <span className="badge badge-primary font-black uppercase text-[9px] px-3 py-3 h-auto tracking-widest border-none">
                  {isLoading
                    ? '...'
                    : userData?.role || t('role_member', 'Member')}
                </span>
              </h1>
              <p className="text-slate-500 font-bold flex items-center gap-2 text-sm">
                <FaEnvelope className="text-[#0b99ce]" /> {user?.email}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn h-12 bg-white border-slate-200 text-slate-700 hover:bg-[#0b99ce] hover:text-white hover:border-[#0b99ce] rounded-2xl shadow-sm gap-2 font-black uppercase text-xs tracking-widest px-8 transition-all active:scale-95"
            >
              <FaEdit /> {t('edit_profile_btn', 'Edit Profile')}
            </button>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-12 pb-12">
            <StatCard
              icon={<FaUserShield />}
              label={t('label_account_type', 'Account Type')}
              value={userData?.role || t('role_member', 'Member')}
              color="blue"
            />
            <StatCard
              icon={<FaCalendarAlt />}
              label={t('label_member_since', 'Member Since')}
              value={joinedDate}
              color="pink"
            />
            <StatCard
              icon={<FaCheckCircle />}
              label={t('label_verification', 'Verification')}
              value={t('status_verified', 'Verified')}
              color="emerald"
            />
          </div>
        </motion.div>

        {/* --- EDIT MODAL --- */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden p-8 md:p-10 border border-slate-100"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                    {t('edit_profile_modal_title', 'Edit Profile')}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-slate-400 hover:text-[#fe3885] hover:rotate-90 transition-all"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                      {t('label_display_name', 'Display Name')}
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={user?.displayName}
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                      {t('label_profile_pic', 'Profile Picture')}
                    </label>
                    <input
                      name="profilePic"
                      type="file"
                      className="file-input file-input-bordered file-input-primary w-full rounded-2xl h-14 text-gray-700 bg-slate-50 border-slate-100"
                      accept="image/*"
                    />
                  </div>

                  <button
                    disabled={isUpdating}
                    className="btn w-full h-14 bg-[#0b99ce] hover:bg-[#fe3885] text-white border-none rounded-[1.2rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300"
                  >
                    {isUpdating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      t('btn_save_changes', 'Save Changes')
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm ${
        color === 'blue'
          ? 'bg-blue-100 text-[#0b99ce]'
          : color === 'pink'
            ? 'bg-pink-100 text-[#fe3885]'
            : 'bg-emerald-100 text-emerald-500'
      }`}
    >
      {icon}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
      {label}
    </p>
    <h4 className="text-lg font-black text-slate-800 mt-1 capitalize tracking-tight">
      {value}
    </h4>
  </div>
);

export default Profile;
