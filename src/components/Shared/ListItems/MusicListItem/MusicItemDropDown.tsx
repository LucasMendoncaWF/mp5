import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../../Material/DropDownMenu';
import DropDownButton from '../../Material/DropDownMenu/DropDownButton';

export default function MusicItemDropDown({ track }: { track: TrackModel }) {
  const t = useTranslations();
  const { favorites, currentPlayList, addOrRemoveToQueue, addOrRemoveToFavorites } =
    useTrackStore();

  const isOnFavorites = favorites.find((item) => item.id === track.id);
  const isOnQueue = currentPlayList?.tracks?.find((item) => item.id === track.id);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 80);
  };

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOrRemoveToFavorites(track);
    onCloseMenu();
  };

  const onClickQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOrRemoveToQueue(track);
    onCloseMenu();
  };
  return (
    <div onBlur={onCloseMenu}>
      <DropDownMenu
        direction="bottom"
        hasBorder
        size={1.4}
        gap={1}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      >
        <DropDownButton ariaLabel="Add or Remove from Favorites" onClick={onClickFavorite}>
          {isOnFavorites ? t('removeFavorite') : t('addFavorite')}
        </DropDownButton>

        <DropDownButton ariaLabel="Add or Remove from Queue" onClick={onClickQueue}>
          {isOnQueue ? t('removeFromQueue') : t('addToQueue')}
        </DropDownButton>

        <DropDownButton ariaLabel="Add to playlist" onClick={onCloseMenu}>
          {t('addToPlaylist')}
        </DropDownButton>
      </DropDownMenu>
    </div>
  );
}
