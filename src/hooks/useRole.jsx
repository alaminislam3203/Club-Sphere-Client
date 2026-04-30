import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  console.log(user);
  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('No user email available');
      }
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || 'member';
    },
    enabled: !!user?.email,
    retry: false,
  });

  return { role, roleLoading };
};

export default useRole;
