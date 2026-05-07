import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiSparkles,
  HiLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
} from 'react-icons/hi';

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInWithEmailAndPasswordFunction, setLoading, loading } = useAuth();
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

  const handleLogin = data => {
    setLoading(true);
    signInWithEmailAndPasswordFunction(data.email, data.password)
      .then(() => {
        toast.success(t('toast_login_success', 'Login successful!'));
        navigate(location?.state || '/');
        setLoading(false);
      })
      .catch(error => {
        toast.error(error.message || t('toast_login_failed', 'Login failed.'));
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 bg-[#f8fafc] font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0b99ce]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#fe3885]/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(8,112,184,0.15)] border border-slate-50 overflow-hidden relative z-10"
      >
        {/* --- LEFT SIDE: BRANDING & ICONS --- */}
        <div className="hidden md:flex md:w-[40%] bg-[#0b99ce] p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Logo as Text */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-2">
                <span className="bg-white text-[#0b99ce] px-3 py-1 rounded-xl shadow-lg">
                  C S
                </span>
                {t('brand_name', 'CLUBSPHERE')}
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
                <HiSparkles className="text-[#fe3885]" />
                {t('welcome_back', 'Welcome Back')}
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl font-serif italic text-white leading-tight"
              >
                {t('shape_your', 'Shape Your')} <br />
                <span className="font-black not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  {t('digital_legacy', 'Digital Legacy.')}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-blue-50/70 text-lg font-medium leading-relaxed"
              >
                {t(
                  'landscape_desc',
                  'Experience the next level of community collaboration and management.',
                )}
              </motion.p>

              {/* Feature Icons Section */}
              <motion.div variants={fadeInUp} className="pt-8 space-y-4">
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiOutlineShieldCheck className="text-xl text-green-300" />
                  <span className="font-bold text-sm">
                    {t('secure_auth', 'Secure Authentication')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiOutlineUserGroup className="text-xl text-blue-200" />
                  <span className="font-bold text-sm">
                    {t('active_members', '2.4k+ Active Members')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/90 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <HiLightningBolt className="text-xl text-yellow-300" />
                  <span className="font-bold text-sm">
                    {t('realtime_updates', 'Real-time Updates')}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="flex-1 p-8 md:p-14 lg:p-16 bg-white flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              {t('welcome_back', 'Welcome Back')}
            </h3>
            <p className="text-slate-400 font-bold mt-1 uppercase text-[10px] tracking-[0.2em]">
              {t('access_credentials', 'Enter your credentials to access')}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="form-control space-y-2"
            >
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_email', 'Email Address')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:bg-white focus:border-[#0b99ce]/20 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  placeholder={t('placeholder_email', 'Enter your email')}
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="form-control space-y-2"
            >
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {t('label_password', 'Password')}
                </label>
                <Link
                  to="/forget-password"
                  title="Reset"
                  className="text-[10px] font-black uppercase tracking-widest text-[#0b99ce] hover:text-[#fe3885]"
                >
                  {t('forgot_password_link', 'Forgot?')}
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce]">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true, minLength: 6 })}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:bg-white focus:border-[#0b99ce]/20 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  placeholder={t('placeholder_password', 'Enter your password')}
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

            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: '#fe3885' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full h-14 bg-[#0b99ce] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-100 transition-all duration-300 mt-4"
            >
              {t('btn_login', 'Login')}
            </motion.button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              <span className="bg-white px-4">
                {t('divider_or', 'Social Access')}
              </span>
            </div>
          </div>

          <SocialLogin />

          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest mt-8">
            {t('login_footer_text', 'New here?')}{' '}
            <Link
              to="/register"
              className="text-[#0b99ce] font-black hover:text-[#fe3885] underline underline-offset-8 ml-1"
            >
              {t('login_register_link', 'Create Account')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
