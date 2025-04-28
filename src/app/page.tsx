import { redirect } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import nextIntlConfig from '@/locales/languages';

export default async function InitialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let newLocale = nextIntlConfig.defaultLocale;
  if (hasLocale(routing.locales, locale)) {
    newLocale = locale;
  }
  redirect(`${newLocale}/explore`);
}
