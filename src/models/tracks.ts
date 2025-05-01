export interface TrackModel {
  artwork: {
    '150x150': string;
    '480x480': string;
  };
  genre: string;
  description: string;
  title: string;
  duration: number;
  id: string;
}

export interface TrackUserModel {
  name: string;
  cover_photo: {
    '640x': string;
  };
  follower_count: number;
  bio: string;
  id: string;
}

export interface PlaylistModel {
  name?: string;
  description?: string;
  artwork?: string;
  id?: string;
  tracks?: TrackModel[];
  user?: TrackUserModel;
}

export interface RequestSearchParams {
  query: string;
  genre: string | null;
}
