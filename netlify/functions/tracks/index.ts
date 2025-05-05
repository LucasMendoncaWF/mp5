import type { HandlerEvent } from '@netlify/functions';

import { makeRequest } from '../api';

export const handler = async (event: HandlerEvent) => {
  const path = event.path;

  if (path.endsWith('/trending')) {
    return getTrending();
  }

  if (path.endsWith('/recommended')) {
    return getRecommended();
  }

  const splitted = path.split('/');
  return getById(splitted[splitted.length - 1]);
};

const getTrending = async () => {
  try {
    const response = await makeRequest('/tracks/trending', {
      params: {
        limit: 10,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};

const getRecommended = async () => {
  try {
    const response = await makeRequest('/tracks/trending/underground', {
      params: {
        limit: 10,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};

const getById = async (id: string) => {
  try {
    const response = await makeRequest(`/tracks/${id}`);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};
