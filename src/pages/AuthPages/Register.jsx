import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocialLogin';
import logo from '../../assets/logo/logo2.png';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';

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
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

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
              role: 'member',
              createdAt: new Date(),
            };

            axiosSecure.post('/users', userInfo).then(res => {
              if (res.data.insertedId) {
                console.log('User created in DB');
              }
            });

            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                toast.success(
                  t('toast_reg_success', 'Registration successful!'),
                );
                navigate(location?.state || '/');
                setLoading(false);
              })
              .catch(error => {
                toast.error(
                  t('toast_profile_failed', 'Failed to update profile.'),
                );
                setLoading(false);
              });
          })
          .catch(error => {
            toast.error(t('toast_img_failed', 'Image upload failed.'));
            setLoading(false);
          });
      })
      .catch(error => {
        toast.error(
          error.message || t('toast_reg_failed', 'Registration failed.'),
        );
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white font-sans">
      <div className="card bg-white w-full max-w-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] rounded-[2.5rem] border border-slate-100 overflow-hidden relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0b99ce]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#fe3885]/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="card-body p-8 md:p-12 relative z-10">
          {/* Header  */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 p-3 bg-white rounded-2xl shadow-xl border border-slate-50 mb-4 transition-transform hover:scale-110 duration-300">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight text-center">
              {t('reg_title', 'Create Account')}
            </h3>
            <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-[0.2em] text-center">
              {t('reg_subtitle', 'Join the ClubSphere Community')}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-5"
          >
            {/* Full Name */}
            <div className="form-control space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_full_name', 'Full Name')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlineUser size={22} />
                </div>
                <input
                  type="text"
                  {...register('name', { required: true })}
                  className={`w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-800 border-none rounded-2xl font-bold transition-all focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none ${
                    errors.name ? 'ring-2 ring-red-400' : ''
                  }`}
                  placeholder={t('placeholder_name', 'Enter your full name')}
                />
              </div>
            </div>

            {/* Profile Photo */}
            <div className="form-control space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_profile_photo', 'Profile Photo')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlinePhotograph size={22} />
                </div>
                <input
                  type="file"
                  {...register('photo', { required: true })}
                  className="file-input w-full pl-12 bg-slate-50 text-slate-700 border-none rounded-2xl font-bold transition-all focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none file:bg-[#0b99ce] file:text-white file:border-none file:px-4 file:mr-4 file:rounded-xl file:text-[10px] file:font-black file:uppercase file:tracking-widest"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="form-control space-y-2">
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
                  placeholder={t('placeholder_email', 'Enter your email here')}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_password', 'Password')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0b99ce] transition-colors">
                  <HiOutlineLockClosed size={22} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                  })}
                  className={`w-full pl-12 pr-12 py-4 bg-slate-50 text-slate-800 border-none rounded-2xl font-bold transition-all focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none ${
                    errors.password ? 'ring-2 ring-red-400' : ''
                  }`}
                  placeholder={t('placeholder_password', 'Enter your password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#0b99ce]"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff size={22} />
                  ) : (
                    <HiOutlineEye size={22} />
                  )}
                </button>
              </div>

              {/* Password Validation Messages */}
              <div className="mt-1 ml-2">
                {errors.password?.type === 'pattern' && (
                  <p className="text-red-400 text-[9px] font-black uppercase tracking-tighter leading-tight italic">
                    {t(
                      'error_password_pattern',
                      'Must include Uppercase, Lowercase, Number & Special Character.',
                    )}
                  </p>
                )}
              </div>
            </div>

            <button className="btn w-full h-14 bg-[#0b99ce] hover:bg-[#fe3885] border-none rounded-[1.2rem] text-white font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95 mt-4">
              {t('btn_create_account', 'Create Account')}
            </button>
          </form>

          <div className="divider text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] my-8">
            {t('divider_join', 'OR JOIN WITH')}
          </div>

          <SocialLogin />

          <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-widest mt-10">
            {t('reg_footer_text', 'Already have an account?')}{' '}
            <Link
              to={'/login'}
              state={location?.state}
              className="text-[#0b99ce] font-black hover:text-[#fe3885] transition-colors underline underline-offset-4 ml-1"
            >
              {t('reg_signin_link', 'Sign In')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
