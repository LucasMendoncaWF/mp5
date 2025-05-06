import { headers } from 'next/headers';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import React from 'react';

import Header from '@/components/PageStructure/Header';
import PreRender from '@/components/Shared/PreRender';
import { routing } from '@/i18n/routing';
import nextIntlConfig from '@/locales/languages';

import './globals.scss';

async function getThemeFromHeaders() {
  const headersList = headers();
  const theme = (await headersList).get('theme');
  return theme === 'light' ? 'light' : 'dark';
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const theme = await getThemeFromHeaders();
  const { locale } = await params;
  let newLocale = await nextIntlConfig.defaultLocale;
  if (hasLocale(routing.locales, locale)) {
    newLocale = locale;
  }

  return (
    <html lang={newLocale} data-theme={theme} className={theme}>
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
