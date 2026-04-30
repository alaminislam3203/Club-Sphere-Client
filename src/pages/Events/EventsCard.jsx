import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18n হুক ইম্পোর্ট
import { format } from 'date-fns';
import { bn, enUS } from 'date-fns/locale'; // তারিখ অনুবাদের জন্য লোকাল
import { FaMapMarkerAlt, FaUsers, FaClock, FaArrowRight } from 'react-icons/fa';

const EventsCard = ({ event }) => {
  const { t, i18n } = useTranslation(); // t ফাংশন এবং ল্যাঙ্গুয়েজ ডিটেক্টর
  const {
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,
    _id,
  } = event;

  // তারিখের লোকাল নির্ধারণ (বাংলা না ইংরেজি)
  const currentLocale = i18n.language === 'BN' ? bn : enUS;

  // Date Formatting
  const dateObj = new Date(eventDate);
  const day = format(dateObj, 'dd');
  const month = format(dateObj, 'MMM', { locale: currentLocale });

  // Time Formatting
  const formattedTime = format(dateObj, 'hh:mm a');

  return (
    <div className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden font-sans">
      {/* Top Gradient Accent Line */}
      <div className="h-2 w-full bg-gradient-to-r from-[#0b99ce] to-[#fe3885] group-hover:h-3 transition-all duration-300"></div>

      <div className="p-7 flex flex-col h-full">
        {/* Header: Date Badge & Price */}
        <div className="flex justify-between items-start mb-6">
          {/* Date Badge */}
          <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl w-16 h-16 text-center shrink-0 shadow-inner group-hover:bg-[#0b99ce] transition-colors duration-500">
            <span className="text-[10px] font-black text-[#fe3885] group-hover:text-blue-100 uppercase tracking-widest">
              {month}
            </span>
            <span className="text-2xl font-black text-slate-800 group-hover:text-white tracking-tighter">
              {day}
            </span>
          </div>

          {/* Price Tag */}
          <div
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-sm border ${
              isPaid
                ? 'bg-blue-50 text-[#0b99ce] border-blue-100'
                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
            }`}
          >
            {isPaid ? `$${eventFee}` : t('fee_free', 'Free')}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black text-slate-800 mb-3 leading-tight group-hover:text-[#0b99ce] transition-colors line-clamp-2 tracking-tight">
          {title}
        </h2>

        {/* Info Row (Time & Location) */}
        <div className="flex flex-col gap-2.5 mb-5">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 uppercase tracking-tighter">
            <FaClock className="text-[#0b99ce]" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400 uppercase tracking-tighter">
            <FaMapMarkerAlt className="text-[#fe3885]" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-slate-50 mb-5"></div>

        {/* Description */}
        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        {/* Footer: Attendees & Action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-[11px] font-black text-slate-300 uppercase tracking-widest">
            <FaUsers className="text-lg text-slate-200" />
            <span>
              {maxAttendees ? maxAttendees : t('unlimited', 'Unlimited')}
            </span>
          </div>

          <Link
            to={`/events/${_id}`}
            className="btn btn-sm h-10 px-5 bg-slate-900 hover:bg-[#0b99ce] text-white border-none rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg active:scale-90 flex items-center gap-2"
          >
            {t('view_details', 'Details')} <FaArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;
