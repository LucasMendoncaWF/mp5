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
  console.log(theme)
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
  let newLocale = nextIntlConfig.defaultLocale;
  if (hasLocale(routing.locales, locale)) {
    newLocale = locale;
  }

  return (
    <html lang={newLocale} data-theme={theme} className={theme}>
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
