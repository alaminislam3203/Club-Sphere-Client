import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';

// React Icons
import {
  FaUserFriends,
  FaLightbulb,
  FaCrown,
  FaRunning,
  FaArrowRight,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const WhyJoinClub = () => {
  const { t } = useTranslation();
  const whyJoinData = [
    {
      id: 1,
      title: t('benefit_1_title', 'Meet Like-Minded People'),
      description: t(
        'benefit_1_desc',
        'Connect with people who share your interests and passions. Build friendships and network effortlessly.',
      ),
      icon: <FaUserFriends />,
      color: 'from-blue-500 to-cyan-400',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      id: 2,
      title: t('benefit_2_title', 'Learn & Grow'),
      description: t(
        'benefit_2_desc',
        'Participate in workshops, discussions, and events to expand your knowledge and skills.',
      ),
      icon: <FaLightbulb />,
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
    },
    {
      id: 3,
      title: t('benefit_3_title', 'Exclusive Access'),
      description: t(
        'benefit_3_desc',
        'Get special perks, early access to events, and member-only content curated for you.',
      ),
      icon: <FaCrown />,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
    },
    {
      id: 4,
      title: t('benefit_4_title', 'Stay Active & Engaged'),
      description: t(
        'benefit_4_desc',
        'Engage in exciting activities and community events that keep you motivated and inspired.',
      ),
      icon: <FaRunning />,
      color: 'from-green-400 to-emerald-600',
      bg: 'bg-green-50',
      text: 'text-green-600',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Subtle Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-4"
          >
            <HiSparkles className="text-[#fe3885]" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              {t('benefits_badge', 'Benefits')}
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('why_join_title', 'Why Join')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#fe3885]">
              ClubSphere?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg font-medium"
          >
            {t(
              'why_join_subtitle',
              'Unlock a world of opportunities, connections, and experiences designed just for you.',
            )}
          </motion.p>
        </div>

        {/* Grid Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          {whyJoinData.map(item => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group relative bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className={`text-3xl ${item.text} drop-shadow-sm`}>
                  {item.icon}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-[#0b99ce] transition-colors tracking-tight">
                {item.title}
              </h3>

              <p className="text-slate-500 leading-relaxed text-sm mb-6 font-medium">
                {item.description}
              </p>

              <div
                className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${item.color} group-hover:w-full transition-all duration-500`}
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            to="/register"
            className="inline-flex items-center gap-2 font-black text-[#0b99ce] border-b-2 border-[#0b99ce] hover:text-[#fe3885] hover:border-[#fe3885] transition-all pb-1 text-lg uppercase tracking-tighter"
          >
            {t('start_journey_btn', 'Start Your Journey')} <FaArrowRight />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyJoinClub;
