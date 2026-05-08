import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: 'https://club-sphere-server-a11b12.vercel.app/',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
