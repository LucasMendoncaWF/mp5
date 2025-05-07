import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import Header from '@/components/PageStructure/Header';
import PreRender from '@/components/Shared/PreRender';
import './globals.scss';
import { getLanguageFromHeaders, getThemeFromHeaders } from '@/utils/handleHeaders';

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
  const theme = await getThemeFromHeaders();
  const locale = await getLanguageFromHeaders();

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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
