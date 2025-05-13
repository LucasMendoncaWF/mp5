import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import routes from '@/app/routes';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../../Material/DropDownMenu';
import DropDownButton from '../../Material/DropDownMenu/DropDownButton';

export default function PlaylistDropDown({
  playlist,
  isEditing,
}: {
  playlist: PlaylistModel;
  isEditing?: boolean;
}) {
  const { setCurrentPlayList, setPlaying, setOpenRemovePlayListModal } = useTrackStore();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  const onClickPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (playlist.tracks?.length) {
      setCurrentPlayList(playlist);
      setPlaying(true);
    }
    onCloseMenu();
  };

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (playlist.id) {
      setOpenRemovePlayListModal(playlist.id);
    }
    onCloseMenu();
  };

  const onClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onCloseMenu();
    if (playlist.id) {
      redirect(`${routes.playlists}/${playlist.id}${isEditing ? '' : '?mode=edit'}`);
    }
  };
  const t = useTranslations();
  return (
    <DropDownMenu direction="bottom" setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}>
      <DropDownButton ariaLabel="Play playlist" onClick={onClickPlay}>
        {t('play')}
      </DropDownButton>
      <DropDownButton ariaLabel="Edit Playlist" onClick={onClickEdit}>
        {isEditing ? t('stopEdit') : t('edit')}
      </DropDownButton>
      <DropDownButton ariaLabel="Delete playlist" onClick={onClickDelete}>
        {t('delete')}
      </DropDownButton>
    </DropDownMenu>
  );
}
