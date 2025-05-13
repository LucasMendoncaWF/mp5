'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import { usePlaylistDetails } from '@/api/userPlaylists';
import EditPlaylistFields from '@/components/Pages/EditPlaylist/EditPlaylistFields';
import TrackDetailLoader from '@/components/Pages/TrackDetail/TrackDetailLoader';
import MusicListItem from '@/components/Shared/ListItems/MusicListItem';
import PlaylistDropDown from '@/components/Shared/ListItems/PlaylistItem/PlaylistDropDown';
import PlayButton from '@/components/Shared/Material/Buttons/PlayButton';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';
import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';
import { isLocalPlaylist } from '@/utils/general';

export default function PlaylistDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const queryParams = useSearchParams();
  const { playlists, setUserPlaylists } = useTrackStore();
  const { data, isLoading, hasError } = usePlaylistDetails(params.playlist_id as string);

  const isEditing = queryParams.get('mode') === 'edit';
  const isOfficialPlaylist = !isLocalPlaylist(params.playlist_id as string);
  const canEdit = isEditing && !isOfficialPlaylist;

  const [tracks, setTracks] = useState(data?.tracks || []);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.tracks) {
      setTracks(data.tracks);
    }
  }, [data?.tracks]);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;

    const newTracks = [...tracks];
    const draggedItem = newTracks[draggingIndex];
    newTracks.splice(draggingIndex, 1);
    newTracks.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setTracks(newTracks);
  };

  const handleDrop = () => {
    setDraggingIndex(null);
    const currentPlaylist = playlists.find((item) => item.id === data?.id);
    if (currentPlaylist && currentPlaylist.tracks) {
      currentPlaylist.tracks = tracks;
      setUserPlaylists([...playlists.filter((item) => item.id !== data?.id), currentPlaylist]);
    }
  };

  const onRemove = (track: TrackModel) => {
    const currentPlaylist = playlists.find((item) => item.id === data?.id);
    if (currentPlaylist && currentPlaylist.tracks) {
      currentPlaylist.tracks = currentPlaylist.tracks.filter((item) => item.id !== track.id);
      setUserPlaylists([...playlists.filter((item) => item.id !== data?.id), currentPlaylist]);
    }
  };

  if (isLoading || (!isOfficialPlaylist && !data)) {
    return <TrackDetailLoader />;
  }

  if (hasError || !data) {
    return <ErrorMessage>{t('playlistError')}</ErrorMessage>;
  }

  return (
    <div className="w-full max-h-full overflow-auto">
      <div className="p-6 relative">
        <div className="absolute md:right-5 right-8 md:top-5 top-8 z-9">
          <PlaylistDropDown isEditing={canEdit} playlist={data} />
        </div>
        <div className="absolute right-5 bottom-6">
          <PlayButton isPlaylist playList={data} />
        </div>
        <div className="flex flex-wrap items-end gap-5">
          <div
            className="link-hover relative text-text-color md:w-70 md:h-70 w-full aspect-square bg-primary bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${data.artwork || '/images/placeholder.jpg'})`,
            }}
          ></div>
          {canEdit ? (
            <EditPlaylistFields data={data} />
          ) : (
            <div className="pr-15 mt-3  text-text-color">
              <div className="font-birdy capitalize md:text-2xl">{data.name}</div>
              <div className="normal-case w-full break-all">{data.description}</div>
            </div>
          )}
        </div>
      </div>

      {isOfficialPlaylist && isEditing && (
        <div className="p-6 bg-background-secondary text-red-600 normal-case">
          {t('cantEditOfficialPlaylist')}
        </div>
      )}

      <div className="p-6 pb-20">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            draggable={canEdit}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className={`transition-all ${draggingIndex === index ? 'opacity-50' : ''}`}
          >
            <MusicListItem onRemove={onRemove} hasDragIcon={canEdit} track={track} />
          </div>
        ))}
      </div>
    </div>
  );
}
