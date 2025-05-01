import type { HandlerEvent } from '@netlify/functions';

import type { PlaylistModel, TrackModel, TrackUserModel } from '@/models/tracks';

import { makeRequest } from './api';

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

export interface ResponsePlaylistModel {
  artwork: {
    '150x150': string;
    '480x480': string;
  };
  id: string;
  description: string;
  playlist_name: string;
  playlist_contents: {
    timestamp: number;
    track_id: string;
  }[];
  user: TrackUserModel;
}

const searchPlaylists = async (params: NextParams) => {
  try {
    const response: ResponsePlaylistModel[] = await makeRequest('/playlists/search', {
      params,
    });
    const playlists = response.filter((item) => !!item.playlist_contents.length);

    const ids = playlists
      .filter((item) => !!item.playlist_contents.length)
      .flatMap((item) => item.playlist_contents.map((content) => content.track_id));

    const tracks: TrackModel[] = await makeRequest('/tracks', {
      params: {
        id: ids,
      },
    });

    const newPlaylists: PlaylistModel[] = playlists
      .map((playlist) => {
        const newTracks: TrackModel[] = playlist.playlist_contents
          .map((content) => tracks.find((track) => track.id === content.track_id))
          .filter((item) => !!item);
        return {
          name: playlist.playlist_name,
          description: playlist.description,
          artwork: playlist.artwork['480x480'],
          id: playlist.id,
          user: playlist.user,
          tracks: newTracks,
        } as PlaylistModel;
      })
      .filter((playlist) => !!playlist.tracks?.length);

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
