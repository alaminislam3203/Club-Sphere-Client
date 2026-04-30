import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import {
  FaHistory,
  FaReceipt,
  FaCheckCircle,
  FaCreditCard,
  FaDollarSign,
  FaCalendarCheck,
  FaUsers,
} from 'react-icons/fa';

const PaymentHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['member-payments', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-payments/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading || authLoading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {t('loading_data', 'Fetching Ledger...')}
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans text-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
            <FaHistory className="text-[#0b99ce]" />
            {t('pay_hist_title', 'Payment History')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'pay_hist_subtitle',
              'Comprehensive record of your community investments.',
            )}
          </p>
        </div>

        <div className="bg-white px-8 py-4 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-50 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#0b99ce] rounded-2xl">
            <FaReceipt size={20} />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              {t('total_payments', 'Total Payments')}
            </p>
            <p className="text-xl font-black text-slate-800">
              {payments.length}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">
                  {t('table_col_details', 'Item Details')}
                </th>
                <th className="bg-transparent">
                  {t('table_col_amount', 'Amount')}
                </th>
                <th className="bg-transparent">
                  {t('table_col_type', 'Category')}
                </th>
                <th className="bg-transparent">
                  {t('table_col_date', 'Date')}
                </th>
                <th className="bg-transparent text-right">
                  {t('table_col_status', 'Status')}
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="group transition-all duration-300"
                >
                  {/* Transaction Details  */}
                  <td className="bg-slate-50 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-white text-[#0b99ce] rounded-xl shadow-sm border border-slate-100 font-black text-xs">
                        {payment.paymentType === 'event' ? (
                          <FaCalendarCheck />
                        ) : (
                          <FaUsers />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 tracking-tight text-sm uppercase">
                          {payment.clubName ||
                            payment.eventTitle ||
                            payment.planName ||
                            t('unknown_item', 'Subscription Item')}
                        </p>
                        <p className="text-[9px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-tighter bg-white w-fit px-2 rounded border border-slate-100">
                          TX: {payment.transactionId?.slice(-12) || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <span className="font-black text-slate-800 text-lg flex items-center gap-1">
                      <FaDollarSign size={12} className="text-[#fe3885]" />
                      {parseFloat(
                        payment.price || payment.amount || 0,
                      ).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  {/* Type Badge */}
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm bg-white ${
                        payment.paymentType === 'event'
                          ? 'text-purple-600 border-purple-100'
                          : 'text-[#0b99ce] border-blue-100'
                      }`}
                    >
                      {payment.paymentType === 'event'
                        ? t('type_event', 'Event Ticket')
                        : t('type_membership', 'Membership')}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors text-xs font-bold text-slate-500">
                    {new Date(
                      payment.paidAt || payment.createdAt || payment.date,
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="bg-slate-50 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors text-right">
                    <div className="flex items-center justify-end gap-2 text-emerald-600 font-black text-[9px] uppercase tracking-widest">
                      <FaCheckCircle className="animate-pulse" />
                      <span className="bg-white px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">
                        {t(
                          `status_${payment.status?.toLowerCase()}`,
                          payment.status || 'Success',
                        )}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {payments.length === 0 && (
            <div className="flex flex-col items-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 m-6 mt-0">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-slate-200 shadow-sm">
                <FaCreditCard size={40} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                {t('no_records', 'No financial transactions recorded yet.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
