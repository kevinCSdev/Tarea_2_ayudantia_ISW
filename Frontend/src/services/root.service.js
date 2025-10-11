import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';

const instance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

instance.interceptors.request.use(config => {
  //Verificar que el token realmente es almacenado
  const token = sessionStorage.getItem('jwt-auth');
  console.log('Token enviado en header:', token);
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default instance;
