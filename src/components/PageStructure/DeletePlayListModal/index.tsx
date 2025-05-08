'use client';

import { useTranslations } from 'next-intl';

import useTrackStore from '@/stores/trackStore';

import './DeletePlaylistModal.scss';
import PrimaryButton from '@/components/Shared/Buttons/PrimaryButton';

export default function DeletePlayListModal() {
  const t = useTranslations();
  const { openDeletePlayListModalId, onCloseRemovePlayListModal, removePlayList } = useTrackStore();

  if (!openDeletePlayListModalId) {
    return;
  }

  const onClickDelete = () => {
    removePlayList(openDeletePlayListModalId);
    onCloseRemovePlayListModal();
  };

  return (
    <div className="absolute top-0 left-0 z-9999 h-dvh w-dvw delete-playlist-modal__background">
      <div className="bg-background rounded-xl normal-case absolute min-w-80 top-1/5 left-1/10 w-8/10 p-6 lg:left-5/13 lg:w-3/13 absolute">
        <div className="text-text-color text-2xl font-bold">{t('confirmPlaylistDeletion')}</div>
        <div className="flex justify-between mt-5">
          <PrimaryButton onClick={onClickDelete} ariaLabel="confirm delete">
            {t('yesDelete')}
          </PrimaryButton>
          <button
            aria-label="cancel action"
            className="py-2 px-4 bg-background-secondary rounded-xl cursor-pointer hover:opacity-80 hover:scale-105 transition"
            onClick={onCloseRemovePlayListModal}
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
