import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
} from 'react-icons/fa';
import { MdOutlineCardMembership } from 'react-icons/md';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const MyClubsMember = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();
  const { data: myClubs = [], isLoading } = useQuery({
    queryKey: ['my-memberships', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/my-clubs?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#0b99ce]"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
          <MdOutlineCardMembership className="text-[#0b99ce]" />{' '}
          {t('my_clubs_title_member', 'My Clubs')}
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          {t(
            'my_clubs_subtitle_member',
            'Clubs where you have an active and verified membership.',
          )}
        </p>
      </div>

      {/* --- CLUBS LIST --- */}
      {myClubs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myClubs.map(club => (
            <div
              key={club._id}
              className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Decoration Bar */}
              <div className="h-3 bg-[#0b99ce]/20 group-hover:bg-[#0b99ce] transition-colors"></div>

              <div className="p-8">
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-blue-50 text-[#0b99ce] rounded-2xl group-hover:bg-[#0b99ce] group-hover:text-white transition-all duration-300">
                    <FaBuilding className="text-2xl" />
                  </div>
                  <span
                    className={`badge border-none py-3 px-4 font-black text-[10px] uppercase tracking-widest rounded-lg ${
                      club.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {club.status}
                  </span>
                </div>

                {/* Club Info */}
                <h3 className="text-2xl font-black text-slate-800 mb-2 truncate tracking-tight group-hover:text-[#0b99ce] transition-colors">
                  {club.clubName}
                </h3>
                <p className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-6 uppercase tracking-tighter">
                  <FaMapMarkerAlt className="text-[#fe3885]" />
                  {club.location || t('location_global', 'Global/Online')}
                </p>

                {/* Dates Section */}
                <div className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FaCalendarAlt className="text-[#0b99ce]" />{' '}
                      {t('label_joined', 'Joined')}
                    </span>
                    <span className="text-xs font-black text-slate-700">
                      {new Date(club.joinedAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FaClock className="text-[#fe3885]" />{' '}
                      {t('label_expiry', 'Expiry Date')}
                    </span>
                    <span className="text-xs font-black text-[#fe3885]">
                      {club.expireDate
                        ? new Date(club.expireDate).toLocaleDateString('en-GB')
                        : t('lifetime_access', 'Lifetime Access')}
                    </span>
                  </div>
                </div>

                {/* Action Link */}
                <div className="mt-8">
                  <Link
                    to={`/clubs/${club.clubId}`}
                    className="w-full btn h-14 bg-slate-900 hover:bg-[#0b99ce] text-white border-none rounded-2xl font-black uppercase text-xs tracking-widest gap-2 transition-all shadow-lg active:scale-95"
                  >
                    {t('view_club_details', 'View Club Details')}{' '}
                    <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 border border-dashed border-slate-200">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex justify-center items-center mb-6 shadow-inner text-slate-200">
            <FaBuilding size={40} />
          </div>
          <h3 className="text-xl font-black text-slate-400 uppercase tracking-[0.2em]">
            {t('no_clubs_found', 'No Clubs Found')}
          </h3>
          <p className="text-slate-400 mt-2 font-bold italic tracking-tight">
            {t('no_clubs_subtitle', "You haven't joined any clubs yet.")}
          </p>
          <Link
            to="/clubs"
            className="btn btn-link text-[#0b99ce] mt-4 font-black uppercase text-xs tracking-widest no-underline hover:underline"
          >
            {t('explore_clubs_btn', 'Explore All Clubs')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyClubsMember;
