'use client';
import { useTranslations } from 'next-intl';

import PlaylistItem from '@/components/Shared/ListItems/PlaylistItem';
import useTrackStore from '@/stores/trackStore';
import NoteIcon from '@/svgs/icon-note';

export default function PlaylistsPage() {
  const t = useTranslations();
  const { playlists, toggleIsAddingPlaylist } = useTrackStore();

  return (
    <div className="md:pt-6 pt-4 px-6 md:px-8 max-h-full overflow-auto pb-20">
      <h3 className="text-2xl font-birdy items-center pl-6 mb-4 lg:pt-4 pt-5 flex capitalize text-text-color justify-between">
        <div className="flex gap-2">
          <div className="w-6 h-6 text-contrast-color">{NoteIcon}</div>
          {t('playlists')}
        </div>
        <button
          onClick={() => toggleIsAddingPlaylist(true)}
          className="px-2 text-center text-white py-3 bg-primary rounded-full leading-[6px] cursor-pointer hover:opacity-90 transition"
        >
          +
        </button>
      </h3>
      {playlists.map((playlist) => (
        <PlaylistItem isAlternate key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
}
