import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';


const useClubs = (filters = {}) => {
    const axiosInstance = useAxios();

    const { category, location, managerEmail } = filters;

    // Build query params dynamically
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (location) queryParams.append('location', location);
    if (managerEmail) queryParams.append('managerEmail', managerEmail);

    const { data: clubs = [], isLoading, isError } = useQuery({
        queryKey: ['clubs', filters],
        queryFn: async () => {
            const res = await axiosInstance.get(`/clubs?${queryParams.toString()}`);
            return res.data;
        },
    });

    return { clubs, isLoading, isError };
};

export default useClubs;
