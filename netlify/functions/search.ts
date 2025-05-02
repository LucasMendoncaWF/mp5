import type { HandlerEvent } from '@netlify/functions';

import { makeRequest } from './api';
import type { ResponsePlaylistModel } from './utils/parsePlaylist';
import { parsePlaylist } from './utils/parsePlaylist';

interface NextParams {
  query?: string;
  genre?: string[];
  limit?: number;
  sort_method: string;
}

export const handler = async (event: HandlerEvent) => {
  const params = event.queryStringParameters || {};
  const newParams: NextParams = {
    limit: 6,
    sort_method: 'popular',
  };
  if (!!params?.genre) {
    newParams.genre = [params.genre];
  }
  if (!!params?.query) {
    newParams.query = params.query;
  }

  const path = event.path;

  if (path.endsWith('/tracks')) {
    newParams.limit = 20;
    return searchTracks(newParams);
  }

  if (path.endsWith('/playlists')) {
    return searchPlaylists(newParams);
  }

  if (path.endsWith('/artists')) {
    return searchArtists(newParams);
  }
};

const searchTracks = async (params: NextParams) => {
  try {
    const response = await makeRequest('/tracks/search', {
      params,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching musics', error: error.message }),
    };
  }
};

const searchPlaylists = async (params: NextParams) => {
  try {
    const response: ResponsePlaylistModel[] = await makeRequest('/playlists/search', {
      params,
    });
    const newPlaylists = await parsePlaylist(response);

    return {
      statusCode: 200,
      body: JSON.stringify(newPlaylists),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching musics', error: error.message }),
    };
  }
};

const searchArtists = async (params: NextParams) => {
  try {
    const response = await makeRequest('/users/search', {
      params,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching musics', error: error.message }),
    };
  }
};
