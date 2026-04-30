import React, { useEffect, useRef } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Home, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { toast } from 'react-hot-toast';

const ClubMembershipPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();
  const { width, height } = useWindowSize();

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (sessionId && !hasCalledAPI.current) {
      hasCalledAPI.current = true;

      const updatePayment = async () => {
        try {
          const res = await axiosSecure.patch(
            `/club-membership-payment-success?session_id=${sessionId}`,
          );

          if (res.data?.success) {
            toast.success(t('payment_confirmed', 'Payment Confirmed!'));
          }
        } catch (err) {
          console.log('Payment update skipped or already handled:', err);
        }
      };

      updatePayment();
    }
  }, [sessionId, axiosSecure, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-6 relative overflow-hidden font-sans">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
        colors={['#0b99ce', '#fe3885', '#10b981']}
      />

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-50 rounded-full blur-[120px] opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white shadow-2xl shadow-blue-900/5 rounded-[3rem] p-10 md:p-14 text-center relative z-10 border border-slate-50"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-emerald-50 rounded-[2.5rem] shadow-inner relative">
            <div className="absolute inset-0 bg-emerald-400 opacity-20 rounded-[2.5rem] animate-ping"></div>
            <CheckCircle className="text-emerald-500 relative z-10" size={56} />
          </div>
        </motion.div>

        <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
          {t('payment_success_title', 'Payment Successful!')}
        </h1>

        <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
          {t(
            'club_payment_msg',
            'Thank you for joining the club. Your membership payment has been processed successfully and your status is now active.',
          )}
        </p>

        {sessionId && (
          <div className="bg-slate-50 rounded-2xl p-4 mb-10 border border-slate-100 flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('transaction_id_label', 'Session ID')}
            </span>
            <span className="text-xs font-mono text-slate-600 truncate max-w-full">
              #{sessionId.slice(-12)}...
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-[1.5rem] shadow-xl shadow-blue-200 transition-all duration-500 active:scale-95 uppercase text-xs tracking-widest"
          >
            <LayoutDashboard size={18} />{' '}
            {t('go_dashboard_btn', 'Go to Dashboard')}
          </Link>

          <Link
            to="/clubs"
            className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-50 text-slate-600 font-black rounded-[1.5rem] hover:bg-slate-100 transition-all duration-300 uppercase text-xs tracking-widest border border-slate-100"
          >
            <Home size={18} /> {t('go_my_clubs_btn', 'Explore More Clubs')}
          </Link>
        </div>

        <p className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          {t('secure_payment_badge', 'Verified Secure Transaction')}
        </p>
      </motion.div>
    </div>
  );
};

export default ClubMembershipPaymentSuccess;
