import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
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
  FaFileCode,
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const CreateClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const fileInputRef = useRef(null);
  const [jsonFileName, setJsonFileName] = useState('');
  const [jsonPasteValue, setJsonPasteValue] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
      setJsonFileName('');
      setJsonPasteValue('');
      setJsonError('');
      setJsonSuccess('');
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

  // ── JSON Paste Handler ────────────────────────────
  const applyJson = json => {
    const required = [
      'clubName',
      'category',
      'bannerImage',
      'membershipFee',
      'location',
      'description',
    ];
    const missing = required.filter(k => !json[k] && json[k] !== 0);
    if (missing.length > 0) {
      setJsonError(`Missing fields: ${missing.join(', ')}`);
      return false;
    }
    setValue('clubName', json.clubName || '');
    setValue('category', json.category || '');
    setValue('bannerImage', json.bannerImage || '');
    setValue('membershipFee', json.membershipFee ?? 0);
    setValue('location', json.location || '');
    setValue('description', json.description || '');
    setJsonSuccess(t('json_loaded', 'JSON loaded! Review and submit.'));
    return true;
  };

  const handleJsonPaste = () => {
    setJsonError('');
    setJsonSuccess('');
    try {
      const json = JSON.parse(jsonPasteValue);
      if (applyJson(json)) setJsonPasteValue('');
    } catch {
      setJsonError(t('json_invalid', 'Invalid JSON. Please check the format.'));
    }
  };

  // ── JSON Upload Handler ───────────────────────────
  const handleJsonUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    setJsonError('');
    setJsonSuccess('');
    setJsonFileName(file.name);
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target.result);
        if (!applyJson(json)) setJsonFileName('');
      } catch {
        setJsonError(
          t('json_invalid', 'Invalid JSON file. Please check the format.'),
        );
        setJsonFileName('');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const inputClass = `w-full ${
    isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'
  } py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0b99ce]/20 focus:border-[#0b99ce] outline-none transition-all duration-300 bg-white text-slate-700 font-sans`;
  const labelClass = `flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ${
    isRTL ? 'flex-row-reverse text-right' : ''
  }`;
  const iconClass = `absolute ${isRTL ? 'right-3' : 'left-3'} top-11 text-slate-400`;

  return (
    <div
      className={`p-4 md:p-8 bg-slate-50 min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto">
        {/* ── HEADER ── */}
        <div className={`mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FaPlusCircle className="text-[#0b99ce]" />
            {t('create_club_title', 'Found a New Club')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'create_club_subtitle',
              'Start a new community and lead your passion.',
            )}
          </p>
        </div>

        {/* ── FORM CARD ── */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-12 space-y-8"
          >
            {/* Club Identity */}
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

                <FaLayerGroup className={iconClass} />

                <input
                  type="text"
                  placeholder={t(
                    'placeholder_category',
                    'e.g. Tech, Sports, Photography',
                  )}
                  className={inputClass}
                  {...register('category', {
                    required: t('err_category_req', 'Category is required'),
                  })}
                />

                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Banner & Fee */}
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

            {/* Location & Email */}
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

        {/* ── JSON UPLOAD SECTION ───────────────────── */}
        <div className="mt-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Section Header */}
            <div
              className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="p-3 bg-blue-50 text-[#0b99ce] rounded-2xl">
                <FaFileCode className="text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight">
                  {t('json_upload_title', 'Create Club via JSON')}
                </h2>
                <p className="text-slate-400 font-medium text-xs mt-0.5">
                  {t(
                    'json_upload_subtitle',
                    'Upload a .json file to auto-fill the form above',
                  )}
                </p>
              </div>
            </div>

            {/* Two column: Paste + Upload */}
            <div className="mt-4 mb-2 grid md:grid-cols-2 gap-6">
              {/* ── Left: JSON Paste ── */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t('json_paste_label', 'Paste JSON')}
                </p>
                <textarea
                  rows={10}
                  value={jsonPasteValue}
                  onChange={e => {
                    setJsonPasteValue(e.target.value);
                    setJsonError('');
                    setJsonSuccess('');
                  }}
                  placeholder={`{\n  "clubName": "Dhaka Tech Warriors",\n  "category": "Tech",\n  "bannerImage": "https://...",\n  "membershipFee": 0,\n  "location": "Dhaka, Bangladesh",\n  "description": "Describe your club..."\n}`}
                  className="w-full font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-[#0b99ce]/20 focus:border-[#0b99ce] transition-all resize-none leading-relaxed"
                />
                <button
                  type="button"
                  onClick={handleJsonPaste}
                  className="mt-1 px-5 py-2.5 bg-[#0b99ce] text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all duration-300 active:scale-95"
                >
                  {t('json_apply_btn', 'Apply JSON')}
                </button>
              </div>

              {/* ── Right: File Upload ── */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {t('json_upload_label', 'Upload JSON File')}
                </p>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex-1 relative border-2 border-dashed border-slate-200 hover:border-[#0b99ce] rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 bg-slate-50 hover:bg-blue-50/30 min-h-[200px]"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm text-[#0b99ce] group-hover:scale-110 transition-transform duration-300">
                    <FaUpload className="text-2xl" />
                  </div>
                  <div className="text-center px-4">
                    <p className="font-black text-slate-600 text-sm">
                      {jsonFileName
                        ? jsonFileName
                        : t('json_drop_label', 'Click to upload JSON file')}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {t('json_file_type', '.json files only')}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    className="hidden"
                    onChange={handleJsonUpload}
                  />
                </div>
              </div>
            </div>

            {/* Success / Error feedback */}
            {jsonSuccess && (
              <div className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl px-5 py-3">
                <FaCheckCircle className="shrink-0" />
                <p className="font-black text-xs uppercase tracking-widest">
                  {jsonSuccess}
                </p>
              </div>
            )}
            {jsonError && (
              <div className="mt-4 flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl px-5 py-3">
                <FaTimesCircle className="shrink-0" />
                <p className="font-black text-xs uppercase tracking-widest">
                  {jsonError}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClub;
