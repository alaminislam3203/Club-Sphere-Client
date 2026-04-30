import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useClubs from '../../hooks/useClubs';
import ClubsCard from './ClubsCard';
import Container from '../../components/shared/Container';

// React Icons
import {
  FaFilter,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaUndo,
  FaSearch,
} from 'react-icons/fa';

const Clubs = () => {
  const { clubs = [], isLoading, isError } = useClubs();
  const { t } = useTranslation();

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [membershipFee, setMembershipFee] = useState('');
  const [minMembers, setMinMembers] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // Mobile Filter Drawer State
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Clear Filters Function
  const clearFilters = () => {
    setSearchTerm('');
    setCategory('');
    setLocation('');
    setMembershipFee('');
    setMinMembers('');
    setCurrentPage(1);
  };

  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      if (club.status !== 'approved') return false;

      if (
        searchTerm &&
        !club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      if (category && club.category !== category) return false;

      if (
        location &&
        !club.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;

      if (membershipFee === 'free' && club.membershipFee !== 0) return false;
      if (membershipFee === 'paid' && club.membershipFee === 0) return false;

      if (minMembers && club.membersCount < parseInt(minMembers)) return false;

      return true;
    });
  }, [clubs, searchTerm, category, location, membershipFee, minMembers]);

  const categories = [
    ...new Set(clubs.filter(c => c.status === 'approved').map(c => c.category)),
  ];

  // Pagination Logic
  const totalPages = Math.ceil(filteredClubs.length / cardsPerPage);
  const paginatedClubs = filteredClubs.slice(
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

  return (
    <section className="bg-white min-h-screen pt-10 pb-20 relative font-sans text-black">
      <div className="absolute top-0 right-0 w-1/2 h-96 bg-blue-50/30 rounded-bl-full blur-3xl pointer-events-none -z-0"></div>

      <Container>
        {/* Header */}
        <div className="text-center mb-10 space-y-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight">
            {t('explore_title_prefix', 'Explore')}{' '}
            <span className="text-[#0b99ce]">
              {t('explore_title_suffix', 'Clubs')}
            </span>
          </h1>
        </div>

        {/* Search Section */}
        <div className="max-w-3xl mx-auto mb-16 relative z-10 px-4">
          <div className="relative group shadow-2xl shadow-blue-900/10 rounded-[2rem]">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors text-xl" />
            <input
              type="text"
              placeholder={t('search_placeholder', 'Search clubs by name...')}
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] outline-none text-lg font-bold text-slate-700 focus:ring-4 focus:ring-blue-50 transition-all"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden mb-6 flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <span className="font-black text-xs uppercase tracking-widest text-slate-400">
            {t('filter_clubs_label', 'Filter Options')}
          </span>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="btn btn-sm bg-[#0b99ce] text-white border-none rounded-xl gap-2 font-black uppercase text-[10px]"
          >
            <FaFilter /> {t('filters_btn', 'Filters')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
          <aside
            className={`lg:w-1/4 lg:block lg:sticky lg:top-24 ${
              isFilterOpen
                ? 'fixed inset-0 bg-black/40 backdrop-blur-sm z-50'
                : 'hidden'
            }`}
          >
            <div
              className={`bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl h-full lg:h-auto overflow-y-auto ${
                isFilterOpen ? 'fixed top-0 left-0 w-80' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-5">
                <h3 className="text-xl font-black text-slate-800">
                  {t('filter_options_title', 'Filter Options')}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-[10px] font-black uppercase text-[#fe3885] flex items-center gap-1.5"
                >
                  <FaUndo size={10} /> {t('reset_btn', 'Reset')}
                </button>
              </div>

              <div className="space-y-6">
                <FilterSelect
                  label={t('label_category', 'Category')}
                  icon={<FaLayerGroup />}
                  value={category}
                  onChange={setCategory}
                  options={categories}
                  defaultLabel={t('all_categories', 'All Categories')}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_location', 'Location')}
                  </label>
                  <div className="relative group">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce]" />
                    <input
                      type="text"
                      placeholder={t('placeholder_city', 'Enter city')}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold text-slate-700 focus:bg-white transition-all"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <FilterSelect
                  label={t('label_fee_type', 'Membership Fee')}
                  icon={<FaDollarSign />}
                  value={membershipFee}
                  onChange={setMembershipFee}
                  options={[
                    { val: 'free', lbl: t('fee_free', 'Free') },
                    { val: 'paid', lbl: t('fee_paid', 'Paid') },
                  ]}
                  defaultLabel={t('all_types', 'All Types')}
                  isObject
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                    {t('label_min_members', 'Min Members')}
                  </label>
                  <div className="relative group">
                    <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce]" />
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold text-slate-700 focus:bg-white transition-all"
                      value={minMembers}
                      onChange={e => setMinMembers(e.target.value)}
                    />
                  </div>
                </div>

                {isFilterOpen && (
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="btn w-full bg-slate-900 text-white rounded-2xl font-black mt-6"
                  >
                    {t('apply_filters_btn', 'Apply Filters')}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:w-3/4 w-full">
            <div className="mb-8 flex justify-between items-center bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-tighter">
                {t('found_label', 'Found')}{' '}
                <span className="text-[#0b99ce] text-xl font-black mx-1">
                  {filteredClubs.length}
                </span>{' '}
                {t('clubs_label', 'clubs')}
              </p>
            </div>

            {paginatedClubs.length === 0 ? (
              <EmptyState t={t} clearFilters={clearFilters} />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedClubs.map(club => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={club._id}
                  >
                    <ClubsCard club={club} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                getPageNumbers={getPageNumbers}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

const FilterSelect = ({
  label,
  icon,
  value,
  onChange,
  options,
  defaultLabel,
  isObject,
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors">
        {icon}
      </div>
      <select
        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white outline-none text-sm font-bold text-slate-700 appearance-none"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">{defaultLabel}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={isObject ? opt.val : opt}>
            {isObject ? opt.lbl : opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const EmptyState = ({ t, clearFilters }) => (
  <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-slate-200">
    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 shadow-inner">
      <FaSearch size={40} />
    </div>
    <h3 className="text-2xl font-black text-slate-800 tracking-tight">
      {t('no_clubs_match', 'No clubs match your criteria')}
    </h3>
    <button
      onClick={clearFilters}
      className="mt-8 btn h-12 px-8 bg-[#0b99ce] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
    >
      {t('clear_all_btn', 'Clear All Filters')}
    </button>
  </div>
);

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  getPageNumbers,
}) => (
  <div className="flex justify-center mt-20 gap-4">
    <button
      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-[#0b99ce] disabled:opacity-30"
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ❮
    </button>
    {getPageNumbers().map(page => (
      <button
        key={page}
        className={`w-12 h-12 rounded-2xl font-black transition-all ${
          page === currentPage
            ? 'bg-[#0b99ce] text-white'
            : 'bg-white text-slate-400 hover:text-[#0b99ce]'
        }`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    ))}
    <button
      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-[#0b99ce] disabled:opacity-30"
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      ❯
    </button>
  </div>
);

export default Clubs;
