import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiSparkles,
  HiLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    createUserWithEmailAndPasswordFunction,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();

  const axiosPublic = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  if (loading) return <Loading />;

  const handleRegistration = data => {
    setLoading(true);
    const profileImg = data.photo[0];

    createUserWithEmailAndPasswordFunction(data.email, data.password)
      .then(result => {
        const formData = new FormData();
        formData.append('image', profileImg);

        const image_API_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios
          .post(image_API_Url, formData)
          .then(res => {
            const photoURL = res.data.data.url;

            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: photoURL,
            };

            axiosPublic.post('/users', userInfo).then(res => {
              if (res.data.insertedId) {
                console.log('✅ User saved to DB');
              }
            });

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                toast.success(t('toast_reg_success'));
                navigate(location?.state || '/');
                setLoading(false);
              })
              .catch(() => {
                toast.error(t('toast_profile_failed'));
                setLoading(false);
              });
          })
          .catch(() => {
            toast.error(t('toast_img_failed'));
            setLoading(false);
          });
      })
      .catch(error => {
        toast.error(error.message || t('toast_reg_failed'));
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-[#f8fafc] font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-[5%] -left-[5%] w-[45%] h-[45%] bg-[#0b99ce]/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[5%] -right-[5%] w-[45%] h-[45%] bg-[#fe3885]/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(8,112,184,0.1)] border border-slate-50 overflow-hidden relative z-10"
      >
        {/* --- LEFT SIDE: BRANDING & ICONS --- */}
        <div className="hidden md:flex md:w-[40%] bg-[#0b99ce] p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
                <span className="bg-white text-[#0b99ce] px-3 py-1 rounded-xl">
                  C S
                </span>
                CLUBSPHERE
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-2 text-white/80 font-black text-[10px] uppercase tracking-[0.4em]"
              >
                <HiSparkles className="text-[#fe3885] text-lg" />
                {t('reg_tag')}
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl font-serif italic text-white leading-tight"
              >
                {t('reg_unlock_title')} <br />
                <span className="font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  {t('reg_potential')}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-blue-50/70 text-lg font-medium leading-relaxed"
              >
                {t('reg_desc')}
              </motion.p>

              {/* Decorative Features List */}
              <motion.div variants={fadeInUp} className="pt-8 space-y-4">
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiLightningBolt className="text-xl text-yellow-300" />
                  <span className="font-bold text-sm">{t('feat_fast')}</span>
                </div>
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiOutlineShieldCheck className="text-xl text-green-300" />
                  <span className="font-bold text-sm">{t('feat_secure')}</span>
                </div>
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiOutlineGlobeAlt className="text-xl text-blue-200" />
                  <span className="font-bold text-sm">{t('feat_global')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] right-[-10%] w-32 h-32 bg-[#fe3885]/20 rounded-full blur-2xl"></div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        <div className="flex-1 p-8 md:p-14 bg-white flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {t('reg_title')}
            </h3>
            <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-[0.2em]">
              {t('reg_subtitle')}
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Full Name Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="form-control space-y-2"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_full_name')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce]">
                  <HiOutlineUser size={20} />
                </div>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#0b99ce]/20 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  placeholder={t('placeholder_name')}
                />
              </div>
            </motion.div>

            {/* Photo Upload Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="form-control space-y-2"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_profile_photo')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce]">
                  <HiOutlinePhotograph size={20} />
                </div>
                <input
                  type="file"
                  {...register('photo', { required: true })}
                  className="file-input w-full pl-12 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 outline-none file:bg-[#0b99ce] file:text-white file:border-none file:px-4 file:mr-4 file:rounded-xl file:text-[10px] file:font-black file:uppercase cursor-pointer"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="form-control space-y-2 md:col-span-2"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_email')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce]">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#0b99ce]/20 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  placeholder={t('placeholder_email')}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="form-control space-y-2 md:col-span-2"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_password')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce]">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true, minLength: 6 })}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 placeholder:text-slate-400 focus:bg-white focus:border-[#0b99ce]/20 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  placeholder={t('placeholder_password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0b99ce]"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: '#fe3885' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="md:col-span-2 h-14 bg-[#0b99ce] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-100 transition-all duration-300 mt-4"
            >
              {t('btn_create_account')}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              <span className="bg-white px-4">{t('divider_join')}</span>
            </div>
          </div>

          <SocialLogin />

          {/* Footer Link */}
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest mt-8">
            {t('reg_footer_text')}{' '}
            <Link
              to="/login"
              className="text-[#0b99ce] font-black hover:text-[#fe3885] underline underline-offset-8 ml-1"
            >
              {t('reg_signin_link')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
