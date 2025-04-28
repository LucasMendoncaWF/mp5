import type { TrackModel } from '@/models/tracks';

import { makeRequest } from './api';

function mapGenres(tracks: TrackModel[]) {
  const genreCount = new Map<string, number>();

  tracks.forEach((track) => {
    const genre = track.genre.trim();
    if (genre) {
      genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
    }
  });

  return Array.from(genreCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([genre]) => genre);
}

export const handler = async () => {
  try {
    const response: TrackModel[] = await makeRequest('/tracks/trending', {
      params: {
        limit: 30,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(mapGenres(response)),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error on searching trending musics', error: error.message }),
    };
  }
};
