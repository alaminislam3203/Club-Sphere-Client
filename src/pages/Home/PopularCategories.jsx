import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Container from '../../components/shared/Container';

// React Icons (Premium Icons)
import {
  FaCamera,
  FaBookOpen,
  FaHiking,
  FaLaptopCode,
  FaMusic,
  FaHeartbeat,
  FaUsers,
  FaPlaneDeparture,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const PopularCategories = () => {
  const { t } = useTranslation();
  const categories = [
    {
      id: 1,
      name: t('cat_photo_name', 'Photography'),
      description: t('cat_photo_desc', 'Capture stunning moments.'),
      icon: <FaCamera />,
      color: 'from-blue-400 to-blue-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      id: 2,
      name: t('cat_book_name', 'Book Clubs'),
      description: t('cat_book_desc', 'Expand literary horizons.'),
      icon: <FaBookOpen />,
      color: 'from-emerald-400 to-emerald-600',
      shadow: 'shadow-emerald-500/20',
    },
    {
      id: 3,
      name: t('cat_hiking_name', 'Hiking & Adventure'),
      description: t('cat_hiking_desc', 'Explore the outdoors.'),
      icon: <FaHiking />,
      color: 'from-orange-400 to-orange-600',
      shadow: 'shadow-orange-500/20',
    },
    {
      id: 4,
      name: t('cat_tech_name', 'Tech & Coding'),
      description: t('cat_tech_desc', 'Innovate with tech clubs.'),
      icon: <FaLaptopCode />,
      color: 'from-purple-400 to-purple-600',
      shadow: 'shadow-purple-500/20',
    },
    {
      id: 5,
      name: t('cat_music_name', 'Music & Arts'),
      description: t('cat_music_desc', 'Express through art.'),
      icon: <FaMusic />,
      color: 'from-pink-400 to-pink-600',
      shadow: 'shadow-pink-500/20',
    },
    {
      id: 6,
      name: t('cat_health_name', 'Health & Fitness'),
      description: t('cat_health_desc', 'Stay fit and motivated.'),
      icon: <FaHeartbeat />,
      color: 'from-red-400 to-red-600',
      shadow: 'shadow-red-500/20',
    },
    {
      id: 7,
      name: t('cat_social_name', 'Social & Networking'),
      description: t('cat_social_desc', 'Meet interesting people.'),
      icon: <FaUsers />,
      color: 'from-cyan-400 to-cyan-600',
      shadow: 'shadow-cyan-500/20',
    },
    {
      id: 8,
      name: t('cat_travel_name', 'Travel & Culture'),
      description: t('cat_travel_desc', 'Discover new places.'),
      icon: <FaPlaneDeparture />,
      color: 'from-indigo-400 to-indigo-600',
      shadow: 'shadow-indigo-500/20',
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-72 h-72 bg-[#0b99ce]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 bg-[#fe3885]/5 rounded-full blur-3xl"></div>
      </div>

      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#fe3885] font-black tracking-widest uppercase text-[10px] bg-[#fe3885]/10 px-4 py-1.5 rounded-full inline-block"
          >
            {t('cat_badge', 'Interests')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight"
          >
            {t('cat_title_prefix', 'Explore')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#0ea5e9]">
              {t('cat_title_suffix', 'Categories')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-xl mx-auto font-medium"
          >
            {t(
              'cat_subtitle',
              'Find the perfect community that aligns with your passion and hobbies.',
            )}
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {categories.map(category => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group relative p-6 bg-white rounded-[2rem] border border-slate-50 hover:border-transparent transition-all duration-300"
            >
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${category.color} rounded-[2rem] blur-2xl transition-opacity duration-500 -z-10`}
              ></div>

              {/* Card Content */}
              <div className="relative h-full bg-white rounded-3xl p-8 shadow-sm group-hover:shadow-none ring-1 ring-slate-100 group-hover:ring-0 transition-all duration-300 flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl text-white bg-gradient-to-br ${category.color} ${category.shadow} group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>

                <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-[#0b99ce] transition-colors tracking-tight">
                  {category.name}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {category.description}
                </p>

                {/* Bottom Line Animation */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-gradient-to-r ${category.color} rounded-t-full transition-all duration-300 group-hover:w-1/2`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default PopularCategories;
