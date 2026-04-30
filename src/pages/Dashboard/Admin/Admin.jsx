import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
  FaUsers,
  FaShieldAlt,
  FaCalendarCheck,
  FaCreditCard,
  FaUserCheck,
  FaChartLine,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const Admin = () => {
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  const chartData = stats?.membershipsPerClub || [
    { name: t('cat_photo_name', 'Photography'), count: 400 },
    { name: t('cat_tech_name', 'Tech'), count: 300 },
    { name: 'Sports', count: 200 },
    { name: 'Books', count: 278 },
  ];

  const COLORS = ['#0b99ce', '#fe3885', '#10b981', '#facc15', '#8b5cf6'];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
          <FaChartLine className="text-[#0b99ce]" />{' '}
          {t('admin_insights_title', 'Admin Insights')}
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          {t(
            'admin_insights_subtitle',
            'Real-time overview of your community ecosystem.',
          )}
        </p>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 flex items-center gap-5 group hover:scale-[1.03] transition-all duration-300">
          <div className="p-4 bg-blue-50 text-[#0b99ce] rounded-2xl group-hover:bg-[#0b99ce] group-hover:text-white transition-all">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {t('stats_total_users', 'Total Users')}
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {stats?.totalUsers || 0}
            </h3>
          </div>
        </div>

        {/* Total Memberships */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-slate-50 flex items-center gap-5 group hover:scale-[1.03] transition-all duration-300">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <FaUserCheck className="text-3xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {t('stats_memberships', 'Memberships')}
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {stats?.totalMemberships || 0}
            </h3>
          </div>
        </div>

        {/* Total Events */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-purple-900/5 border border-slate-50 flex items-center gap-5 group hover:scale-[1.03] transition-all duration-300">
          <div className="p-4 bg-purple-50 text-purple-500 rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all">
            <FaCalendarCheck className="text-3xl" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {t('stats_total_events', 'Total Events')}
            </p>
            <h3 className="text-3xl font-black text-slate-800">
              {stats?.totalEvents || 0}
            </h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-[#0b99ce] to-[#fe3885] p-6 rounded-[2.5rem] shadow-2xl shadow-blue-200 text-white flex items-center gap-5 group transform hover:scale-[1.05] transition-all">
          <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
            <FaCreditCard className="text-3xl" />
          </div>
          <div>
            <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
              {t('stats_revenue', 'Revenue')}
            </p>
            <h3 className="text-3xl font-black">
              ${stats?.totalRevenue?.toLocaleString() || 0}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* --- CLUB STATUS BREAKDOWN (PIE CHART) --- */}
        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-50">
          <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-2 tracking-tight">
            <FaShieldAlt className="text-[#fe3885]" />{' '}
            {t('chart_club_status', 'Club Status')}
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    {
                      name: t('status_approved', 'Approved'),
                      value: stats?.clubsByStatus?.approved || 0,
                    },
                    {
                      name: t('status_pending', 'Pending'),
                      value: stats?.clubsByStatus?.pending || 0,
                    },
                    {
                      name: t('status_rejected', 'Rejected'),
                      value: stats?.clubsByStatus?.rejected || 0,
                    },
                  ]}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {COLORS.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    fontWeight: 'bold',
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- MEMBERSHIP PER CLUB (BAR CHART) --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-50">
          <h3 className="text-xl font-black text-slate-800 mb-8 tracking-tight">
            {t('chart_membership_cat', 'Memberships Per Category')}
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={45}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
