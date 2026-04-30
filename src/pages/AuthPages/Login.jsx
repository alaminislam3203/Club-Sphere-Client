import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import logo from '../../assets/logo/logo2.png';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
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

  if (loading) {
    return <Loading />;
  }

  const handleLogin = data => {
    setLoading(true);
    signInWithEmailAndPasswordFunction(data.email, data.password)
      .then(result => {
        toast.success(t('toast_login_success', 'Login successful!'));
        navigate(location?.state || '/');
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        toast.error(error.message || t('toast_login_failed', 'Login failed.'));
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-white font-sans">
      <div className="card bg-white w-full max-w-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-[2.5rem] border border-slate-100 overflow-hidden relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b99ce]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fe3885]/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="card-body p-8 md:p-12 relative z-10">
          {/* Logo & Header*/}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 p-4 bg-white rounded-3xl shadow-xl border border-slate-50 mb-6 transition-transform hover:scale-110 duration-300 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight text-center leading-tight">
              {t('login_title', 'Welcome Back')}
            </h3>
            <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] text-center">
              {t('login_subtitle', 'Login to ClubSphere Account')}
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div className="form-control w-full space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_email', 'Email Address')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlineMail size={22} />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-800 border-none rounded-2xl font-bold transition-all focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none ${
                    errors.email ? 'ring-2 ring-red-400' : ''
                  }`}
                  placeholder={t('placeholder_email', 'Enter your email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 ml-2 font-black uppercase tracking-widest italic">
                  {t('error_email_required', 'Email is required')}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control w-full space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  {t('label_password', 'Password')}
                </label>
                <Link
                  to={'/forget-password'}
                  className="text-[10px] font-black uppercase tracking-widest text-[#0b99ce] hover:text-[#fe3885] transition-colors"
                >
                  {t('forgot_password_link', 'Forgot Password?')}
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlineLockClosed size={22} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: true,
                    minLength: 6,
                  })}
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 text-slate-800 border-none rounded-2xl font-bold transition-all focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none ${
                    errors.password ? 'ring-2 ring-red-400' : ''
                  }`}
                  placeholder={t('placeholder_password', 'Enter your password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0b99ce] transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={20} />
                  ) : (
                    <HiOutlineEye size={20} />
                  )}
                </button>
              </div>

              {/* Password Validation Messages */}
              <div className="mt-1 space-y-1 ml-2">
                {errors.password?.type === 'required' && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest italic">
                    {t('error_password_required', 'Password is required')}
                  </p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest italic">
                    {t('error_password_length', 'Must be 6+ characters')}
                  </p>
                )}
              </div>
            </div>

            {/* Login Button */}
            <button className="btn w-full h-14 bg-[#0b99ce] hover:bg-[#fe3885] border-none rounded-[1.2rem] text-white font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95">
              {t('btn_login', 'Login')}
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] my-10 px-4">
            {t('divider_or', 'OR CONTINUE WITH')}
          </div>

          {/* Social Login */}
          <div className="mb-8">
            <SocialLogin />
          </div>

          {/* Footer */}
          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
            {t('login_footer_text', 'New here?')}{' '}
            <Link
              to={'/register'}
              state={location?.state}
              className="text-[#0b99ce] font-black hover:text-[#fe3885] transition-colors underline underline-offset-4"
            >
              {t('login_register_link', 'Create an Account')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
