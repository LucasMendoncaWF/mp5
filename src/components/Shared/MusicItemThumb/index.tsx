'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import routes from '@/app/routes';
import type { TrackModel } from '@/models/tracks';

import DropDownMenu from '../DropDownMenu';
import PlayButton from '../PlayButton';
import './MusicItemThumb.scss';

export default function MusicItemThumb({ track }: { track: TrackModel }) {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 20);
  };

  return (
    <div className="py-2 md:px-4 px-2" onBlur={onCloseMenu}>
      <Link href={`${routes.track}/${track.id}`}>
        <div
          className="link-hover relative text-text-color md:w-70 md:h-70 w-50 h-50 bg-primary bg-center bg-no-repeat bg-cover flex-wrap items-end flex"
          style={{ backgroundImage: `url(${track.artwork['480x480']})` }}
        >
          <div className="w-full md:h-1/4 h-1/3">
            <div className="p-4 w-full h-full relative z-2">
              <div className="music-thumb-gradient absolute bottom-0 left-0 w-full h-full z-1"></div>
              <div className="flex w-full h-full items-center justify-between  relative z-3">
                <div className="text-sm line-clamp-2 font-bold dark:text-white music-item-thumb-title ">
                  {track.title}
                </div>
                <PlayButton track={track} />
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
              <button
                onClick={onCloseMenu}
                className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
              >
                {t('addFavorite')}
              </button>
              <button
                onClick={onCloseMenu}
                className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
              >
                {t('addToPlaylist')}
              </button>
            </DropDownMenu>
          </div>
        </div>
      </Link>
    </div>
  );
}
