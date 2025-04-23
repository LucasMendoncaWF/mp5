import { headers } from 'next/headers';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import React from 'react';

import Footer from '@/components/PageStructure/Footer';
import Header from '@/components/PageStructure/Header';
import { routing } from '@/i18n/routing';

import nextIntlConfig from '../../next-intl.config';

import './globals.scss';

async function getThemeFromHeaders() {
  const headersList = headers();
  const theme = (await headersList).get('x-theme');
  return theme === 'dark' ? 'dark' : 'light';
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
        <NextIntlClientProvider>
          <Header />
          <div className="main-container bg-background">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
