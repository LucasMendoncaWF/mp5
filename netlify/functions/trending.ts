import api from './api';

export const handler = async () => {
  try {
    const response = await api.get('/tracks/trending', {
      params: {
        limit: 10,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching musics', error: error.message }),
    };
  }
};
