import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaMapMarkerAlt,
  FaRegMoneyBillAlt,
  FaEnvelope,
  FaRegCalendarPlus,
  FaArrowRight,
  FaShieldAlt,
} from 'react-icons/fa';
import {
  MdCategory,
  MdArrowBack,
  MdAccessTime,
  MdOutlineDescription,
} from 'react-icons/md';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useClubs from '../../hooks/useClubs';
import Container from '../../components/shared/Container';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ClubsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clubs = [], isLoading, isError } = useClubs();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const club = clubs.find(c => c._id === id);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <span className="loading loading-ring loading-lg text-[#0b99ce]"></span>
        <p className="text-gray-400 animate-pulse font-black uppercase text-xs tracking-widest">
          {t('loading_essence', 'Loading club essence...')}
        </p>
      </div>
    );
  }

  if (isError || !club) {
    return (
      <div className="text-center py-24 bg-white font-sans">
        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaShieldAlt className="text-rose-400 text-4xl" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          {t('club_not_found', 'Club Not Found')}
        </h2>
        <button
          onClick={() => navigate('/clubs')}
          className="btn btn-link text-[#0b99ce] font-black uppercase text-xs tracking-widest mt-4 no-underline hover:underline"
        >
          <MdArrowBack /> {t('back_to_clubs', 'Back to Clubs')}
        </button>
      </div>
    );
  }

  const isFree =
    !club.membershipFee ||
    club.membershipFee === 0 ||
    club.membershipFee === '0';

  const handleJoinClub = async () => {
    if (!user) {
      toast.error(t('login_first_msg', 'Please login first'));
      navigate('/login');
      return;
    }

    if (isFree) {
      Swal.fire({
        title: t('join_club_q', 'Join this Club?'),
        text: t('join_free_msg', { name: club.clubName }),
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0b99ce',
        confirmButtonText: t('join_now_btn', 'Yes, Join Now!'),
        customClass: { popup: 'rounded-[2rem]' },
      }).then(async result => {
        if (result.isConfirmed) {
          const localDateTime = new Date().toLocaleString();
          const requestData = {
            clubId: club._id,
            clubName: club.clubName,
            userEmail: user.email,
            userName: user.displayName,
            userImage: user.photoURL,
            managerEmail: club.managerEmail,
            category: club.category,
            location: club.location,
            bannerImage: club.bannerImage,
            status: 'pending',
            joinedAt: localDateTime,
          };

          try {
            const res = await axiosSecure.post(
              '/club-join-request',
              requestData,
            );
            if (res.data.insertedId || res.data.message === 'already-exists') {
              if (res.data.insertedId) {
                const freePaymentInfo = {
                  userEmail: user.email,
                  amount: 0,
                  clubId: club._id,
                  clubName: club.clubName,
                  transactionId: `FREE-${Date.now()}`,
                  paymentType: 'club-membership',
                  status: 'paid',
                  createdAt: localDateTime,
                };
                await axiosSecure.post(
                  '/payments-manual-record',
                  freePaymentInfo,
                );
                Swal.fire(
                  t('success_title', 'Success!'),
                  t(
                    'join_success_msg',
                    'Joined successfully! Your request is pending.',
                  ),
                  'success',
                );
              } else {
                Swal.fire(
                  t('notice_title', 'Notice'),
                  t('already_member_msg', 'Already a member or request sent.'),
                  'info',
                );
              }
            }
          } catch (error) {
            toast.error(t('join_failed_msg', 'Failed to join club.'));
          }
        }
      });
    } else {
      const paymentInfo = {
        userEmail: user.email,
        userName: user.displayName,
        userImage: user.photoURL,
        cost: club.membershipFee,
        clubName: club.clubName,
        clubId: club._id,
        managerEmail: club.managerEmail,
        bannerImage: club.bannerImage,
        category: club.category,
        location: club.location,
        paymentType: 'club-membership',
      };

      Swal.fire({
        title: t('join_with_fee_title', 'Join with Fee'),
        text: t('proceed_payment_msg', { fee: club.membershipFee }),
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#0b99ce',
        confirmButtonText: t('proceed_btn', 'Proceed to Payment'),
        customClass: { popup: 'rounded-[2rem]' },
      }).then(async result => {
        if (result.isConfirmed) {
          try {
            const res = await axiosSecure.post(
              '/payment-club-membership',
              paymentInfo,
            );
            if (res.data.url) window.location.assign(res.data.url);
          } catch (error) {
            toast.error(t('payment_failed_msg', 'Payment failed.'));
          }
        }
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans text-black">
      {/* Hero Section */}
      <div className="relative bg-[#0b99ce] pt-16 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <Container>
          <button
            onClick={() => navigate('/clubs')}
            className="flex items-center gap-2 text-white bg-white/10 px-5 py-2 rounded-full mb-8 hover:bg-white/20 transition-all font-black uppercase text-[10px] tracking-widest border border-white/5"
          >
            <MdArrowBack size={16} /> {t('back_to_clubs', 'Back to Clubs')}
          </button>

          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/20 relative z-10">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-100 rounded-full px-5 py-1.5 text-[10px] font-black uppercase tracking-widest border border-emerald-400/20">
                <FaShieldAlt className="text-yellow-300" />{' '}
                {t('verified_community', 'Verified Community')}
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                {club.clubName}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/90">
                <span className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-3 text-xs font-bold border border-white/5">
                  <MdAccessTime size={18} className="text-[#fe3885] " />{' '}
                  {club.membersCount || 0} {t('members_label', 'Members')}
                </span>
                <span className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-3 text-xs font-bold border border-white/5">
                  <FaMapMarkerAlt size={16} className="text-orange-400" />{' '}
                  {club.location}
                </span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] text-center shadow-2xl rotate-3 hidden lg:block border-2 border-dashed border-slate-100 min-w-[200px]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                {t('membership_fee_label', 'Entry Fee')}
              </p>
              <h2 className="text-5xl font-black text-[#fe3885] tracking-tighter">
                {isFree ? t('fee_free', 'FREE') : `$${club.membershipFee}`}
              </h2>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid lg:grid-cols-3 gap-12 -mt-20 relative z-20">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-4 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden">
              <img
                src={club.bannerImage}
                className="w-full h-[500px] object-cover rounded-[3rem] transition-transform duration-700 hover:scale-105"
                alt={club.clubName}
              />
            </div>
            <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-50 relative">
              <div className="absolute top-0 left-12 w-12 h-1.5 bg-[#0b99ce] rounded-b-full"></div>
              <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4 tracking-tight">
                <MdOutlineDescription className="text-[#0b99ce]" />{' '}
                {t('club_details_title', 'Club Description')}
              </h3>
              <p className="text-slate-500 leading-relaxed text-lg font-medium">
                {club.description}
              </p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-xl border border-slate-50">
              <h4 className="font-black text-slate-400 mb-8 border-b border-slate-50 pb-5 uppercase tracking-[0.2em] text-[11px]">
                {t('quick_info_label', 'Quick Information')}
              </h4>
              <div className="space-y-8">
                <InfoRow
                  icon={<MdCategory />}
                  label={t('label_category', 'Category')}
                  value={club.category}
                  color="blue"
                />
                <InfoRow
                  icon={<FaEnvelope />}
                  label={t('label_admin', 'Admin Contact')}
                  value={club.managerEmail}
                  color="purple"
                />
                <InfoRow
                  icon={<FaRegCalendarPlus />}
                  label={t('label_established', 'Established')}
                  value={new Date(club.createdAt).toDateString()}
                  color="emerald"
                />
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group border border-slate-800">
              <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#0b99ce]/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="p-4 bg-white/10 rounded-[1.5rem] text-[#0b99ce] shadow-inner">
                    <FaRegMoneyBillAlt size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      {t('membership_fee_label', 'Entry Fee')}
                    </p>
                    <p className="text-4xl font-black tracking-tight text-white">
                      {isFree
                        ? t('fee_free', 'FREE')
                        : `$${club.membershipFee}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleJoinClub}
                  className="w-full py-6 bg-[#0b99ce] hover:bg-[#fe3885] text-white rounded-[1.5rem] font-black text-lg uppercase tracking-widest transition-all duration-500 shadow-xl shadow-blue-900/20 active:scale-95 flex justify-center items-center gap-4"
                >
                  {isFree
                    ? t('join_club_btn', 'Join Club Now')
                    : t('proceed_pay_btn', 'Proceed to Payment')}
                  <FaArrowRight size={18} className="animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const InfoRow = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-5 group/row">
    <div
      className={`p-4 rounded-2xl transition-all duration-300 group-hover/row:scale-110 shadow-sm ${
        color === 'blue'
          ? 'bg-blue-50 text-[#0b99ce]'
          : color === 'purple'
            ? 'bg-purple-50 text-purple-500'
            : 'bg-emerald-50 text-emerald-500'
      }`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
        {label}
      </p>
      <p className="text-sm font-black text-slate-700 truncate">{value}</p>
    </div>
  </div>
);

export default ClubsDetails;
