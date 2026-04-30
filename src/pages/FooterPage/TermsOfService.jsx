import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট
import {
  FaGavel,
  FaUserCheck,
  FaBan,
  FaShieldAlt,
  FaFileContract,
  FaExclamationTriangle,
  FaDownload,
} from 'react-icons/fa';

const TermsOfService = () => {
  const { t } = useTranslation(); // t ফাংশন ডিক্লেয়ার
  const lastUpdated = t('terms_last_updated', 'December 20, 2025');

  const terms = [
    {
      icon: <FaUserCheck className="text-[#0b99ce]" />,
      title: t('terms_title_1', '1. Acceptance of Terms'),
      content: t(
        'terms_content_1',
        'By accessing and using ClubSphere, you agree to follow our rules and regulations. If you do not agree with any part of these terms, you must not use our platform.',
      ),
    },
    {
      icon: <FaShieldAlt className="text-emerald-500" />,
      title: t('terms_title_2', '2. User Responsibilities'),
      content: t(
        'terms_content_2',
        'You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate information and keep it updated at all times.',
      ),
    },
    {
      icon: <FaBan className="text-[#fe3885]" />,
      title: t('terms_title_3', '3. Prohibited Activities'),
      content: t(
        'terms_content_3',
        'Users are strictly prohibited from uploading harmful content, attempting to breach security, or using the platform for any illegal club activities or fraudulent events.',
      ),
    },
    {
      icon: <FaGavel className="text-purple-500" />,
      title: t('terms_title_4', '4. Termination of Access'),
      content: t(
        'terms_content_4',
        'We reserve the right to suspend or terminate your account without notice if we believe you have violated these terms or engaged in conduct harmful to other members.',
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0b99ce]/5 rounded-full blur-[80px] -z-10"></div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-amber-50 text-amber-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl shadow-amber-900/5 border border-amber-100"
          >
            <FaFileContract />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            {t('terms_main_title', 'Terms of')}{' '}
            <span className="text-[#0b99ce]">
              {t('terms_main_title_span', 'Service')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] bg-slate-50 w-fit mx-auto px-4 py-2 rounded-full border border-slate-100 shadow-sm"
          >
            {t('effective_date', 'Effective Date')}: {lastUpdated}
          </motion.p>
        </div>

        {/* Content Area */}
        <div className="space-y-8 mb-20">
          {terms.map((term, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-[#0b99ce]/30 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-3xl shrink-0 group-hover:bg-[#0b99ce] group-hover:text-white transition-all duration-500 shadow-inner">
                  {term.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight group-hover:text-[#0b99ce] transition-colors">
                    {term.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-base md:text-lg">
                    {term.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limitation of Liability Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 text-slate-300 p-10 md:p-16 rounded-[4rem] relative overflow-hidden mb-20 border border-slate-800 shadow-2xl"
        >
          <FaExclamationTriangle className="absolute -right-8 -bottom-8 text-[12rem] opacity-[0.03] text-white rotate-12" />
          <h4 className="text-white font-black text-2xl mb-6 flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-amber-500/10 rounded-2xl">
              <FaExclamationTriangle className="text-amber-400" />
            </div>
            {t('liability_title', 'Limitation of Liability')}
          </h4>
          <p className="text-lg leading-relaxed opacity-70 font-medium">
            {t(
              'liability_content',
              'ClubSphere shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the platform, including but not limited to club disputes or event cancellations.',
            )}
          </p>
        </motion.div>

        <div className="text-center space-y-10 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic leading-relaxed px-4">
            {t(
              'acceptance_footer',
              '"By continuing to use our platform, you acknowledge that you have read and understood these terms."',
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-12 py-5 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-[1.5rem] transition-all duration-500 shadow-2xl shadow-blue-900/20 active:scale-95 uppercase text-xs tracking-widest">
              {t('btn_accept', 'I Accept the Terms')}
            </button>
            <button className="px-10 py-5 bg-white text-slate-600 border border-slate-200 font-black rounded-[1.5rem] hover:bg-slate-50 transition-all flex items-center gap-3 uppercase text-xs tracking-widest">
              <FaDownload className="text-[#0b99ce]" />{' '}
              {t('btn_download', 'Download PDF')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
