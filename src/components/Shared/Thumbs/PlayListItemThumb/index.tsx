'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import routes from '@/app/routes';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../../Material/DropDownMenu';
import PlayButton from '../../Material/Buttons/PlayButton';

import './PlaylistThumbItem.scss';
import DropDownButton from '../../Material/DropDownMenu/DropDownButton';

export default function PlaylistThumbItem({ playlist }: { playlist: PlaylistModel }) {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { addPlayList } = useTrackStore();
  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 50);
  };

  const onSavePlaylist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addPlayList(playlist);
    onCloseMenu();
  };

  return (
    <div className="py-2 md:px-4 px-2 2xl:w-1/3 w-1/2 aspect-square" onMouseLeave={onCloseMenu}>
      <Link aria-label="Playlist Details" href={`${routes.playlists}/${playlist.id}`}>
        <div
          className="link-hover relative text-text-color h-full w-full  bg-primary bg-center bg-no-repeat bg-cover flex-wrap items-end flex"
          style={{
            backgroundImage: `url(${playlist.artwork || '/images/placeholder.jpg'})`,
          }}
        >
          <div className="w-full md:h-1/4 h-1/3">
            <div className="p-4 w-full h-full relative z-2">
              <div className="music-thumb-gradient absolute bottom-0 left-0 w-full h-full z-1"></div>
              <div className="flex w-full h-full items-center justify-between  relative z-3">
                <div className="text-sm line-clamp-2 font-bold dark:text-white music-item-thumb-title ">
                  {playlist.name}
                </div>
                <PlayButton playList={playlist} isPlaylist />
              </div>
            </div>
          </div>
          <div className="absolute top-1 right-2 z-2">
            <DropDownMenu
              direction="bottom"
              hasBorder
              size={1.4}
              gap={1}
              isMenuOpen={isMenuOpen}
              setMenuOpen={setMenuOpen}
            >
              <DropDownButton ariaLabel="Save Playlist" onClick={onSavePlaylist}>
                {t('savePlaylist')}
              </DropDownButton>
            </DropDownMenu>
          </div>
        </div>
      </Link>
    </div>
  );
}
