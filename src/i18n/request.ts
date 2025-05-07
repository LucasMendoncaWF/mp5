import { getRequestConfig } from 'next-intl/server';

import { getLanguageFromHeaders } from '@/utils/handleHeaders';

export default getRequestConfig(async () => {
  const locale = await getLanguageFromHeaders();
  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
