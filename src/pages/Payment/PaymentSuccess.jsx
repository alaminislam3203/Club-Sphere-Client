import React, { useEffect, useRef } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Home, LayoutDashboard, Users, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { toast } from 'react-hot-toast';

const CONTENT_MAP = {
  // ✅ Event payment
  event: {
    icon: <CheckCircle className="text-emerald-500 relative z-10" size={56} />,
    iconBg: 'bg-emerald-50',
    iconPing: 'bg-emerald-400',
    badge: 'Payment Confirmed',
    badgeKey: 'event_ticket_badge',
    title: 'Payment Successful!',
    titleKey: 'payment_success_title',
    message:
      'Thank you for payment. Your payment has been processed successfully.',
    messageKey: 'event_payment_msg',
    dashboardLink: '/dashboard/member/my-events',
    exploreLink: '/events',
    exploreLinkText: 'Explore More Events',
    exploreLinkKey: 'explore_more_events',
    btnColor: 'bg-[#0b99ce] hover:bg-[#fe3885] shadow-blue-200',
    confettiColors: ['#0b99ce', '#fe3885', '#10b981'],
    // Which API endpoint to call
    apiEndpoint: '/payment-success',
  },

  // ✅ Club membership payment
  'club-membership': {
    icon: <Users className="text-violet-500 relative z-10" size={56} />,
    iconBg: 'bg-violet-50',
    iconPing: 'bg-violet-400',
    badge: '🏛️ Club Membership Active',
    badgeKey: 'club_membership_badge',
    title: 'Welcome to the Club!',
    titleKey: 'club_membership_success_title',
    message:
      'You have successfully joined the club. Your membership is now active and you can enjoy all club benefits.',
    messageKey: 'club_membership_payment_msg',
    dashboardLink: '/dashboard/member/my-clubs',
    exploreLink: '/clubs',
    exploreLinkText: 'Explore More Clubs',
    exploreLinkKey: 'explore_more_clubs',
    btnColor: 'bg-violet-500 hover:bg-violet-600 shadow-violet-200',
    confettiColors: ['#7c3aed', '#a78bfa', '#c4b5fd'],
    // Which API endpoint to call
    apiEndpoint: '/club-membership-payment-success',
  },

  // ✅ Plan membership payment
  'plan-membership': {
    icon: <Crown className="text-amber-500 relative z-10" size={56} />,
    iconBg: 'bg-amber-50',
    iconPing: 'bg-amber-400',
    badge: '👑 Premium Plan Active',
    badgeKey: 'plan_membership_badge',
    title: 'Plan Activated!',
    titleKey: 'plan_membership_success_title',
    message:
      'Your premium plan has been activated successfully. Enjoy exclusive features and benefits across the platform.',
    messageKey: 'plan_membership_payment_msg',
    dashboardLink: '/dashboard',
    exploreLink: '/pricing',
    exploreLinkText: 'View Plan Details',
    exploreLinkKey: 'view_plan_details',
    btnColor: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200',
    confettiColors: ['#f59e0b', '#fcd34d', '#fde68a'],
    // Which API endpoint to call
    apiEndpoint: '/payment-success-record',
  },
};

const DEFAULT_TYPE = 'event';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const rawType = searchParams.get('type');

  const paymentType = CONTENT_MAP[rawType] ? rawType : DEFAULT_TYPE;
  const content = CONTENT_MAP[paymentType];

  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();
  const { width, height } = useWindowSize();
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (!sessionId || hasCalledAPI.current) return;
    hasCalledAPI.current = true;

    axiosSecure
      .patch(`${content.apiEndpoint}?session_id=${sessionId}`)
      .then(res => {
        if (res.data?.success) {
          toast.success(t('payment_confirmed', 'Payment Confirmed!'));
        }
      })
      .catch(() => {});
  }, [sessionId, axiosSecure, content.apiEndpoint]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-6 relative overflow-hidden font-sans">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
        colors={content.confettiColors}
      />

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

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
          <div
            className={`p-6 ${content.iconBg} rounded-[2.5rem] shadow-inner relative`}
          >
            <div
              className={`absolute inset-0 ${content.iconPing} opacity-20 rounded-[2.5rem] animate-ping`}
            />
            {content.icon}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mb-4"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
            {t(content.badgeKey, content.badge)}
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-3xl font-black text-slate-900 mb-4 tracking-tight"
        >
          {t(content.titleKey, content.title)}
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 font-medium text-lg mb-10 leading-relaxed"
        >
          {t(content.messageKey, content.message)}
        </motion.p>

        {/* Session ID */}
        {sessionId && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="bg-slate-50 rounded-2xl p-4 mb-10 border border-slate-100 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('transaction_id_label', 'Session ID')}
            </span>
            <span className="text-xs font-mono text-slate-600 truncate max-w-full">
              #{sessionId.slice(-20)}...
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-4"
        >
          <Link
            to={content.dashboardLink}
            className={`flex items-center justify-center gap-3 px-8 py-5 ${content.btnColor} text-white font-black rounded-[1.5rem] shadow-xl transition-all duration-500 active:scale-95 uppercase text-xs tracking-widest`}
          >
            <LayoutDashboard size={18} />
            {t('go_dashboard_btn', 'Go to Dashboard')}
          </Link>

          <Link
            to={content.exploreLink}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-50 text-slate-600 font-black rounded-[1.5rem] hover:bg-slate-100 transition-all duration-300 uppercase text-xs tracking-widest border border-slate-100"
          >
            <Home size={18} />
            {t(content.exploreLinkKey, content.exploreLinkText)}
          </Link>
        </motion.div>

        <p className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          {t('secure_payment_badge', 'Verified Secure Transaction')}
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
