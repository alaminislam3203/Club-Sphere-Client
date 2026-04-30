import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';

// React Icons
import {
  FaSearchLocation,
  FaUserPlus,
  FaCalendarCheck,
  FaUserShield,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const HowClubSphereWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      id: 1,
      step: '01',
      title: t('step_1_title', 'Discover Local Clubs'),
      desc: t(
        'step_1_desc',
        'Browse photography, hiking, tech, book, and other community clubs near you effortlessly.',
      ),
      icon: <FaSearchLocation />,
      color: 'bg-blue-100 text-blue-600',
      border: 'group-hover:border-blue-500',
    },
    {
      id: 2,
      step: '02',
      title: t('step_2_title', 'Join Clubs Easily'),
      desc: t(
        'step_2_desc',
        'Complete your profile, choose your interests, and become a member of communities instantly.',
      ),
      icon: <FaUserPlus />,
      color: 'bg-pink-100 text-pink-600',
      border: 'group-hover:border-pink-500',
    },
    {
      id: 3,
      step: '03',
      title: t('step_3_title', 'Attend Events'),
      desc: t(
        'step_3_desc',
        'Register for exclusive club events, workshops, meetups, and training sessions tailored for you.',
      ),
      icon: <FaCalendarCheck />,
      color: 'bg-purple-100 text-purple-600',
      border: 'group-hover:border-purple-500',
    },
    {
      id: 4,
      step: '04',
      title: t('step_4_title', 'Safe & Managed'),
      desc: t(
        'step_4_desc',
        'Enjoy a secure platform with admin oversight ensuring a smooth and safe experience for everyone.',
      ),
      icon: <FaUserShield />,
      color: 'bg-emerald-100 text-emerald-600',
      border: 'group-hover:border-emerald-500',
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gray-50 border border-gray-200 shadow-sm mb-4"
          >
            <HiSparkles className="text-[#0b99ce]" />
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              {t('how_works_badge', 'Simple Process')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-800"
          >
            {t('how_works_title_prefix', 'How It')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#fe3885]">
              {t('how_works_title_suffix', 'Works')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg font-medium"
          >
            {t(
              'how_works_subtitle',
              "Join the community in four simple steps. It's easier than you think.",
            )}
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {steps.map(step => (
              <motion.div
                key={step.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative bg-white p-6 pt-0 text-center rounded-2xl transition-all duration-300"
              >
                {/* Step Icon Wrapper */}
                <div className="relative inline-block mb-6">
                  <div
                    className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center text-3xl shadow-lg ring-8 ring-white z-10 relative transition-transform duration-300 group-hover:scale-110`}
                  >
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-0 bg-slate-900 text-white text-xs font-black px-2 py-1 rounded-lg shadow-md border-2 border-white uppercase tracking-tighter">
                    {t('step_label', 'Step')} {step.step}
                  </div>
                </div>

                {/* Card Content */}
                <div
                  className={`p-6 rounded-[2rem] border border-slate-50 bg-white shadow-sm hover:shadow-2xl transition-all duration-300 border-t-4 ${step.border} group-hover:-translate-y-2`}
                >
                  <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-[#0b99ce] transition-colors tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                <div className="lg:hidden absolute left-1/2 bottom-[-32px] w-0.5 h-8 bg-slate-100 last:hidden -translate-x-1/2"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HowClubSphereWorks;
