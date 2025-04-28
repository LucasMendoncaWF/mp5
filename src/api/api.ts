import axios from 'axios';
export const apiBaseUrl = '/.netlify/functions';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
