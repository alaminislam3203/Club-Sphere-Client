import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next'; // i18n হুক
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import {
  FaPlusCircle,
  FaImage,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaFileAlt,
  FaDollarSign,
  FaEnvelope,
} from 'react-icons/fa';

const CreateClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async newClub => {
      const res = await axiosSecure.post('/clubs', newClub);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: t('alert_success_title', 'Success!'),
        text: t(
          'alert_success_msg',
          'Club registration request submitted for approval.',
        ),
        icon: 'success',
        confirmButtonColor: '#0b99ce',
      });
      queryClient.invalidateQueries(['clubs']);
      reset();
    },
    onError: err => {
      Swal.fire(
        t('alert_error_title', 'Error'),
        err.response?.data?.message ||
          t('alert_error_msg', 'Something went wrong'),
        'error',
      );
    },
  });

  const onSubmit = data => {
    const clubInfo = {
      ...data,
      membershipFee: Number(data.membershipFee),
      managerEmail: user?.email,
      status: 'pending',
      membersCount: 0,
      eventsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mutation.mutate(clubInfo);
  };

  const inputClass = `w-full ${
    isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
  } py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0b99ce]/20 focus:border-[#0b99ce] outline-none transition-all duration-300 bg-white text-slate-700 font-sans`;
  const labelClass = `flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ${
    isRTL ? 'flex-row-reverse text-right' : ''
  }`;
  const iconClass = `absolute ${
    isRTL ? 'right-3' : 'left-3'
  } top-11 text-slate-400`;

  return (
    <div
      className={`p-4 md:p-8 bg-slate-50 min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* --- HEADER --- */}
        <div className={`mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FaPlusCircle className="text-[#0b99ce]" />{' '}
            {t('create_club_title', 'Found a New Club')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'create_club_subtitle',
              'Start a new community and lead your passion.',
            )}
          </p>
        </div>

        {/* --- FORM CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-12 space-y-8"
          >
            {/* Club Identity Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <label className={labelClass}>
                  {t('label_club_name', 'Club Name')}
                </label>
                <FaLayerGroup className={iconClass} />
                <input
                  placeholder={t(
                    'placeholder_club_name',
                    'e.g. Dhaka Tech Warriors',
                  )}
                  className={inputClass}
                  {...register('clubName', {
                    required: t('err_name_req', 'Name is required'),
                  })}
                />
                {errors.clubName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.clubName.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className={labelClass}>
                  {t('label_category', 'Category')}
                </label>
                <FaLayerGroup className={`${iconClass} z-10`} />
                <select
                  className={`${inputClass} appearance-none cursor-pointer`}
                  {...register('category', { required: true })}
                >
                  <option value="">
                    {t('opt_select_category', 'Select Category')}
                  </option>
                  <option value="Photography">
                    {t('cat_photography', 'Photography')}
                  </option>
                  <option value="Sports">{t('cat_sports', 'Sports')}</option>
                  <option value="Tech">{t('cat_tech', 'Tech')}</option>
                  <option value="Design">{t('cat_design', 'Design')}</option>
                  <option value="Travel">{t('cat_travel', 'Travel')}</option>
                  <option value="Business">
                    {t('cat_business', 'Business')}
                  </option>
                </select>
              </div>
            </div>

            {/* Banner & Fee Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <label className={labelClass}>
                  {t('label_banner_url', 'Banner Image URL')}
                </label>
                <FaImage className={iconClass} />
                <input
                  placeholder="https://image-link.com/banner.jpg"
                  className={inputClass}
                  {...register('bannerImage', { required: true })}
                />
              </div>

              <div className="relative">
                <label className={labelClass}>
                  {t('label_membership_fee', 'Membership Fee ($)')}
                </label>
                <FaDollarSign className={`${iconClass} text-emerald-500`} />
                <input
                  type="number"
                  placeholder={t('placeholder_fee', '0 for free')}
                  className={inputClass}
                  {...register('membershipFee', { required: true, min: 0 })}
                />
              </div>
            </div>

            {/* Location & Email Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <label className={labelClass}>
                  {t('label_location', 'Primary Location')}
                </label>
                <FaMapMarkerAlt className={`${iconClass} text-rose-400`} />
                <input
                  placeholder={t('placeholder_location', 'Dhaka, Bangladesh')}
                  className={inputClass}
                  {...register('location', { required: true })}
                />
              </div>

              <div className="relative">
                <label className={labelClass}>
                  {t('label_manager_contact', 'Manager Contact')}
                </label>
                <FaEnvelope className={iconClass} />
                <input
                  readOnly
                  value={user?.email || ''}
                  className={`${inputClass} bg-slate-50 cursor-not-allowed`}
                />
              </div>
            </div>

            {/* Description */}
            <div className="relative">
              <label className={labelClass}>
                {t('label_about_club', 'About the Club')}
              </label>
              <FaFileAlt className={iconClass} />
              <textarea
                rows="5"
                placeholder={t(
                  'placeholder_description',
                  'Describe your club mission and vision...',
                )}
                className={`${inputClass} ${isRTL ? 'pr-10' : 'pl-10'} pt-4`}
                {...register('description', { required: true, minLength: 20 })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {t('err_desc_min', 'Provide at least 20 chars.')}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div
              className={`flex ${isRTL ? 'justify-start' : 'justify-end'} pt-4`}
            >
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full md:w-auto px-12 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#0b99ce] transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95 disabled:opacity-70 uppercase text-xs tracking-widest"
              >
                {mutation.isPending
                  ? t('btn_processing', 'Processing...')
                  : t('btn_register_club', 'Register Club')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
