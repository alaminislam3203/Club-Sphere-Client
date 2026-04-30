import React from 'react';
import {
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaCommentDots,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import Container from './Container';

export default function SendMessage() {
  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Message Sent!');

    Swal.fire({
      title: t('contact_success_title', 'Success!'),
      text: t(
        'contact_success_msg',
        'Your message has been successfully sent!',
      ),
      icon: 'success',
      confirmButtonColor: '#0b99ce',
    });

    e.target.reset();
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-[#0b99ce]"
        >
          <div className="text-center mb-10">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl font-black text-slate-800 mb-2 flex items-center justify-center gap-3 tracking-tight"
            >
              <FaPaperPlane className="text-[#fe3885]" />
              {t('contact_title', 'Contact Us')}
            </motion.h1>
            <p className="text-slate-500 font-medium">
              {t(
                'contact_subtitle',
                'We are ready to hear from you. Let us know your questions, feedback, or inquiries.',
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label
                htmlFor="name"
                className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2 ml-2"
              >
                {t('contact_label_name', 'Your Name')}
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0b99ce]" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t('contact_placeholder_name', 'Full Name')}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition duration-300 font-bold text-slate-700 outline-none"
                />
              </div>
            </motion.div>

            {/* Email Input Section */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="email"
                className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2 ml-2"
              >
                {t('contact_label_email', 'Email')}
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0b99ce]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={t(
                    'contact_placeholder_email',
                    'Your Email Address',
                  )}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition duration-300 font-bold text-slate-700 outline-none"
                />
              </div>
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="message"
                className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2 ml-2"
              >
                {t('contact_label_msg', 'Your Message')}
              </label>
              <div className="relative">
                <FaCommentDots className="absolute left-4 top-5 text-[#0b99ce]" />
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder={t(
                    'contact_placeholder_msg',
                    'Write your message here...',
                  )}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white transition duration-300 font-bold text-slate-700 outline-none resize-none"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-5 font-black text-lg text-white bg-[#0b99ce] hover:bg-[#fe3885] rounded-2xl shadow-xl shadow-blue-200 hover:shadow-pink-200 transition duration-300"
            >
              <FaPaperPlane />
              {t('contact_btn_send', 'Send Message')}
            </motion.button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
