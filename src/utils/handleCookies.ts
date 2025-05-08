import { cookies } from 'next/headers';

import nextIntlConfig from '@/../next-intl.config';

export async function getLanguageFromCookies() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;
  return locale || nextIntlConfig.defaultLocale;
}

export async function getThemeFromCookies() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  return theme === 'dark' ? 'dark' : 'light';
}
