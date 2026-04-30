import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useEvents from '../../../../hooks/useEvents';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const EditEvent = () => {
  const { id } = useParams();
  const { events, isLoading, isError } = useEvents();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [existingEvent, setExistingEvent] = useState(null);

  // Find the event when events are loaded
  useEffect(() => {
    if (events && events.length > 0) {
      const event = events.find(e => e._id === id);
      setExistingEvent(event);
    }
  }, [events, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: existingEvent || {},
  });

  // Reset form values when existingEvent is loaded
  useEffect(() => {
    if (existingEvent) {
      reset(existingEvent);
    }
  }, [existingEvent, reset]);

  const onSubmit = async data => {
    const eventInfo = {
      ...data,
      isPaid: !!data.isPaid,
      eventFee: Number(data.eventFee),
      maxAttendees: Number(data.maxAttendees),
    };

    try {
      const response = await axiosSecure.patch(`/events/${id}`, eventInfo);
      Swal.fire({
        title: 'Success!',
        text: 'Event updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update event',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load event.</p>;
  if (!existingEvent) return <p>Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="btn btn-outline mb-4"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="input input-bordered w-full"
            placeholder="Event Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* isPaid + Location */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label cursor-pointer">
              <span className="label-text">Is Paid?</span>
              <input
                type="checkbox"
                {...register('isPaid')}
                className="checkbox ml-2"
              />
            </label>
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              {...register('location')}
              className="input input-bordered w-full"
              placeholder="Event Location"
            />
          </div>
        </div>

        {/* Event Date + Event Fee */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Event Date</span>
            </label>
            <input
              type="date"
              {...register('eventDate')}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Event Fee</span>
            </label>
            <input
              type="number"
              {...register('eventFee', { min: 0 })}
              className="input input-bordered w-full"
              placeholder="0"
            />
          </div>
        </div>

        {/* Club Title + Max Attendees */}
        <div className="flex gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Club Title</span>
            </label>
            <input
              type="text"
              {...register('clubTitle')}
              className="input input-bordered w-full"
              placeholder="Club Name"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Max Attendees</span>
            </label>
            <input
              type="number"
              {...register('maxAttendees', { min: 0 })}
              className="input input-bordered w-full"
              placeholder="Max Attendees"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description')}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Event Description"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
