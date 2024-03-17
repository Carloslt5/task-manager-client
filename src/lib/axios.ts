import Axios, { InternalAxiosRequestConfig } from 'axios';

function addToken(config: InternalAxiosRequestConfig) {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    config.headers!['Authorization'] = `Bearer ${storedToken}`;
  }
  return config;
}
export const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

axios.interceptors.request.use(addToken);
