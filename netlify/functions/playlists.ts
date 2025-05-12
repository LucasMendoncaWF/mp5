import type { HandlerEvent } from '@netlify/functions';

import { makeRequest } from './api';
import type { ResponsePlaylistModel } from './utils/parsePlaylist';
import { parsePlaylist } from './utils/parsePlaylist';

export const handler = async (event: HandlerEvent) => {
  const path = event.path;
  if (path.includes('/details')) {
    const splitted = path.split('/');
    return getById(splitted[splitted.length - 1]);
  }

  return getTrending();
};

const getTrending = async () => {
  try {
    const response: ResponsePlaylistModel[] = await makeRequest('/playlists/trending');

    if (!response.length) {
      return [];
    }
    const newPlaylists = await parsePlaylist(response.slice(0, 4));

    return {
      statusCode: 200,
      body: JSON.stringify(newPlaylists),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on fetching user playlists', error: error.message }),
    };
  }
};

const getById = async (id: string) => {
  try {
    const response: ResponsePlaylistModel[] = await makeRequest(`/playlists/${id}`);

    if (!response.length) {
      return [];
    }
    const newPlaylists = await parsePlaylist(response.slice(0, 4));

    return {
      statusCode: 200,
      body: JSON.stringify(newPlaylists[0]),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on fetching user playlists', error: error.message }),
    };
  }
};
