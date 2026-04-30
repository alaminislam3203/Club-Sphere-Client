import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaMapMarkerAlt,
  FaUsers,
  FaTag,
  FaArrowRight,
  FaCalendarAlt,
} from 'react-icons/fa';

const ClubsCard = ({ club }) => {
  const { t, i18n } = useTranslation();
  const {
    clubName,
    description,
    category,
    location,
    bannerImage,
    membersCount,
    membershipFee,
    createdAt,
    _id,
  } = club;

  const formattedDate = new Date(createdAt).toLocaleDateString(
    i18n.language === 'BN' ? 'bn-BD' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  return (
    <div className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden font-sans">
      {/* Top Gradient Accent Line */}
      <div className="h-2 w-full bg-gradient-to-r from-[#0b99ce] to-[#fe3885] group-hover:h-3 transition-all duration-300"></div>

      {/* Banner Image Wrapper with Zoom Effect */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={bannerImage}
          alt={clubName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#0b99ce] shadow-lg">
            <FaTag size={10} />
            {category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg ${
              membershipFee === 0
                ? 'bg-emerald-500 text-white'
                : 'bg-[#fe3885] text-white'
            }`}
          >
            {membershipFee === 0 ? t('fee_free', 'Free') : `$${membershipFee}`}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-8 flex flex-col h-full">
        {/* Club Name */}
        <h2 className="text-xl font-black text-slate-800 mb-2 leading-tight group-hover:text-[#0b99ce] transition-colors line-clamp-1 tracking-tight">
          {clubName}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-tighter mb-5">
          <FaMapMarkerAlt className="text-[#fe3885]" />
          <span className="truncate">{location}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-slate-50 mb-5"></div>

        {/* Description */}
        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        {/* Footer Info & Action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[12px] font-black text-slate-400 uppercase tracking-widest">
              <FaUsers className="text-[#0b99ce] text-base" />
              <span>{membersCount}</span>
            </div>
            <div className="flex items-center gap-2 text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
              <FaCalendarAlt size={10} />
              <span>{formattedDate}</span>
            </div>
          </div>

          <Link
            to={`/clubs/${_id}`}
            className="btn btn-sm h-11 px-6 bg-slate-900 hover:bg-[#0b99ce] text-white border-none rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-slate-200 active:scale-90 flex items-center gap-2"
          >
            {t('view_btn', 'View')} <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubsCard;
