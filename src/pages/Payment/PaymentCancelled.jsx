import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MdCancel } from 'react-icons/md';
import { FaArrowLeft, FaUndo } from 'react-icons/fa';

const PaymentCancelled = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decor Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-50 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-100 rounded-full blur-[120px] opacity-60"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-rose-900/5 border border-slate-100 text-center relative z-10"
      >
        {/* Cancel Icon with Animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-24 h-24 bg-rose-50 text-[#fe3885] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner relative"
        >
          <MdCancel />
        </motion.div>

        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
          {t('payment_cancel_title', 'Payment Cancelled')}
        </h2>

        <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
          {t(
            'payment_cancel_msg',
            'Your payment could not be processed or was cancelled. No charges were made.',
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to="/pricing"
            className="px-8 py-5 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:shadow-rose-200 transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 uppercase text-xs tracking-widest"
          >
            <FaUndo /> {t('try_again_btn', 'Try Again')}
          </Link>

          <Link
            to="/"
            className="px-8 py-5 bg-slate-50 text-slate-600 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase text-xs tracking-widest border border-slate-100"
          >
            <FaArrowLeft /> {t('back_home_btn', 'Back to Home')}
          </Link>
        </div>

        <p className="mt-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
          {t('payment_secure_label', 'Secure Transaction System')}
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentCancelled;
