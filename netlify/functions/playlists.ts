import { makeRequest } from './api';
import type { ResponsePlaylistModel } from './utils/parsePlaylist';
import { parsePlaylist } from './utils/parsePlaylist';

export const handler = async () => {
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
