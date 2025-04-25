import axios from 'axios';

const api = axios.create({
  baseURL: 'https://discoveryprovider2.audius.co/v1/',
  params: { app_name: 'lucas_media_player' },
});

export default api;
