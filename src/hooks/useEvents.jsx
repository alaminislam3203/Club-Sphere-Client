import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';


const useEvents = (filters = {}) => {
    const axiosInstance = useAxios();

    const { clubId, isPaid, location } = filters;

    // Build query params dynamically
    const queryParams = new URLSearchParams();
    if (clubId) queryParams.append('clubId', clubId);
    if (isPaid !== undefined && isPaid !== null) {
        queryParams.append('isPaid', isPaid);
    }
    if (location) queryParams.append('location', location);

    const { data: events = [], isLoading, isError } = useQuery({
        queryKey: ['events-upcoming', filters],
        queryFn: async () => {
            const res = await axiosInstance.get(`/events/upcoming?${queryParams.toString()}`);
            return res.data;
        }
    });

    return { events, isLoading, isError };
};

export default useEvents;
