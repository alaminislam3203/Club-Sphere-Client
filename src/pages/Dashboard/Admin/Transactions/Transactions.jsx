import React, { useState } from 'react';
import usePayments from '../../../../hooks/usePayments';
import useAuth from '../../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
  FaWallet,
  FaExchangeAlt,
  FaSearch,
  FaFilter,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaCalendarAlt,
  FaDollarSign,
} from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';

const Transactions = () => {
  const { payments = [], isLoading, isError } = usePayments();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <span className="loading loading-ring loading-lg text-[#0b99ce]"></span>
        <p className="text-slate-400 animate-pulse font-bold uppercase text-xs tracking-widest">
          {t('syncing_msg', 'Syncing transactions...')}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 bg-red-50 rounded-[3rem] border border-red-100 m-4 shadow-inner">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FaExchangeAlt className="text-red-400 text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-red-600 tracking-tight">
          {t('error_finance_title', 'Failed to load financial records.')}
        </h2>
        <p className="text-red-400 font-medium mt-2">
          {t(
            'error_finance_desc',
            'Please check your connection or try again.',
          )}
        </p>
      </div>
    );
  }

  // --- Stats Calculation ---
  const totalRevenue = payments.reduce(
    (acc, curr) => acc + (Number(curr?.amount) || 0),
    0,
  );
  const clubIncome = payments
    .filter(p => p?.paymentType === 'club-membership')
    .reduce((acc, curr) => acc + (Number(curr?.amount) || 0), 0);
  const eventIncome = payments
    .filter(p => p?.paymentType === 'event')
    .reduce((acc, curr) => acc + (Number(curr?.amount) || 0), 0);

  // --- Filter and Search Logic ---
  const filteredPayments = payments.filter(item => {
    const matchesFilter = filter === 'all' || item?.paymentType === filter;
    const email = item?.userEmail?.toLowerCase() || '';
    const title = item?.eventTitle?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    return matchesFilter && (email.includes(search) || title.includes(search));
  });

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <FaFileInvoiceDollar className="text-[#0b99ce]" />{' '}
            {t('finance_title', 'Financial Ledger')}
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'finance_subtitle',
              'Monitoring all community transactions and earnings.',
            )}
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-50 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {t('live_updates', 'Live Updates Enabled')}
          </span>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-gradient-to-br from-[#0b99ce] to-[#fe3885] p-8 rounded-[2.5rem] shadow-2xl shadow-blue-200 text-white relative overflow-hidden group">
          <FaWallet className="absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-110 transition-transform duration-500" />
          <p className="text-white/80 uppercase tracking-[0.2em] text-[10px] font-black mb-2">
            {t('stats_total_revenue', 'Total Revenue')}
          </p>
          <h3 className="text-4xl font-black tracking-tighter">
            ${totalRevenue.toLocaleString()}
          </h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all">
              <MdOutlineCategory className="text-2xl" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 bg-purple-50 px-3 py-1.5 rounded-lg">
              {t('label_club_assets', 'Club Assets')}
            </span>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
            {t('type_club', 'Club Memberships')}
          </p>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">
            ${clubIncome.toLocaleString()}
          </h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 group hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
              <FaCalendarAlt className="text-2xl" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-50 px-3 py-1.5 rounded-lg">
              {t('label_event_earnings', 'Event Earnings')}
            </span>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
            {t('type_event', 'Event Registrations')}
          </p>
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">
            ${eventIncome.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-50 mb-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="relative w-full lg:w-96 group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
          <input
            type="text"
            placeholder={t(
              'search_placeholder_finance',
              'Search email or title...',
            )}
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100 w-full">
            <FaFilter className="text-[#0b99ce]" />
            <select
              className="bg-transparent font-black uppercase text-[10px] tracking-widest text-slate-500 outline-none w-full"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">{t('role_all', 'All Types')}</option>
              <option value="club-membership">
                {t('type_club_short', 'Club Membership')}
              </option>
              <option value="event">
                {t('type_event_short', 'Event Registration')}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* --- TRANSACTIONS TABLE --- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">#</th>
                <th className="bg-transparent">
                  {t('table_col_payer', 'Payer Info')}
                </th>
                <th className="bg-transparent text-center">
                  {t('table_col_amount', 'Amount')}
                </th>
                <th className="bg-transparent text-center">
                  {t('table_col_category', 'Category')}
                </th>
                <th className="bg-transparent">
                  {t('table_col_allocation', 'Allocation')}
                </th>
                <th className="bg-transparent">
                  {t('table_col_date', 'Date')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((item, index) => (
                <tr
                  key={item?._id || index}
                  className="group transition-all duration-300"
                >
                  <td className="bg-slate-50 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 font-black text-slate-300">
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="avatar ring-4 ring-white shadow-md rounded-xl overflow-hidden">
                        <div className="h-10 w-10">
                          <img
                            src={
                              item?.photoURL ||
                              'https://i.ibb.co.com/wNsV12M3/user.png'
                            }
                            alt="User"
                          />
                        </div>
                      </div>
                      <span className="font-bold text-sm text-slate-700">
                        {item?.userEmail}
                      </span>
                    </div>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 text-center group-hover:bg-blue-50/50 transition-colors">
                    <span className="text-lg font-black text-slate-800">
                      <FaDollarSign className="inline text-xs mb-1" />
                      {Number(item?.amount || 0).toFixed(2)}
                    </span>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 text-center group-hover:bg-blue-50/50 transition-colors">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        item?.paymentType === 'event'
                          ? 'bg-white text-purple-600 border border-purple-100'
                          : 'bg-white text-[#0b99ce] border border-blue-100'
                      }`}
                    >
                      {t(
                        `type_${item?.paymentType?.replace('-', '_')}`,
                        item?.paymentType || 'General',
                      )}
                    </span>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <p className="font-bold text-slate-500 text-sm truncate max-w-[180px]">
                      {item?.eventTitle ||
                        item?.clubName ||
                        t('club_access', 'Membership Access')}
                    </p>
                  </td>
                  <td className="bg-slate-50 py-5 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <p className="text-xs font-bold text-slate-400">
                      {item?.createdAt || item?.paidAt
                        ? new Date(
                            item?.createdAt || item?.paidAt,
                          ).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div className="flex flex-col items-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 m-6 mt-0">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-slate-200">
                <FaExchangeAlt size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                {t('no_records_match', 'No Matching Records Found')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
