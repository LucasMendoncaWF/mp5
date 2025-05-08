import { getRequestConfig } from 'next-intl/server';

import { getLanguageFromCookies } from '@/utils/handleCookies';

export default getRequestConfig(async () => {
  const locale = await getLanguageFromCookies();
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
