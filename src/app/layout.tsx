import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

const DeletePlayListModal = dynamic(() => import('@/components/PageStructure/DeletePlayListModal'));
const CreatePlaylistModal = dynamic(() => import('@/components/PageStructure/CreatePlaylistModal'));
import Header from '@/components/PageStructure/Header';
import PlayerWrapper from '@/components/PageStructure/PlayerWrapper';
import PreRender from '@/components/Shared/PreRender';
import './globals.scss';
import { getLanguageFromCookies, getThemeFromCookies } from '@/utils/handleCookies';
const AddToPlaylistModal = dynamic(() => import('@/components/PageStructure/AddToPlaylistModal'));

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
            <AddToPlaylistModal />
            <CreatePlaylistModal />
            <DeletePlayListModal />
            <PlayerWrapper>{children}</PlayerWrapper>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
