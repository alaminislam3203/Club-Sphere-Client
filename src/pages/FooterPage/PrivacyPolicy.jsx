import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট
import {
  FaShieldAlt,
  FaUserLock,
  FaEyeSlash,
  FaInfoCircle,
  FaCheckCircle,
} from 'react-icons/fa';

const PrivacyPolicy = () => {
  const { t } = useTranslation(); // t ফাংশন ডিক্লেয়ার
  const lastUpdated = t('privacy_last_updated', 'December 20, 2025');

  const sections = [
    {
      icon: <FaInfoCircle className="text-[#0b99ce]" />,
      title: t('privacy_title_1', '1. Information We Collect'),
      content: t(
        'privacy_content_1',
        'We collect information you provide directly to us when you create an account, join a club, or register for an event. This includes your name, email address, payment details, and any other information you choose to provide.',
      ),
    },
    {
      icon: <FaUserLock className="text-purple-500" />,
      title: t('privacy_title_2', '2. How We Use Your Data'),
      content: t(
        'privacy_content_2',
        "The information we collect is used to personalize your experience, process your membership payments, send you event updates, and improve our platform's overall functionality.",
      ),
    },
    {
      icon: <FaEyeSlash className="text-emerald-500" />,
      title: t('privacy_title_3', '3. Data Sharing & Security'),
      content: t(
        'privacy_content_3',
        'We do not sell your personal data to third parties. We use industry-standard encryption (SSL) to protect your sensitive information during transmission and storage.',
      ),
    },
    {
      icon: <FaShieldAlt className="text-orange-500" />,
      title: t('privacy_title_4', '4. Your Rights & Choices'),
      content: t(
        'privacy_content_4',
        'You have the right to access, update, or delete your personal information at any time through your dashboard settings. You can also opt-out of marketing communications.',
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0b99ce]/5 rounded-full blur-[80px] -z-10"></div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-blue-50 text-[#0b99ce] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-4xl shadow-xl shadow-blue-900/5 border border-blue-100"
          >
            <FaShieldAlt />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            {t('privacy_main_title', 'Privacy')}{' '}
            <span className="text-[#0b99ce]">
              {t('privacy_main_title_span', 'Policy')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] bg-slate-50 w-fit mx-auto px-4 py-2 rounded-full border border-slate-100 shadow-sm"
          >
            {t('last_updated_label', 'Last Updated')}: {lastUpdated}
          </motion.p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 md:p-14 rounded-[4rem] border border-slate-100 shadow-2xl shadow-blue-900/5 mb-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-[#0b99ce] group-hover:w-3 transition-all duration-500"></div>
          <p className="text-slate-600 leading-relaxed text-lg md:text-xl mb-0 font-medium italic">
            "
            {t(
              'privacy_intro',
              'At ClubSphere, your privacy is our top priority. This policy outlines how we handle your personal information and the steps we take to ensure your data remains secure.',
            )}
            "
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8 mb-20">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5 group hover:border-[#0b99ce]/30 hover:shadow-blue-900/10 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-3xl shrink-0 group-hover:bg-[#0b99ce] group-hover:text-white transition-all duration-500 shadow-inner">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-4 tracking-tight group-hover:text-[#0b99ce] transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed font-medium text-base md:text-lg">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Support Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center bg-slate-900 p-12 md:p-20 rounded-[4rem] border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-[-50%] left-[-10%] w-[400px] h-[400px] bg-[#0b99ce]/10 rounded-full blur-[100px]"></div>
          <h4 className="text-white text-3xl font-black mb-4 tracking-tight relative z-10">
            {t('privacy_footer_q', 'Questions about our privacy?')}
          </h4>
          <p className="text-slate-400 mb-10 text-lg font-medium max-w-md mx-auto relative z-10">
            {t(
              'privacy_footer_desc',
              'If you have any concerns regarding your data, please contact our privacy officer.',
            )}
          </p>
          <button className="px-12 py-5 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-[1.5rem] transition-all duration-500 shadow-2xl shadow-blue-900/30 active:scale-95 uppercase text-xs tracking-widest relative z-10">
            {t('contact_privacy_btn', 'Contact Privacy Team')}
          </button>
        </motion.div>

        {/* Quick Consent Check */}
        <div className="mt-16 flex flex-col items-center gap-6 text-slate-400">
          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
            <FaCheckCircle className="text-emerald-500 text-lg" />{' '}
            {t('gdpr_label', 'GDPR Compliant')}
          </div>
          <p className="text-[10px] text-center max-w-xs font-bold leading-relaxed opacity-60">
            {t(
              'privacy_agreement_footer',
              'By using ClubSphere, you agree to our processing of your data as described in this policy.',
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
