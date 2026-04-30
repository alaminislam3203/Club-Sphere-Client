import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo/logo.png';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const ForgetPassword = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { sendPasswordResetEmailFunction, setLoading, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  const handleResetPassword = data => {
    setLoading(true);
    sendPasswordResetEmailFunction(data.email)
      .then(() => {
        toast.success(
          t('toast_reset_sent', 'Password reset email sent! Check your inbox.'),
        );
        setLoading(false);
        navigate('/login');
      })
      .catch(error => {
        console.log(error);
        toast.error(
          error.message ||
            t('toast_reset_failed', 'Failed to send reset email.'),
        );
        setLoading(false);
      });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-slate-50/50 font-sans">
      <div className="card bg-white w-full max-w-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-[2.5rem] border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b99ce]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fe3885]/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="card-body p-8 md:p-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 p-4 bg-white rounded-3xl shadow-xl border border-slate-50 mb-6 transition-transform hover:scale-110 duration-300 flex items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight text-center leading-tight">
              {t('forget_pass_title', 'Forgot Password?')}
            </h3>
            <p className="text-slate-500 font-medium mt-3 text-center text-sm px-2 leading-relaxed">
              {t(
                'forget_pass_subtitle',
                "Enter your email address and we'll send you a link to reset your password.",
              )}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="form-control w-full space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_registered_email', 'Registered Email')}
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
                  placeholder={t(
                    'placeholder_email',
                    'Enter your email address',
                  )}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 ml-2 font-black uppercase tracking-widest italic">
                  {t('error_email_required', 'Email is required')}
                </p>
              )}
            </div>

            {/* Reset Button */}
            <button className="btn w-full h-14 bg-[#0b99ce] hover:bg-[#fe3885] border-none rounded-[1.2rem] text-white font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95">
              {t('btn_send_link', 'Send Reset Link')}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-[0.15em] hover:text-[#0b99ce] transition-colors group"
            >
              <HiOutlineArrowNarrowLeft
                className="group-hover:-translate-x-2 transition-transform"
                size={20}
              />
              {t('btn_back_to_signin', 'Back to Sign In')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
