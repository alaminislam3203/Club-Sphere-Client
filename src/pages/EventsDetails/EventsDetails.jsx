import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useEvents from '../../hooks/useEvents';
import { FaArrowLeft, FaGem, FaClock } from 'react-icons/fa';
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import Container from '../../components/shared/Container';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const EventsDetails = () => {
  const { id } = useParams();
  const { events, isLoading, isError } = useEvents();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-[#0b99ce]"></span>
          <p className="text-gray-400 animate-pulse font-bold tracking-widest uppercase text-xs">
            {t('elevating_experience', 'Elevating experiences...')}
          </p>
        </div>
      </div>
    );
  }

  const event = events?.find(e => e._id === id);

  if (isError || !event) {
    return (
      <div className="text-center py-24 bg-white font-sans">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaGem className="text-rose-400 text-4xl" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          {t('event_not_found', 'Event Not Found!')}
        </h2>
        <button
          onClick={() => navigate('/events')}
          className="btn btn-link text-[#0b99ce] font-black uppercase text-xs tracking-widest mt-4 no-underline hover:underline"
        >
          <FaArrowLeft /> {t('go_back', 'Go Back')}
        </button>
      </div>
    );
  }

  const handleRegisterEvent = async event => {
    if (!user) {
      toast.error(t('login_to_register', 'Please login to register!'));
      return navigate('/login');
    }

    const currentLocalTime = new Date().toLocaleString();

    if (!event.isPaid || event.eventFee <= 0) {
      try {
        const registrationData = {
          eventId: event._id,
          userEmail: user.email,
          eventTitle: event.title,
          clubId: event.clubId,
          registeredAt: currentLocalTime,
          status: 'registered',
          paymentId: `FREE-EVT-${Date.now()}`,
        };

        const freePaymentRecord = {
          userEmail: user.email,
          amount: 0,
          paymentType: 'event',
          clubId: event.clubId,
          eventId: event._id,
          eventTitle: event.title,
          transactionId: registrationData.paymentId,
          status: 'paid',
          createdAt: currentLocalTime,
        };

        await axiosSecure.post('/payments-manual-record', freePaymentRecord);
        const res = await axiosSecure.post(
          '/event-registrations',
          registrationData,
        );

        if (res.data.success) {
          Swal.fire({
            title: t('reg_success_title', 'Registration Successful!'),
            text: t('reg_free_success_msg', { title: event.title }),
            icon: 'success',
            confirmButtonColor: '#0b99ce',
            customClass: { popup: 'rounded-[2.5rem]' },
          });
          navigate('/dashboard/member/my-events');
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            t('already_registered', 'Already registered for this event!'),
        );
      }
    } else {
      try {
        const paymentInfo = {
          userEmail: user.email,
          amount: event.eventFee,
          paymentType: 'event',
          clubId: event.clubId,
          eventId: event._id,
          eventTitle: event.title,
        };

        const res = await axiosSecure.post(
          '/payment-checkout-session',
          paymentInfo,
        );
        if (res.data.url) window.location.assign(res.data.url);
      } catch (error) {
        toast.error(t('payment_init_failed', 'Payment initialization failed!'));
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-black">
      {/* Hero Section */}
      <div className="relative pt-20 pb-40 overflow-hidden bg-[#0b99ce]">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>

        <Container>
          <div className="relative z-20 bg-white/10 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border border-white/20">
            <button
              onClick={() => navigate('/events')}
              className="flex items-center gap-2 text-white bg-white/10 px-5 py-2 rounded-full mb-10 hover:bg-white/20 transition-all font-black uppercase text-[10px] tracking-widest border border-white/5"
            >
              <FaArrowLeft size={14} /> {t('back_to_events', 'Back to Events')}
            </button>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
              <div className="max-w-4xl space-y-6 text-white">
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest">
                  <FaGem size={12} />{' '}
                  {t('featured_activity', 'Featured Activity')}
                </div>
                <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-blue-50">
                  <span className="flex items-center gap-3 bg-black/20 backdrop-blur-sm px-5 py-2.5 rounded-2xl text-xs font-bold border border-white/5">
                    <FaClock className="text-[#fe3885]" />{' '}
                    {t('label_date', 'Date')}:{' '}
                    {new Date(event.eventDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-3 bg-black/20 backdrop-blur-sm px-5 py-2.5 rounded-2xl text-xs font-bold border border-white/5">
                    <HiOutlineUserGroup className="text-emerald-400" />{' '}
                    {event.maxAttendees || t('unlimited', 'Unlimited')}{' '}
                    {t('capacity_label', 'Capacity')}
                  </span>
                </div>
              </div>

              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl rotate-3 min-w-[220px]">
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 px-10 py-8 rounded-[2rem] text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    {t('entry_pass_label', 'Entry Pass')}
                  </p>
                  <h2 className="text-6xl font-black text-[#fe3885] tracking-tighter">
                    {event.isPaid
                      ? `$${event.eventFee}`
                      : t('fee_free', 'FREE')}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-20 relative z-30">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard
                icon={<HiOutlineCalendar />}
                label={t('label_schedule', 'Schedule')}
                value={new Date(event.eventDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                color="blue"
              />
              <InfoCard
                icon={<HiOutlineLocationMarker />}
                label={t('label_venue', 'Venue')}
                value={event.location}
                color="red"
              />
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-12 w-16 h-1.5 bg-[#fe3885] rounded-b-full"></div>
              <h3 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">
                {t('event_details_title', 'Event Details')}
              </h3>
              <p className="text-slate-500 leading-relaxed whitespace-pre-line text-lg font-medium">
                {event.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 sticky top-10">
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex justify-center items-center mx-auto shadow-inner">
                  <HiOutlineCurrencyDollar className="text-6xl text-[#0b99ce]" />
                </div>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                  {t('secure_ticket_title', 'Secure Your Ticket')}
                </h3>
                <div className="bg-slate-50 rounded-3xl p-6 space-y-5 border border-slate-100">
                  <PriceRow
                    label={t('label_availability', 'AVAILABILITY')}
                    value={t('status_open', 'Open Now')}
                    isBadge
                  />
                  <PriceRow
                    label={t('label_pricing', 'PRICING')}
                    value={
                      event.isPaid
                        ? `$${event.eventFee}`
                        : t('fee_free', 'FREE')
                    }
                  />
                </div>
                <button
                  onClick={() => handleRegisterEvent(event)}
                  className="w-full py-6 bg-[#0b99ce] hover:bg-[#fe3885] text-white rounded-[1.5rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-900/20 transition-all duration-500 active:scale-95 flex justify-center items-center gap-4 group"
                >
                  {event.isPaid
                    ? t('proceed_payment_btn', 'Proceed to Payment')
                    : t('confirm_entry_btn', 'Confirm Free Entry')}
                  <FaArrowLeft className="rotate-180 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 flex items-center gap-6 group hover:scale-[1.02] transition-transform duration-300">
    <div
      className={`p-5 rounded-2xl transition-colors duration-300 ${
        color === 'blue'
          ? 'bg-blue-50 text-[#0b99ce] group-hover:bg-[#0b99ce] group-hover:text-white'
          : 'bg-rose-50 text-[#fe3885] group-hover:bg-[#fe3885] group-hover:text-white'
      }`}
    >
      {React.cloneElement(icon, { size: 30 })}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-xl font-black text-slate-800 truncate tracking-tight">
        {value}
      </h4>
    </div>
  </div>
);

const PriceRow = ({ label, value, isBadge }) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
      {label}
    </span>
    {isBadge ? (
      <span className="bg-emerald-100 text-emerald-600 font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border border-emerald-200">
        {value}
      </span>
    ) : (
      <span className="text-slate-800 font-black text-xl tracking-tighter">
        {value}
      </span>
    )}
  </div>
);
export default EventsDetails;
