import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../../Material/DropDownMenu';
import DropDownButton from '../../Material/DropDownMenu/DropDownButton';

interface Props {
  track: TrackModel;
  // eslint-disable-next-line no-unused-vars
  onRemove?: (track: TrackModel) => void;
}

export default function MusicItemDropDown({ track, onRemove }: Props) {
  const t = useTranslations();
  const { currentPlayList, addOrRemoveToQueue, handleAddToPlaylistModal } = useTrackStore();

  const isOnQueue = currentPlayList?.tracks?.find((item) => item.id === track.id);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 80);
  };

  const onClickQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOrRemoveToQueue(track);
    onCloseMenu();
  };

  const onAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleAddToPlaylistModal(track);
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
        <DropDownButton ariaLabel="Add or Remove from Queue" onClick={onClickQueue}>
          {isOnQueue ? t('removeFromQueue') : t('addToQueue')}
        </DropDownButton>

        <DropDownButton ariaLabel="Add to playlist" onClick={onAddToPlaylist}>
          {t('addToPlaylist')}
        </DropDownButton>
        {onRemove && (
          <DropDownButton ariaLabel="Add to playlist" onClick={() => onRemove(track)}>
            {t('remove')}
          </DropDownButton>
        )}
      </DropDownMenu>
    </div>
  );
}
