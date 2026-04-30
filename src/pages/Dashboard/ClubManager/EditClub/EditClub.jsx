import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useParams, useLocation } from 'react-router';

const EditClub = () => {
  const axiosSecure = useAxiosSecure();

  const { clubId } = useParams();
  const location = useLocation();
  const { managerEmail } = location.state || {};

  const {
    data: clubData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['singleClub', clubId],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/clubs/${clubId}?email=${managerEmail}`,
      );
      return response.data.data;
    },
    enabled: !!clubId && !!managerEmail,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clubName: '',
      bannerImage: '',
      category: '',
      membershipFee: 0,
      location: '',
      description: '',
    },
  });

  useEffect(() => {
    if (clubData) {
      reset({
        clubName: clubData.clubName || '',
        bannerImage: clubData.bannerImage || '',
        category: clubData.category || '',
        membershipFee: clubData.membershipFee || 0,
        location: clubData.location || '',
        description: clubData.description || '',
      });
    }
  }, [clubData, reset]);

  // Submit handler
  const onSubmit = async data => {
    try {
      const response = await axiosSecure.put(`/clubs/${clubId}`, data);
      if (response.data.success) {
        alert('Club updated successfully!');
      } else {
        alert('Failed to update club');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating club');
    }
  };

  if (isLoading) return <p>Loading club data...</p>;
  if (isError) return <p>Error fetching club data.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Club</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Club Name */}
        <div>
          <label className="label">
            <span className="label-text">Club Name</span>
          </label>
          <input
            type="text"
            {...register('clubName', { required: 'Club Name is required' })}
            className="input input-bordered w-full"
          />
          {errors.clubName && (
            <p className="text-red-500 mt-1">{errors.clubName.message}</p>
          )}
        </div>

        {/* Banner Image */}
        <div>
          <label className="label">
            <span className="label-text">Banner Image URL</span>
          </label>
          <input
            type="text"
            {...register('bannerImage', {
              required: 'Banner Image is required',
            })}
            className="input input-bordered w-full"
          />
          {errors.bannerImage && (
            <p className="text-red-500 mt-1">{errors.bannerImage.message}</p>
          )}
        </div>

        {/* Category + Membership Fee */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              className="input input-bordered w-full"
            />
            {errors.category && (
              <p className="text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Membership Fee ($)</span>
            </label>
            <input
              type="number"
              {...register('membershipFee', {
                required: 'Membership Fee is required',
                min: 0,
              })}
              className="input input-bordered w-full"
            />
            {errors.membershipFee && (
              <p className="text-red-500 mt-1">
                {errors.membershipFee.message}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="input input-bordered w-full"
          />
          {errors.location && (
            <p className="text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
            })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Update Club
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditClub;
