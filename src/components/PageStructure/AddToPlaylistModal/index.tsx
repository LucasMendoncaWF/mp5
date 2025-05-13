'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';
import { isLocalPlaylist } from '@/utils/general';

export default function AddToPlaylistModal() {
  const t = useTranslations();
  const { addToPlaylistModal, playlists, handleAddToPlaylistModal, setUserPlaylists } =
    useTrackStore();
  const [search, setSearch] = useState('');
  if (!addToPlaylistModal) {
    return;
  }

  const onClickPlaylist = (playlist: PlaylistModel) => {
    const newPlaylist = { ...playlist };
    if (!newPlaylist.tracks || !newPlaylist.tracks.length) {
      newPlaylist.tracks = [];
    }
    newPlaylist.tracks = newPlaylist.tracks.filter((track) => track.id !== addToPlaylistModal.id);
    newPlaylist.tracks.push(addToPlaylistModal);
    setUserPlaylists([...playlists.filter((item) => item.id !== playlist.id), newPlaylist]);
    handleAddToPlaylistModal(null);
  };

  const editablePlaylists = playlists.filter((item) => !!isLocalPlaylist(item.id));
  return (
    <div className="absolute top-0 left-0 z-9999 h-dvh w-dvw modal__background">
      <div className="bg-background rounded-xl normal-case absolute min-w-80 top-1/5 left-1/10 w-8/10 p-6 lg:left-5/13 lg:w-3/13 absolute">
        <div className="text-text-color text-2xl font-bold">{t('addToPlaylist')}</div>
        <div className="relative">
          <label className="absolute left-4 top-6 text-text-color" htmlFor="playlist_name_modal">
            {search ? '' : `${t('playlistName')}*`}
          </label>
          <input
            className="border-2 border-text-color rounded-md w-full mt-4 px-4 py-2 text-text-color"
            type="text"
            id="playlist_name_modal"
            maxLength={100}
            autoComplete="off"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="max-h-200 overflow-auto mt-4">
          {editablePlaylists
            .slice(0, 4)
            .filter((item) => item.name?.includes(search))
            .map((playlist) => (
              <button
                className="w-full py-2 cursor-pointer bg-background-secondary my-1 transition normal-case hover:opacity-60"
                onClick={() => onClickPlaylist(playlist)}
                key={playlist.id}
              >
                {playlist.name}
              </button>
            ))}
        </div>
        <button
          aria-label="cancel action"
          className="py-2 px-4 mt-4 bg-background-secondary rounded-xl cursor-pointer hover:opacity-80 hover:scale-105 transition"
          onClick={() => handleAddToPlaylistModal(null)}
        >
          {t('cancel')}
        </button>
      </div>
    </div>
  );
}
