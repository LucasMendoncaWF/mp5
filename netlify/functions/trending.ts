import { makeRequest } from './api';

export const handler = async () => {
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
