import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-sans overflow-hidden relative">
      {/* Background Subtle Blurs */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#0b99ce]/5 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-[#fe3885]/5 rounded-full blur-[80px]"></div>

      <div className="flex flex-col items-center relative z-10">
        {/* Animated Spinner Shell */}
        <div className="relative w-24 h-24 mb-8">
          {/* Inner Circle (Spinning) */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="absolute inset-0 border-[6px] border-slate-50 border-t-[#0b99ce] rounded-full"
          ></motion.div>

          {/* Middle Pulse Circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-[#0b99ce]/10 rounded-full"
          ></motion.div>

          {/* Logo Center Placeholder */}
          <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 bg-[#fe3885] rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Text with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
            {t('loading_label', 'Loading')}
            <span className="inline-flex ml-1">
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  times: [0, 0.5, 1],
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.2,
                  times: [0, 0.5, 1],
                }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: 0.4,
                  times: [0, 0.5, 1],
                }}
              >
                .
              </motion.span>
            </span>
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            {t('loading_subtitle', 'Preparing your experience')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
