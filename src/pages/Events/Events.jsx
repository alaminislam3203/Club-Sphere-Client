import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useEvents from '../../hooks/useEvents';
import EventsCard from './EventsCard';
import Container from '../../components/shared/Container';

// React Icons
import {
  FaSearch,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaFilter,
  FaUndo,
  FaDollarSign,
  FaSortAmountDown,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

export default function Events() {
  const { events = [], isLoading, isError } = useEvents();
  const { t } = useTranslation();

  // Filter States
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [eventFee, setEventFee] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Mobile Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Clear Filters Function
  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setMaxAttendees('');
    setEventDate('');
    setCreatedAt('');
    setEventFee('');
    setCurrentPage(1);
  };

  // Filters Apply Logic
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (search && !event.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (
        location &&
        !event.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (eventFee === 'free' && event.isPaid) return false;
      if (eventFee === 'paid' && !event.isPaid) return false;
      if (maxAttendees && event.maxAttendees < parseInt(maxAttendees))
        return false;
      if (eventDate && new Date(event.eventDate) < new Date(eventDate))
        return false;
      if (createdAt && new Date(event.createdAt) < new Date(createdAt))
        return false;
      return true;
    });
  }, [events, search, location, maxAttendees, eventDate, createdAt, eventFee]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / cardsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage,
  );

  const handlePageChange = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const maxButtons = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex justify-center items-center bg-white text-red-500 font-bold">
        {t('error_load_events', 'Failed to load events. Please refresh.')}
      </div>
    );

  return (
    <section className="bg-white min-h-screen pt-10 pb-20 relative font-sans text-black">
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-blue-50/30 rounded-bl-full blur-3xl pointer-events-none -z-0"></div>

      <Container>
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
            {t('discover_title_prefix', 'Discover')}{' '}
            <span className="text-[#0b99ce]">
              {t('discover_title_suffix', 'Events')}
            </span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            {t(
              'discover_subtitle',
              'Join workshops, meetups, and local gatherings happening around you.',
            )}
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <span className="font-black text-xs uppercase tracking-widest text-slate-400">
            {t('filter_events_label', 'Filter Events')}
          </span>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="btn btn-sm bg-[#0b99ce] hover:bg-slate-800 text-white border-none rounded-xl gap-2 font-black uppercase text-[10px] tracking-widest"
          >
            <FaFilter /> {t('filters_btn', 'Filters')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
          {/* SIDEBAR FILTERS */}
          <aside
            className={`lg:w-1/4 lg:block lg:sticky lg:top-24 ${
              isFilterOpen
                ? 'fixed inset-0 bg-black/40 backdrop-blur-sm z-50'
                : 'hidden'
            }`}
          >
            <div
              className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl lg:shadow-blue-900/5 h-full lg:h-auto overflow-y-auto lg:overflow-visible ${
                isFilterOpen
                  ? 'fixed top-0 left-0 w-80 z-50 animate-in slide-in-from-left duration-300'
                  : ''
              }`}
            >
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-5">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  {t('filter_options_title', 'Filter Options')}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-black uppercase tracking-widest text-[#fe3885] hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 border border-rose-100"
                >
                  <FaUndo size={10} /> {t('reset_btn', 'Reset')}
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_search', 'Search')}
                  </label>
                  <div className="relative group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
                    <input
                      type="text"
                      placeholder={t(
                        'placeholder_event_title',
                        'Event title...',
                      )}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-[#0b99ce] outline-none text-sm font-bold text-slate-700 transition-all"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_location', 'Location')}
                  </label>
                  <div className="relative group">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
                    <input
                      type="text"
                      placeholder={t('placeholder_city_venue', 'City or Venue')}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-[#0b99ce] outline-none text-sm font-bold text-slate-700 transition-all"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_price', 'Price')}
                  </label>
                  <div className="relative group">
                    <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
                    <select
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-[#0b99ce] outline-none text-sm font-bold text-slate-700 transition-all appearance-none"
                      value={eventFee}
                      onChange={e => setEventFee(e.target.value)}
                    >
                      <option value="">{t('all_prices', 'All Prices')}</option>
                      <option value="free">{t('fee_free', 'Free')}</option>
                      <option value="paid">{t('fee_paid', 'Paid')}</option>
                    </select>
                  </div>
                </div>

                {/* Event Date Filter */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_event_date', 'Event Date')}
                  </label>
                  <div className="relative group">
                    <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-[#0b99ce] outline-none text-sm font-bold text-slate-700 transition-all"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                    />
                  </div>
                </div>

                {isFilterOpen && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="btn w-full h-14 bg-slate-900 text-white border-none rounded-2xl font-black uppercase text-xs tracking-widest mt-6"
                  >
                    {t('apply_filters_btn', 'Apply Filters')}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="lg:w-3/4 w-full">
            <div className="mb-8 flex justify-between items-center bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-tighter">
                {t('found_label', 'Found')}{' '}
                <span className="text-[#0b99ce] text-xl font-black mx-1">
                  {filteredEvents.length}
                </span>{' '}
                {t('events_label', 'events')}
              </p>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden sm:block">
                {t('sort_label', 'Sort by: Newest First')}
              </span>
            </div>

            {paginatedEvents.length === 0 ? (
              <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-inner">
                  <FaSearch size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  {t('no_events_match', 'No events match your criteria')}
                </h3>
                <p className="text-slate-400 font-medium mt-2">
                  {t(
                    'no_events_subtitle',
                    'Try clearing filters or searching for something else.',
                  )}
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-8 btn h-12 px-8 bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#0b99ce] hover:text-white hover:border-[#0b99ce] rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                >
                  {t('clear_all_btn', 'Clear All Filters')}
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedEvents.map(event => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={event._id}
                  >
                    <EventsCard event={event} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-20 gap-4">
                <button
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-[#0b99ce] hover:bg-[#0b99ce] hover:text-white transition-all shadow-lg shadow-blue-900/5 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ❮
                </button>
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    className={`w-12 h-12 rounded-2xl font-black transition-all shadow-lg ${
                      page === currentPage
                        ? 'bg-[#0b99ce] text-white shadow-blue-200'
                        : 'bg-white border border-slate-100 text-slate-400 hover:text-[#0b99ce]'
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-[#0b99ce] hover:bg-[#0b99ce] hover:text-white transition-all shadow-lg shadow-blue-900/5 disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  ❯
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
