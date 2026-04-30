import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট
import { FaEnvelope, FaHeadset, FaArrowRight, FaDiscord } from 'react-icons/fa';

const ContactSupport = () => {
  const { t } = useTranslation(); // t ফাংশন ডিক্লেয়ার

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-[#0b99ce]" />,
      title: t('contact_email_title', 'Email Us'),
      desc: t(
        'contact_email_desc',
        'Our team typically responds within 2 hours.',
      ),
      value: 'support@clubsphere.com',
      bg: 'bg-blue-50',
    },
    {
      icon: <FaHeadset className="text-[#fe3885]" />,
      title: t('contact_live_title', 'Live Support'),
      desc: t('contact_live_desc', 'Available Monday to Friday, 9am - 6pm.'),
      value: t('contact_live_btn', 'Start a Live Chat'),
      bg: 'bg-rose-50',
    },
    {
      icon: <FaDiscord className="text-indigo-500" />,
      title: t('contact_discord_title', 'Community'),
      desc: t(
        'contact_discord_desc',
        'Join our Discord for instant peer help.',
      ),
      value: t('contact_discord_btn', 'Join Discord Server'),
      bg: 'bg-indigo-50',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0b99ce]/5 rounded-full blur-[80px] -z-10"></div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-2 rounded-full bg-blue-50 text-[#0b99ce] text-[10px] font-black uppercase tracking-[0.3em] border border-blue-100 inline-block"
          >
            {t('contact_badge', 'Get In Touch')}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mt-8 mb-6 tracking-tight leading-tight"
          >
            {t('contact_title', 'How can we')}{' '}
            <span className="text-[#0b99ce]">
              {t('contact_title_span', 'help you')}
            </span>{' '}
            {t('contact_title_end', 'today?')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {t(
              'contact_subtitle',
              'Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.',
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side: Contact Cards */}
          <div className="lg:col-span-1 space-y-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 ${method.bg} rounded-[1.5rem] flex items-center justify-center text-3xl mb-8 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3`}
                >
                  {method.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                  {method.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">
                  {method.desc}
                </p>
                <div className="text-[#0b99ce] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  {method.value} <FaArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-8 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-blue-900/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-[#0b99ce]/10"></div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_full_name', 'Full Name')}
                </label>
                <input
                  type="text"
                  placeholder={t('placeholder_name', 'Enter your full name')}
                  className="w-full p-6 rounded-2xl bg-slate-50 text-slate-700 border border-transparent focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_email', 'Email Address')}
                </label>
                <input
                  type="email"
                  placeholder={t(
                    'placeholder_email',
                    'Enter your email address',
                  )}
                  className="w-full p-6 rounded-2xl bg-slate-50 text-slate-700 border border-transparent focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all font-bold"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_subject', 'Subject')}
                </label>
                <div className="relative group">
                  <select className="w-full p-6 rounded-2xl bg-slate-50 border border-transparent focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all font-black uppercase text-[10px] tracking-widest text-slate-500 appearance-none">
                    <option>{t('opt_general', 'General Inquiry')}</option>
                    <option>{t('opt_tech', 'Technical Issue')}</option>
                    <option>{t('opt_billing', 'Billing & Payments')}</option>
                    <option>{t('opt_bug', 'Bug Report')}</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                    <FaArrowRight className="rotate-90" size={14} />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_message', 'Message')}
                </label>
                <textarea
                  rows="6"
                  placeholder={t('placeholder_message', 'How can we help you?')}
                  className="w-full p-8 rounded-[2.5rem] bg-slate-50 text-slate-700 border border-transparent focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all font-bold resize-none"
                ></textarea>
              </div>

              <div className="md:col-span-2 pt-6">
                <button
                  type="button"
                  className="w-full md:w-auto px-16 py-6 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-2xl shadow-2xl shadow-blue-900/30 transition-all duration-500 active:scale-95 flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em]"
                >
                  {t('btn_send_message', 'Send Message')}{' '}
                  <FaArrowRight size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default ContactSupport;
