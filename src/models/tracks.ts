export interface TrackModel {
  artwork: {
    '150x150': string;
    '480x480': string;
    '1000x1000': string;
  };
  genre: string;
  description: string;
  title: string;
  duration: number;
  id: string;
  user: TrackUserModel;
}

export interface TrackUserModel {
  name: string;
  cover_photo: {
    '640x': string;
  };
  follower_count: number;
  instagram_handle: string;
  bio: string;
  id: string;
  tracks?: TrackModel[];
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
