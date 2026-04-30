import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = () => {
  const { t } = useTranslation();
  const { signInWithPopupGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignin = () => {
    signInWithPopupGoogle()
      .then(result => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          role: 'member',
          createdAt: new Date(),
        };

        axiosSecure.post('/users', userInfo).then(res => {
          console.log('User data stored:', res.data);

          toast.success(
            t('toast_google_success', 'Login with Google successful!'),
          );
          navigate(location.state || '/');
        });
      })
      .catch(error => {
        console.error(error);
        toast.error(t('toast_google_failed', 'Google sign-in failed.'));
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignin}
        className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 uppercase text-xs tracking-widest"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-110"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
        </svg>

        <span>{t('btn_google_signin', 'Continue with Google')}</span>
      </button>
    </div>
  );
};

export default SocialLogin;
