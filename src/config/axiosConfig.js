import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  const createdAt = sessionStorage.getItem('createdAt');

  if (token && createdAt) {
    const now = Date.now();
    const thirtyMinutes = 50 * 60 * 1000;
    if (now - parseInt(createdAt, 10) > thirtyMinutes) {
      sessionStorage.clear();
      window.location.href = '/';
      return Promise.reject(new Error('Session expired. Redirecting to login.'));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default axiosInstance;
