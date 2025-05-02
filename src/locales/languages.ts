import type { LocalePrefix, LocalePrefixMode } from 'next-intl/routing';

const nextIntlConfig: {
  locales: string[];
  defaultLocale: string;
  localePrefix: LocalePrefix<string[], LocalePrefixMode>;
} = {
  locales: ['en', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'always',
};

export default nextIntlConfig;
