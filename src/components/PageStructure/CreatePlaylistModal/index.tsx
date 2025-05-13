'use client';

import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import routes from '@/app/routes';
import PrimaryButton from '@/components/Shared/Material/Buttons/PrimaryButton';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';
import useTrackStore from '@/stores/trackStore';
import { localPlaylistString } from '@/utils/general';

export default function CreatePlaylistModal() {
  const t = useTranslations();
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [descriptionInput, setDescriptionInput] = useState('');
  const { isAddingPlaylist, toggleIsAddingPlaylist, addPlayList, playlists } = useTrackStore();

  if (!isAddingPlaylist) {
    return;
  }

  const onAdd = async () => {
    if (nameInput) {
      const hash = await generateHashSHA256(nameInput);
      const id = `${localPlaylistString}_${hash}`;
      if (playlists.find((item) => item.name === nameInput)) {
        setError(t('PlaylistIdError'));
        return;
      }
      addPlayList({
        id,
        name: nameInput,
        description: descriptionInput,
      });
      toggleIsAddingPlaylist(false);
      setNameInput('');
      setDescriptionInput('');
      redirect(`${routes.playlists}/${id}?mode=edit`);
    }
    setError(t('PlaylistNameError'));

    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const generateHashSHA256 = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36).slice(0, 10);
  };

  return (
    <div className="absolute top-0 left-0 z-9999 h-dvh w-dvw modal__background">
      <div className="bg-background rounded-xl normal-case absolute min-w-80 top-1/5 left-1/10 w-8/10 p-6 lg:left-5/13 lg:w-3/13 absolute">
        <div className="text-text-color text-2xl font-bold">{t('addPlaylist')}</div>
        <div className="relative">
          <label className="absolute left-4 top-6 text-text-color" htmlFor="playlist_name_modal">
            {nameInput ? '' : `${t('playlistName')}*`}
          </label>
          <input
            className="border-2 border-text-color rounded-md w-full mt-4 px-4 py-2 text-text-color"
            type="text"
            id="playlist_name_modal"
            maxLength={100}
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        </div>

        <div className="relative">
          <label
            className="absolute left-4 top-6 text-text-color"
            htmlFor="playlist_description_modal"
          >
            {descriptionInput ? '' : t('playlistDescription')}
          </label>
          <textarea
            className="border-2 border-text-color min-h-15 rounded-md w-full mt-4 px-4 py-2 text-text-color"
            id="playlist_description_modal"
            rows={5}
            value={descriptionInput}
            onChange={(e) => {
              setDescriptionInput(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between mt-5">
          <PrimaryButton onClick={onAdd} ariaLabel="confirm delete">
            {t('addPlaylist')}
          </PrimaryButton>
          <button
            aria-label="cancel action"
            className="py-2 px-4 bg-background-secondary rounded-xl cursor-pointer hover:opacity-80 hover:scale-105 transition"
            onClick={() => toggleIsAddingPlaylist(false)}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
