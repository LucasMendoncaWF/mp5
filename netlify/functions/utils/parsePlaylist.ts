import type { PlaylistModel, TrackModel, TrackUserModel } from '@/models/tracks';

import { makeRequest } from '../api';

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

export const parsePlaylist = async (response: ResponsePlaylistModel[]) => {
  const playlists = response.filter((item) => !!item.playlist_contents.length);

  const ids = playlists
    .filter((item) => !!item.playlist_contents.length)
    .flatMap((item) => item.playlist_contents.map((content) => content.track_id));

  let tracks: TrackModel[] = [];
  if (ids.length) {
    tracks = await makeRequest('/tracks', {
      params: {
        id: ids,
      },
    });
  }

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

  return newPlaylists;
};
