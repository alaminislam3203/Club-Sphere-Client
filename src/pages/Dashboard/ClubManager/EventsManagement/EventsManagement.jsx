import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import {
  FaCalendarPlus,
  FaEdit,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaSearch,
  FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EventsManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { register, handleSubmit, setValue, watch } = useForm();
  const isPaid = watch('isPaid');

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['manager-events', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/events?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/events/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        t('alert_deleted', 'Deleted!'),
        t('alert_event_removed', 'The event has been removed.'),
        'success',
      );
      queryClient.invalidateQueries(['manager-events']);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async updatedData => {
      const res = await axiosSecure.patch(
        `/events/${selectedEvent._id}`,
        updatedData,
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        t('alert_updated', 'Updated!'),
        t('alert_event_saved', 'Event details have been saved.'),
        'success',
      );
      queryClient.invalidateQueries(['manager-events']);
      document.getElementById('edit_event_modal').close();
    },
  });

  const handleDelete = id => {
    Swal.fire({
      title: t('alert_sure', 'Are you sure?'),
      text: t('alert_undone', 'This action cannot be undone!'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: t('btn_delete_confirm', 'Yes, delete it!'),
    }).then(result => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openEditModal = event => {
    setSelectedEvent(event);
    setValue('title', event.title);
    setValue('location', event.location);
    setValue('eventDate', event.eventDate?.slice(0, 16));
    setValue('isPaid', event.isPaid ? 'true' : 'false');
    setValue('eventFee', event.eventFee);
    setValue('maxAttendees', event.maxAttendees);
    setValue('description', event.description);
    document.getElementById('edit_event_modal').showModal();
  };

  const onUpdateSubmit = data => {
    const formattedData = {
      ...data,
      isPaid: data.isPaid === 'true',
      eventFee: data.isPaid === 'true' ? Number(data.eventFee) : 0,
      maxAttendees: Number(data.maxAttendees),
    };
    updateMutation.mutate(formattedData);
  };

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20 min-h-[400px]">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
      </div>
    );

  const inputClass =
    'w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700';

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {t('event_mgt_title', 'Events Management')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'event_mgt_subtitle',
              'Manage activities where you are the authorized manager.',
            )}
          </p>
        </div>
        <Link
          to="/dashboard/manager/create-event"
          className="btn h-14 px-8 bg-[#0b99ce] text-white border-none rounded-2xl gap-3 hover:bg-slate-900 shadow-xl shadow-blue-100 transition-all font-black uppercase text-xs tracking-widest"
        >
          <FaCalendarPlus /> {t('add_new_event_btn', 'Add New Event')}
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md group">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0b99ce] transition-colors" />
        <input
          type="text"
          placeholder={t('search_events_placeholder', 'Search your events...')}
          className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-700"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 pb-6">
            <thead>
              <tr className="text-slate-400 uppercase text-[10px] tracking-[0.2em] font-black border-none">
                <th className="py-8 bg-transparent">
                  {t('table_event_info', 'Event Info')}
                </th>
                <th className="bg-transparent">
                  {t('table_date_time', 'Date & Time')}
                </th>
                <th className="bg-transparent">{t('table_type', 'Type')}</th>
                <th className="bg-transparent">
                  {t('table_capacity', 'Capacity')}
                </th>
                <th className="bg-transparent text-right">
                  {t('table_actions', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr
                  key={event._id}
                  className="group transition-all duration-300"
                >
                  <td className="bg-slate-50 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <p className="font-black text-slate-800 text-lg tracking-tight">
                      {event.title}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 mt-1.5 uppercase tracking-widest">
                      <FaMapMarkerAlt className="text-[#fe3885]" />{' '}
                      {event.location}
                    </p>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                      <FaClock className="text-[#0b99ce]" />
                      {new Date(event.eventDate).toLocaleString([], {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </div>
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors text-xs font-black">
                    {event.isPaid ? (
                      <span className="bg-white px-3 py-1 rounded-lg border border-emerald-100 text-emerald-600 shadow-sm">
                        ${event.eventFee}
                      </span>
                    ) : (
                      <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                        {t('event_free', 'Free')}
                      </span>
                    )}
                  </td>
                  <td className="bg-slate-50 border-y border-slate-100 group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex items-center gap-2 text-slate-500 font-black text-sm">
                      <FaUsers className="text-[#0b99ce]" />
                      {event.maxAttendees || '∞'}
                    </div>
                  </td>
                  <td className="bg-slate-50 py-5 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:bg-blue-50/50 transition-colors text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(event)}
                        className="btn btn-sm w-10 h-10 p-0 bg-white text-[#0b99ce] border-slate-100 hover:bg-[#0b99ce] hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="btn btn-sm w-10 h-10 p-0 bg-white text-[#fe3885] border-slate-100 hover:bg-[#fe3885] hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEvents.length === 0 && (
            <div className="text-center py-20 m-6 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
              <p className="text-slate-400 font-black text-sm uppercase tracking-[0.2em]">
                {t('no_events_found', 'No Events Found')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- UPDATE EVENT MODAL --- */}
      <dialog id="edit_event_modal" className="modal backdrop-blur-sm">
        <div className="modal-box bg-white max-w-4xl rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                {t('edit_event_modal_title', 'Edit Event Settings')}
              </h3>
              <div className="h-1.5 w-12 bg-[#0b99ce] rounded-full mt-2"></div>
            </div>
            <form method="dialog">
              <button className="btn btn-circle btn-ghost text-slate-300 hover:rotate-90 transition-transform">
                <FaTimes size={20} />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_event_title', 'Event Title')}
                </label>
                <input
                  {...register('title', { required: true })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_location', 'Location')}
                </label>
                <input
                  {...register('location', { required: true })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_event_date', 'Event Date')}
                </label>
                <input
                  type="datetime-local"
                  {...register('eventDate', { required: true })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_paid_event', 'Paid Event?')}
                </label>
                <select {...register('isPaid')} className={inputClass}>
                  <option value="true">{t('option_yes', 'Yes')}</option>
                  <option value="false">{t('option_no', 'No')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_max_attendees', 'Max Attendees')}
                </label>
                <input
                  type="number"
                  {...register('maxAttendees')}
                  className={inputClass}
                />
              </div>
            </div>

            {isPaid === 'true' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 ml-2">
                  {t('label_event_fee', 'Event Fee ($)')}
                </label>
                <input
                  type="number"
                  {...register('eventFee')}
                  className={`${inputClass} ring-emerald-50`}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_desc', 'Description')}
              </label>
              <textarea
                {...register('description', { required: true })}
                rows="4"
                className={inputClass}
              ></textarea>
            </div>

            <div className="modal-action mt-10">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="btn w-full h-16 bg-[#0b99ce] hover:bg-[#fe3885] text-white border-none rounded-[1.5rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300 active:scale-95"
              >
                {updateMutation.isPending
                  ? t('btn_saving', 'Saving...')
                  : t('btn_save_changes', 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EventsManagement;
