import React from 'react';
import { format } from 'date-fns';
import { bn, enUS } from 'date-fns/locale';
import useEvents from '../../hooks/useEvents';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// React Icons
import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import Container from '../../components/shared/Container';

const UpcomingEvents = () => {
  const { events, isLoading, isError } = useEvents();
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === 'BN' ? bn : enUS;

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-white">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center py-20 bg-white text-red-500 gap-2">
        <BiErrorCircle className="text-4xl" />
        <p className="text-lg font-bold">
          {t('error_load_events', 'Failed to load events!')}
        </p>
      </div>
    );
  }

  // No Events State
  if (events.length === 0) {
    return (
      <div className="text-center py-20 bg-white text-gray-400">
        <p className="text-xl font-black uppercase tracking-widest">
          {t('no_upcoming_events', 'No upcoming events found.')}
        </p>
      </div>
    );
  }

  const UpcomingEventsData = events.slice(0, 6);

  return (
    <section className="w-full py-20 bg-white relative overflow-hidden font-sans">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#0b99ce]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#fe3885]/5 rounded-full blur-3xl pointer-events-none"></div>

      <Container>
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0b99ce] font-black tracking-[0.2em] uppercase text-[10px] bg-[#0b99ce]/10 px-4 py-1.5 rounded-full inline-block"
          >
            {t('event_badge', 'Discover')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-800 mt-4 mb-4 tracking-tight"
          >
            {t('event_title_prefix', 'Upcoming')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b99ce] to-[#fe3885]">
              {t('event_title_suffix', 'Events')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
          >
            {t(
              'event_subtitle',
              'Join our latest gatherings and connect with the community.',
            )}
          </motion.p>
        </div>

        {/* Events Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {UpcomingEventsData.map(event => {
            const eventDate = new Date(event.eventDate);
            const dateDay = format(eventDate, 'dd');

            const dateMonth = format(eventDate, 'MMM', {
              locale: currentLocale,
            });
            const timeFormatted = format(eventDate, 'hh:mm a');

            return (
              <motion.div
                key={event._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-50 flex flex-col h-full"
              >
                {/* Color Stripe Header */}
                <div className="h-2.5 w-full bg-gradient-to-r from-[#0b99ce] to-[#fe3885] group-hover:h-3.5 transition-all duration-300"></div>

                <div className="p-8 flex flex-col h-full">
                  <div className="flex gap-6 mb-6">
                    {/* Date Badge */}
                    <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-3xl w-16 h-20 shrink-0 shadow-inner group-hover:bg-[#0b99ce] transition-colors duration-500">
                      <span className="text-[10px] font-black text-[#fe3885] group-hover:text-blue-100 uppercase tracking-widest">
                        {dateMonth}
                      </span>
                      <span className="text-3xl font-black text-slate-800 group-hover:text-white tracking-tighter">
                        {dateDay}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <div className="overflow-hidden">
                      <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-[#0b99ce] transition-colors mb-2 line-clamp-2 tracking-tight">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        <FaMapMarkerAlt className="text-[#fe3885]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-slate-100 mb-6"></div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3 flex-grow">
                    {event.description}
                  </p>

                  {/* Footer: Time & Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-slate-100">
                      <FaClock className="text-[#0b99ce]" />
                      {timeFormatted}
                    </div>

                    <Link
                      to={`/events/${event._id}`}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-900 text-white group-hover:bg-[#0b99ce] shadow-lg shadow-slate-200 transition-all duration-300 active:scale-90"
                    >
                      <FaArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <div className="mt-20 text-center">
          <Link to="/events">
            <button className="px-10 py-4 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] border-2 border-[#0b99ce] text-[#0b99ce] hover:bg-[#0b99ce] hover:text-white transition-all duration-500 shadow-xl shadow-blue-500/10 active:scale-95">
              {t('browse_events_btn', 'Browse All Events')}
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default UpcomingEvents;
