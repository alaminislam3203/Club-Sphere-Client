import React from 'react';
import Container from '../../components/shared/Container';
import useClubs from '../../hooks/useClubs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// React Icons
import { FaMapMarkerAlt, FaArrowRight, FaUsers } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi';

const FeaturedClubs = () => {
  const { clubs = [], isLoading, isError } = useClubs();
  const { t } = useTranslation();

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="text-center py-20 bg-gray-50 text-red-500 font-semibold italic">
        {t('error_load_clubs', 'Failed to load clubs. Please try again later.')}
      </div>
    );
  }

  const featuredClubs = clubs.slice(0, 6);

  return (
    <section className="py-24 bg-white relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-100px] w-[500px] h-[500px] bg-[#0b99ce]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-[-100px] w-[500px] h-[500px] bg-[#fe3885]/5 rounded-full blur-[120px]"></div>
      </div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-2"
          >
            <HiSparkles className="text-[#0b99ce]" />
            <span className="text-[10px] font-black text-[#0b99ce] uppercase tracking-[0.2em]">
              {t('top_communities_badge', 'Top Communities')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight"
          >
            {t('featured_title_prefix', 'Featured')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#fe3885]">
              {t('featured_title_suffix', 'Clubs')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            {t(
              'featured_subtitle',
              'Explore the most active and engaging communities tailored for you.',
            )}
          </motion.p>
        </div>

        {/* Clubs Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {featuredClubs.map(club => (
            <motion.div
              key={club._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Wrapper */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                  <BiCategory className="text-[#0b99ce] text-lg" />
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                    {club.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                {/* Floating Location Badge */}
                <div className="absolute -top-7 right-8 bg-white p-3.5 rounded-[1.5rem] shadow-2xl border border-slate-50 group-hover:bg-[#fe3885] text-slate-800 group-hover:text-white transition-all duration-500">
                  <FaMapMarkerAlt className="text-xl " />
                </div>

                <div className="mb-5 mt-2">
                  <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-[#0b99ce] transition-colors line-clamp-1 tracking-tight">
                    {club.clubName}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fe3885]"></span>
                    <span className="truncate">{club.location}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3 flex-grow pl-4 border-l-2 border-slate-100 group-hover:border-[#0b99ce] transition-colors">
                  {club.description}
                </p>

                {/* Footer Action */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px] font-black uppercase tracking-[0.1em]">
                    <FaUsers className="text-lg text-[#0b99ce]" />
                    <span>{t('active_members_label', 'Active Members')}</span>
                  </div>

                  <Link
                    to={`/clubs/${club._id}`}
                    className="inline-flex items-center gap-2 text-[#0b99ce] font-black uppercase text-[10px] tracking-widest group/btn"
                  >
                    {t('view_details_btn', 'View Details')}
                    <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <Link to="/clubs">
            <button className="px-12 py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] text-white bg-slate-900 hover:bg-[#0b99ce] shadow-2xl shadow-slate-200 transition-all duration-500 transform hover:-translate-y-2 active:scale-95">
              {t('browse_all_clubs_btn', 'Browse All Clubs')}
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedClubs;
