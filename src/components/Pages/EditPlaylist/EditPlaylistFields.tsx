import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import routes from '@/app/routes';
import PrimaryButton from '@/components/Shared/Material/Buttons/PrimaryButton';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

export default function EditPlaylistFields({ data }: { data: PlaylistModel }) {
  const t = useTranslations();
  const { setUserPlaylists, playlists } = useTrackStore();
  const [name, setName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);

  const onSaveChanges = () => {
    const newPlaylist: PlaylistModel = { ...data };
    newPlaylist.name = name;
    newPlaylist.description = description;
    setUserPlaylists([...playlists.filter((item) => item.id !== data.id), newPlaylist]);
    redirect(`${routes.playlists}/${data.id}`);
  };
  return (
    <div className="md:w-1/2 w-full">
      <div className="relative">
        <label className="absolute left-4 top-6 text-text-color" htmlFor="playlist_name">
          {name ? '' : `${t('playlistName')}*`}
        </label>
        <input
          className="border-2 border-text-color rounded-md w-full mt-4 px-4 py-2 text-text-color"
          type="text"
          id="playlist_name"
          maxLength={100}
          autoComplete="off"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="relative">
        <label className="absolute left-4 top-6 text-text-color" htmlFor="playlist_description">
          {description ? '' : `${t('playlistDescription')}*`}
        </label>
        <textarea
          className="border-2 resize-none border-text-color rounded-md w-full mt-4 px-4 py-2 text-text-color"
          rows={4}
          id="playlist_description"
          maxLength={100}
          autoComplete="off"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <PrimaryButton ariaLabel="save changes" onClick={onSaveChanges}>
        {t('saveChanges')}
      </PrimaryButton>
    </div>
  );
}
