import Axios, { InternalAxiosRequestConfig } from 'axios';

function addToken(config: InternalAxiosRequestConfig) {
  const tokenString = localStorage.getItem('auth');
  if (tokenString) {
    const tokenObject = JSON.parse(tokenString);
    config.headers['Authorization'] = `Bearer ${tokenObject.state.authToken}`;
  }
  return config;
}
export const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

axios.interceptors.request.use(addToken);
