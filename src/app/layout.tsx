import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

const DeletePlayListModal = dynamic(() => import('@/components/PageStructure/DeletePlayListModal'));
const MusicPlayer = dynamic(() => import('@/components/PageStructure/MusicPlayer'));
const SideBar = dynamic(() => import('@/components/PageStructure/SideBar'));
const MobileMenu = dynamic(() => import('@/components/Shared/MobileMenu'));
import Header from '@/components/PageStructure/Header';
import HidePlayerWrapper from '@/components/PageStructure/playerWrapper';
import PlayerWrapper from '@/components/PageStructure/playerWrapper';
import PreRender from '@/components/Shared/PreRender';
import './globals.scss';
import { getLanguageFromCookies, getThemeFromCookies } from '@/utils/handleCookies';

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const theme = await getThemeFromCookies();
  const locale = await getLanguageFromCookies();

  return (
    <html lang={locale} data-theme={theme} className={theme}>
      <head>
        <title>Music Player</title>
        <meta name="description" content="Music Player demo for portfolio" />
      </head>
      <body>
        <PreRender />
        <NextIntlClientProvider>
          <Header />
          <div className="h-full">
            <DeletePlayListModal />
            <PlayerWrapper>{children}</PlayerWrapper>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
