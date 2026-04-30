import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000/',
});

const useAxiosSecure = () => {
  const { user, loading, signOutUserFunction } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // Request Interceptor
      const reqInterceptor = axiosSecure.interceptors.request.use(
        async config => {
          const token = await user.getIdToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => Promise.reject(error),
      );

      // Response Interceptor
      const resInterceptor = axiosSecure.interceptors.response.use(
        response => response,
        async error => {
          const statusCode = error.response?.status;
        },
      );

      return () => {
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
      };
    }
  }, [user, signOutUserFunction, navigate, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
