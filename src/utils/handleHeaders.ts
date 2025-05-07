import { headers } from 'next/headers';

import nextIntlConfig from '../../next-intl.config';

export async function getLanguageFromHeaders() {
  const headersList = headers();
  const locale = (await headersList).get('x-locale');
  return locale || nextIntlConfig.defaultLocale;
}

export async function getThemeFromHeaders() {
  const headersList = headers();
  const theme = (await headersList).get('x-theme');
  return theme === 'dark' ? 'dark' : 'light';
}
