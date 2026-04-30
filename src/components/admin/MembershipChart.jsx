import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MembershipChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['memberships-per-club'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-overview');

      return res.data.membershipsPerClub;
    },
  });

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p className="text-red-600">Failed to load chart</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Memberships per Club</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="clubName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="memberships" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MembershipChart;
