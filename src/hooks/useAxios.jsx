import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
  baseURL: 'https://club-sphere-web.netlify.app/',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
