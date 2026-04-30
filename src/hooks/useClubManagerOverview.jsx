// hooks/useClubManagerOverview.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useClubManagerOverview = (managerEmail, role) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, refetch } = useQuery(
    ['clubManagerOverview', managerEmail, role],
    async () => {
      if (!managerEmail) {
        throw new Error('Manager email is required');
      }

      const params = { managerEmail };
      if (role) params.role = role;

      const response = await axiosSecure.get('/club-manager-overview', {
        params,
      });
      return response.data;
    },
    {
      enabled: !!managerEmail,
      staleTime: 5 * 60 * 1000,
    },
  );

  return { data, isLoading, isError, refetch };
};

export default useClubManagerOverview;
