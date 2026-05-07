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
    <div className="w-full flex items-center justify-center gap-4">
      {/* Google */}
      <button
        onClick={handleGoogleSignin}
        className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
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
      </button>

      {/* Facebook */}
      <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3 3-3 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" />
        </svg>
      </button>

      {/* Phone */}
      <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.7 3.5.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.7 3.5a1 1 0 0 1-.2 1l-2.4 2.3z" />
        </svg>
      </button>

      {/* GitHub */}
      <button className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 1.9 3.4 1.3.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C16 5.1 17 5.4 17 5.4c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3.1c0 .4.2.7.8.6A12 12 0 0 0 12 .5z" />
        </svg>
      </button>
    </div>
  );
};

export default SocialLogin;
