import axios from 'axios';

export const APP_NAME = 'lucas-media-player-mp5';

interface OptionsRequest {
  params?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT';
  data?: any;
}

export async function getBaseUrl() {
  const { data } = await axios.get('https://api.audius.co');
  const firstUrl = data.data[0];
  return firstUrl;
}

export async function makeRequest(endpoint: string, options: OptionsRequest = { method: 'GET' }) {
  const baseUrl = await getBaseUrl();
  const url = new URL(`${baseUrl}/v1${endpoint}`);
  url.searchParams.append('app_name', APP_NAME);

  if (options.params) {
    for (const [key, value] of Object.entries(options.params)) {
      url.searchParams.append(key, value);
    }
  }

  const response = await axios({
    url: url.toString(),
    method: options.method || 'GET',
    data: options.data || null,
  });
  return response.data.data;
}
