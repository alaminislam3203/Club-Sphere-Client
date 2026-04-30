import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট
import {
  FaSearch,
  FaChevronDown,
  FaQuestionCircle,
  FaRocket,
  FaUserShield,
  FaCreditCard,
  FaEnvelope,
} from 'react-icons/fa';

const HelpCenter = () => {
  const { t } = useTranslation(); // t ফাংশন ডিক্লেয়ার
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  const categories = [
    {
      icon: <FaRocket />,
      title: t('cat_getting_started', 'Getting Started'),
      color: 'bg-blue-50 text-[#0b99ce]',
    },
    {
      icon: <FaUserShield />,
      title: t('cat_account_safety', 'Account & Safety'),
      color: 'bg-rose-50 text-[#fe3885]',
    },
    {
      icon: <FaCreditCard />,
      title: t('cat_billing_plans', 'Billing & Plans'),
      color: 'bg-emerald-50 text-emerald-500',
    },
  ];

  const faqs = [
    {
      q: t('faq_q1', 'How do I create or join a club?'),
      a: t(
        'faq_a1',
        "To create a club, navigate to your Manager Dashboard. To join one, browse the 'Clubs' page and click 'Join'. Some clubs might require a membership fee.",
      ),
    },
    {
      q: t('faq_q2', 'Can I get a refund for event tickets?'),
      a: t(
        'faq_a2',
        "Refund policies depend on the event organizer. Typically, you can request a refund up to 24 hours before the event starts through your 'My Events' section.",
      ),
    },
    {
      q: t('faq_q3', 'How to upgrade to a Pro plan?'),
      a: t(
        'faq_a3',
        "Go to the 'Pricing' page from the main menu, select the plan that fits your needs, and complete the secure payment through Stripe.",
      ),
    },
    {
      q: t('faq_q4', 'Is my personal data secure?'),
      a: t(
        'faq_a4',
        'Absolutely. We use industry-standard encryption and Firebase Auth to ensure your data and transaction history are always protected.',
      ),
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t('help_title', 'How can we')}{' '}
            <span className="text-[#0b99ce]">
              {t('help_title_span', 'help?')}
            </span>
          </motion.h1>

          {/* Premium Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-10 group">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 text-lg group-focus-within:text-[#0b99ce] transition-colors" />
            <input
              type="text"
              placeholder={t(
                'help_search_placeholder',
                'Search for articles, questions, or topics...',
              )}
              className="w-full p-6 pl-16 rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-700 font-bold"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-xl shadow-blue-900/5 text-center group cursor-pointer"
            >
              <div
                className={`w-20 h-20 ${cat.color} rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3`}
              >
                {cat.icon}
              </div>
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">
                {cat.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#0b99ce]/10"></div>
          <h2 className="text-3xl font-black text-slate-800 mb-12 flex items-center gap-4 tracking-tight">
            <div className="p-3 bg-blue-50 rounded-2xl text-[#0b99ce]">
              <FaQuestionCircle />
            </div>
            {t('faq_section_title', 'Frequently Asked Questions')}
          </h2>

          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`group border rounded-[2rem] transition-all duration-500 ${
                  activeIndex === index
                    ? 'border-[#0b99ce] bg-blue-50/20'
                    : 'border-slate-100 hover:border-blue-200'
                }`}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full p-8 text-left flex justify-between items-center"
                >
                  <span
                    className={`font-black text-lg tracking-tight transition-colors ${
                      activeIndex === index
                        ? 'text-[#0b99ce]'
                        : 'text-slate-700 group-hover:text-[#0b99ce]'
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-[#0b99ce] text-white rotate-180'
                        : 'bg-slate-50 text-slate-300'
                    }`}
                  >
                    <FaChevronDown size={14} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8 text-slate-500 font-bold text-sm leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="mt-20 bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-[#0b99ce]/20 rounded-full blur-[120px] transition-transform group-hover:scale-125 duration-1000"></div>
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-6 tracking-tight">
              {t('help_cta_title', 'Still need help?')}
            </h3>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto text-lg font-medium leading-relaxed">
              {t(
                'help_cta_desc',
                'Our dedicated support team is ready to assist you with any inquiries you might have.',
              )}
            </p>
            <button className="px-12 py-5 bg-[#0b99ce] hover:bg-[#fe3885] text-white font-black rounded-[1.5rem] shadow-2xl shadow-blue-900/40 transition-all duration-500 flex items-center gap-4 mx-auto uppercase text-xs tracking-widest active:scale-95">
              <FaEnvelope className="text-lg" />{' '}
              {t('help_contact_btn', 'Contact Our Team')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpCenter;
