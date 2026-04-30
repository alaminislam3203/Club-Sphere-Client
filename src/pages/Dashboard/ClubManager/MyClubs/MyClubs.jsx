import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import {
  FaEdit,
  FaPlus,
  FaMapMarkerAlt,
  FaTag,
  FaTimes,
  FaLayerGroup,
  FaTrash,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyClubs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [selectedClub, setSelectedClub] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const { data: myClubs = [], isLoading } = useQuery({
    queryKey: ['my-clubs', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/clubs/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        t('alert_deleted', 'Deleted!'),
        t('alert_club_delete_success', 'The club has been removed.'),
        'success',
      );
      queryClient.invalidateQueries(['my-clubs']);
    },
    onError: err => {
      Swal.fire(
        'Error',
        err.response?.data?.message || 'Delete failed',
        'error',
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async updatedData => {
      const res = await axiosSecure.patch(
        `/clubs/${selectedClub._id}`,
        updatedData,
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        t('alert_updated', 'Updated!'),
        t('alert_club_update_success', 'Club details updated successfully.'),
        'success',
      );
      queryClient.invalidateQueries(['my-clubs']);
      document.getElementById('edit_modal').close();
      setSelectedClub(null);
    },
  });

  const handleDelete = (id, clubName) => {
    Swal.fire({
      title: t('delete_confirm_title', 'Are you sure?'),
      text: `${t(
        'delete_confirm_text',
        'You are about to delete',
      )} "${clubName}". ${t(
        'delete_undo_warn',
        'This action cannot be undone!',
      )}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fe3885',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: t('btn_yes_delete', 'Yes, Delete it!'),
      customClass: { popup: 'rounded-[2rem]' },
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const openEditModal = club => {
    setSelectedClub(club);
    setValue('clubName', club.clubName);
    setValue('category', club.category);
    setValue('location', club.location);
    setValue('membershipFee', club.membershipFee);
    setValue('bannerImage', club.bannerImage);
    setValue('description', club.description);
    document.getElementById('edit_modal').showModal();
  };

  const onUpdateSubmit = data => {
    updateMutation.mutate({
      ...data,
      membershipFee: Number(data.membershipFee),
      updatedAt: new Date(),
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-lg text-[#0b99ce]"></span>
      </div>
    );

  const inputClass =
    'w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700';

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 text-black">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <FaLayerGroup className="text-[#0b99ce]" />
            {t('my_clubs_title', 'My Managed Clubs')}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {t(
              'my_clubs_subtitle',
              'View and keep your club information up to date.',
            )}
          </p>
        </div>
        <Link
          to="/dashboard/manager/create-club"
          className="btn h-14 px-8 bg-[#0b99ce] text-white border-none rounded-2xl gap-3 hover:bg-slate-900 shadow-xl shadow-blue-100 transition-all font-black uppercase text-xs tracking-widest"
        >
          <FaPlus /> {t('create_new_club_btn', 'Create New Club')}
        </Link>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-black">
        {myClubs.map(club => (
          <div
            key={club._id}
            className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-slate-50 overflow-hidden flex flex-col md:flex-row group hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="md:w-1/3 h-52 md:h-auto relative">
              <img
                src={club.bannerImage}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={club.clubName}
              />
              <div className="absolute top-4 left-4 badge bg-slate-900/80 backdrop-blur-md text-white border-none text-[10px] px-3 py-3 uppercase font-black tracking-widest">
                {club.status}
              </div>
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-black text-slate-800 truncate tracking-tight">
                    {club.clubName}
                  </h3>
                  <span className="text-[#0b99ce] font-black text-xl">
                    ${club.membershipFee}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <FaTag className="text-[#fe3885]" /> {club.category}
                  </span>
                  <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <FaMapMarkerAlt className="text-[#0b99ce]" />
                    {club.location}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mt-5 line-clamp-2 font-medium leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(club)}
                  className="btn flex-1 h-12 bg-slate-50 text-slate-600 border-slate-100 hover:bg-[#0b99ce] hover:text-white hover:border-[#0b99ce] rounded-2xl gap-2 transition-all font-black uppercase text-[10px] tracking-widest shadow-sm"
                >
                  <FaEdit /> {t('edit_details_btn', 'Edit Details')}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(club._id, club.clubName)}
                  className="btn w-12 h-12 bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-500 hover:text-white rounded-2xl flex items-center justify-center transition-all shadow-sm"
                  title="Delete Club"
                >
                  <FaTrash />
                </button>

                {/* View/Details Button */}
                <Link
                  to={`/clubs/${club._id}`}
                  className="btn w-12 h-12 bg-slate-900 text-white border-none hover:bg-[#fe3885] rounded-2xl flex items-center justify-center transition-all shadow-lg"
                >
                  <FaPlus className="rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- UPDATE MODAL --- */}
      <dialog
        id="edit_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box bg-white max-w-3xl rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 text-black">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">
                {t('update_club_modal_title', 'Update Club Info')}
              </h3>
              <div className="h-1.5 w-12 bg-[#0b99ce] rounded-full mt-2"></div>
            </div>
            <form method="dialog">
              <button className="btn btn-circle btn-ghost text-slate-400 hover:rotate-90 transition-transform">
                <FaTimes size={20} />
              </button>
            </form>
          </div>

          <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_club_name', 'Club Name')}
                </label>
                <input {...register('clubName')} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_category', 'Category')}
                </label>
                <select {...register('category')} className={inputClass}>
                  <option value="Tech">Tech</option>
                  <option value="Photography">Photography</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Business">Business</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Music">Music</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_location', 'Location')}
                </label>
                <input {...register('location')} className={inputClass} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                  {t('label_fee', 'Membership Fee ($)')}
                </label>
                <input
                  type="number"
                  {...register('membershipFee')}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_banner', 'Banner Image URL')}
              </label>
              <input {...register('bannerImage')} className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">
                {t('label_desc', 'Description')}
              </label>
              <textarea
                {...register('description')}
                rows="4"
                className={inputClass}
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="btn w-full h-16 bg-[#0b99ce] hover:bg-[#fe3885] text-white border-none rounded-[1.5rem] font-black text-lg uppercase tracking-widest shadow-xl shadow-blue-100 transition-all duration-300"
              >
                {updateMutation.isPending
                  ? t('btn_updating', 'Updating...')
                  : t('btn_save_changes', 'Save Changes')}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyClubs;
