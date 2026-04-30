import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 font-sans overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#0b99ce]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#fe3885]/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative z-10"
      >
        {/* Icon with Animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-8"
        >
          <div className="p-6 bg-rose-50 rounded-[2rem] shadow-inner">
            <FaExclamationTriangle className="text-6xl text-[#fe3885]" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-4">
          {t('error_title', 'Oops! Something Went Wrong')}
        </h1>

        {/* Description */}
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          {t(
            'error_description',
            'The page you are looking for doesn’t exist or an unexpected error has occurred. Please try again or go back to the homepage.',
          )}
        </p>

        {/* Back Home Button */}
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn h-14 px-10 bg-[#0b99ce] hover:bg-[#fe3885] text-white border-none rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-100 transition-all flex items-center gap-3 mx-auto"
          >
            <FaArrowLeft />
            {t('error_back_btn', 'Back to Home')}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
