import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

import {
  FaCalendarPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
  FaAlignLeft,
  FaClock,
  FaEnvelope,
  FaArrowRight,
  FaFileCode,
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { t } = useTranslation();

  // ── JSON STATES ─────────────────────────────
  const fileInputRef = useRef(null);

  const [jsonFileName, setJsonFileName] = useState('');
  const [jsonPasteValue, setJsonPasteValue] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [jsonSuccess, setJsonSuccess] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isPaid: 'true',
    },
  });

  const isPaid = watch('isPaid');

  // ── SUBMIT ─────────────────────────────────
  const onSubmit = async data => {
    setLoading(true);

    const newEvent = {
      title: data.title.trim(),
      description: data.description.trim(),
      location: data.location.trim(),
      eventDate: new Date(data.eventDate).toISOString(),
      isPaid: data.isPaid === 'true',
      eventFee: data.isPaid === 'true' ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees),
      createdAt: new Date().toISOString(),
      managerEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post('/events', newEvent);

      if (res?.data?.insertedId) {
        Swal.fire({
          title: t('alert_success_created_title', 'Successfully Created!'),
          text: t('alert_success_created_msg', 'Your new event is now live.'),
          icon: 'success',
          confirmButtonColor: '#0b99ce',
          customClass: {
            popup: 'rounded-[2rem]',
          },
        });

        reset();

        setJsonFileName('');
        setJsonPasteValue('');
        setJsonError('');
        setJsonSuccess('');
      }
    } catch (err) {
      Swal.fire({
        title: t('alert_error_title', 'Error!'),
        text:
          err?.response?.data?.message ||
          t('alert_error_msg', 'Something went wrong'),
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // ── JSON APPLY ─────────────────────────────
  const applyJson = json => {
    const required = [
      'title',
      'description',
      'location',
      'eventDate',
      'isPaid',
      'maxAttendees',
    ];

    const missing = required.filter(key => !json[key] && json[key] !== 0);

    if (missing.length > 0) {
      setJsonError(`Missing fields: ${missing.join(', ')}`);
      return false;
    }

    setValue('title', json.title || '');
    setValue('description', json.description || '');
    setValue('location', json.location || '');
    setValue('eventDate', json.eventDate || '');
    setValue('isPaid', String(json.isPaid));
    setValue('maxAttendees', json.maxAttendees ?? '');

    if (json.isPaid) {
      setValue('eventFee', json.eventFee ?? 0);
    }

    setJsonSuccess(t('json_loaded', 'JSON loaded! Review and submit.'));

    return true;
  };

  // ── JSON PASTE ─────────────────────────────
  const handleJsonPaste = () => {
    setJsonError('');
    setJsonSuccess('');

    try {
      const json = JSON.parse(jsonPasteValue);

      if (applyJson(json)) {
        setJsonPasteValue('');
      }
    } catch {
      setJsonError(t('json_invalid', 'Invalid JSON. Please check the format.'));
    }
  };

  // ── JSON FILE UPLOAD ───────────────────────
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

        if (!applyJson(json)) {
          setJsonFileName('');
        }
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

  const inputClass =
    'w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700';

  const labelClass =
    'text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 flex items-center justify-center md:justify-start gap-4 tracking-tight">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-[#0b99ce]">
              <FaCalendarPlus />
            </div>

            {t('organize_event_title', 'Organize New Event')}
          </h1>

          <p className="text-slate-500 font-medium mt-3 ml-1">
            {t(
              'organize_event_subtitle',
              'Fill in the details below to launch your community event.',
            )}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0b99ce]/20"></div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-16 space-y-12"
          >
            {/* Basic Info */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0b99ce] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-blue-200">
                  01
                </div>

                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  {t('step_1_title', 'Essential Details')}
                </h3>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="relative group">
                  <label className={labelClass}>
                    {t('label_event_title', 'Event Title')}
                  </label>

                  <FaCalendarAlt className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />

                  <input
                    placeholder={t(
                      'placeholder_event_title',
                      'e.g. Annual Tech Summit 2025',
                    )}
                    className={inputClass}
                    {...register('title', {
                      required: t('err_title_req', 'Event title is required'),
                    })}
                  />

                  {errors.title && (
                    <p className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-2">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="relative group">
                  <label className={labelClass}>
                    {t('label_location', 'Venue Location')}
                  </label>

                  <FaMapMarkerAlt className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#fe3885] transition-colors" />

                  <input
                    placeholder={t(
                      'placeholder_location',
                      'e.g. Grand Hall / Online',
                    )}
                    className={inputClass}
                    {...register('location', { required: true })}
                  />
                </div>
              </div>
            </div>

            {/* Logistics */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#fe3885] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-rose-200">
                  02
                </div>

                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  {t('step_2_title', 'Logistics & Capacity')}
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Date */}
                <div className="relative group">
                  <label className={labelClass}>
                    {t('label_date_time', 'Date & Time')}
                  </label>

                  <FaClock className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#0b99ce] transition-colors z-10" />

                  <input
                    type="datetime-local"
                    className={inputClass}
                    {...register('eventDate', { required: true })}
                  />
                </div>

                {/* Type */}
                <div className="relative group">
                  <label className={labelClass}>
                    {t('label_event_type', 'Event Type')}
                  </label>

                  <FaDollarSign className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#0b99ce] transition-colors z-10" />

                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    {...register('isPaid')}
                  >
                    <option value="true">{t('opt_paid', 'Paid Entry')}</option>

                    <option value="false">{t('opt_free', 'Free Entry')}</option>
                  </select>
                </div>

                {/* Capacity */}
                <div className="relative group">
                  <label className={labelClass}>
                    {t('label_max_cap', 'Max Capacity')}
                  </label>

                  <FaUsers className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />

                  <input
                    type="number"
                    placeholder="50"
                    className={inputClass}
                    {...register('maxAttendees')}
                  />
                </div>
              </div>

              {/* Fee */}
              {isPaid === 'true' && (
                <div className="relative group animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className={labelClass}>
                    {t('label_fee', 'Entry Fee ($)')}
                  </label>

                  <FaDollarSign className="absolute left-4 top-[50px] text-emerald-400 group-focus-within:text-emerald-500 transition-colors" />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="25.00"
                    className={`${inputClass} bg-emerald-50/30 ring-emerald-50`}
                    {...register('eventFee')}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-slate-200">
                  03
                </div>

                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  {t('step_3_title', 'Narrative')}
                </h3>
              </div>

              <div className="relative group">
                <label className={labelClass}>
                  {t('label_desc', 'Event Description')}
                </label>

                <FaAlignLeft className="absolute left-4 top-[50px] text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />

                <textarea
                  rows="5"
                  placeholder={t(
                    'placeholder_desc',
                    'Describe the magic of this event...',
                  )}
                  className={`${inputClass} pt-4`}
                  {...register('description', { required: true })}
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-8 rounded-[2rem] grid md:grid-cols-2 gap-6 border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0b99ce] border border-slate-100">
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">
                    {t('meta_organizer', 'Organizer')}
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 border border-slate-100">
                  <FaClock />
                </div>

                <div>
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">
                    {t('meta_sys_time', 'System Time')}
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center md:justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex items-center gap-4 px-12 py-5 bg-slate-900 hover:bg-[#0b99ce] text-white font-black rounded-2xl transition-all duration-500 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl shadow-blue-100 uppercase text-xs tracking-[0.2em]"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    {t('btn_create_event', 'Create Event')}

                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ── JSON SECTION ───────────────────────── */}
          <div className="border-t border-slate-100 bg-slate-50/50 p-8 md:p-16">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white rounded-2xl shadow-sm text-[#0b99ce]">
                <FaFileCode className="text-2xl" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  {t('json_upload_title', 'Create Event via JSON')}
                </h3>

                <p className="text-slate-400 font-medium text-sm mt-1">
                  {t(
                    'json_upload_subtitle',
                    'Upload or paste JSON to auto-fill event form.',
                  )}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Paste */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {t('json_paste_label', 'Paste JSON')}
                </p>

                <textarea
                  rows={12}
                  value={jsonPasteValue}
                  onChange={e => {
                    setJsonPasteValue(e.target.value);
                    setJsonError('');
                    setJsonSuccess('');
                  }}
                  placeholder={`{
  "title": "Annual Tech Summit",
  "description": "Biggest community event...",
  "location": "Dhaka Convention Hall",
  "eventDate": "2026-06-15T18:00",
  "isPaid": true,
  "eventFee": 20,
  "maxAttendees": 200
}`}
                  className="w-full rounded-3xl border border-slate-200 bg-white p-5 font-mono text-xs text-slate-600 outline-none focus:ring-4 focus:ring-blue-100 resize-none leading-relaxed"
                />

                <button
                  type="button"
                  onClick={handleJsonPaste}
                  className="px-6 py-3 bg-[#0b99ce] hover:bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all duration-300 active:scale-95"
                >
                  {t('json_apply_btn', 'Apply JSON')}
                </button>
              </div>

              {/* Upload */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {t('json_upload_label', 'Upload JSON File')}
                </p>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group min-h-[320px] rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-[#0b99ce] bg-white hover:bg-blue-50/40 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer px-6"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-slate-50 group-hover:bg-white flex items-center justify-center text-[#0b99ce] shadow-sm mb-6 transition-all duration-300">
                    <FaUpload className="text-3xl group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h4 className="font-black text-slate-700 text-lg">
                    {jsonFileName
                      ? jsonFileName
                      : t('json_drop_label', 'Click to Upload JSON')}
                  </h4>

                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mt-3">
                    {t('json_file_type', '.json files only')}
                  </p>

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

            {/* Success */}
            {jsonSuccess && (
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-emerald-50 border border-emerald-100 px-6 py-4 text-emerald-600">
                <FaCheckCircle className="shrink-0 text-lg" />

                <p className="font-black uppercase tracking-[0.2em] text-[10px]">
                  {jsonSuccess}
                </p>
              </div>
            )}

            {/* Error */}
            {jsonError && (
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-rose-50 border border-rose-100 px-6 py-4 text-rose-500">
                <FaTimesCircle className="shrink-0 text-lg" />

                <p className="font-black uppercase tracking-[0.2em] text-[10px]">
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

export default CreateEvent;
