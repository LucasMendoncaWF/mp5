import type { HandlerEvent } from '@netlify/functions';

import { makeRequest } from './api';

export const handler = async (event: HandlerEvent) => {
  const path = event.path;
  const splitted = path.split('/');
  return getById(splitted[splitted.length - 1]);
};

const getById = async (id: string) => {
  try {
    const response = await makeRequest(`/users/${id}`);
    const tracks = await makeRequest(`/users/${id}/tracks`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        ...response,
        tracks,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};
