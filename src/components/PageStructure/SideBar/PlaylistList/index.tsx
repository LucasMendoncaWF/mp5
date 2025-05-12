'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { useUserPlaylist } from '@/api/userPlaylists';
import useTrackStore from '@/stores/trackStore';

import PlayListSkeleton from './PlaylistSkeleton';
import PlaylistItem from '../../../Shared/ListItems/PlaylistItem';

export default function PlaylistList() {
  const t = useTranslations();
  const { setUserPlaylists, playlists } = useTrackStore();
  const { isLoading, data, hasError } = useUserPlaylist({ enabled: !playlists.length });

  useEffect(() => {
    if (data && !playlists.length) {
      setUserPlaylists(data);
    }
  }, [playlists, data, setUserPlaylists]);

  if (isLoading && !playlists.length) {
    return <PlayListSkeleton />;
  }

  if (hasError || !playlists?.length) {
    return null;
  }

  return (
    <div>
      {playlists.slice(0, 7).map((playlist) => (
        <PlaylistItem isSidebar key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
