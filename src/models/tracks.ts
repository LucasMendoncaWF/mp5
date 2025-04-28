export interface TrackModel {
  artwork: {
    '150x150': string;
    '480x480': string;
  };
  description: string;
  title: string;
  track_cid: string;
  is_streamable: boolean;
  genre: string;
  user: TrackUserModel;
  id: string;
}

export interface TrackUserModel {
  name: string;
  cover_photo: {
    '640x': string;
  };
  follower_count: number;
  bio: string;
}

export interface PlaylistModel {
  name?: string;
  description?: string;
  date_created?: string;
  artwork?: string;
  id: string;
  tracks: TrackModel[];
}
