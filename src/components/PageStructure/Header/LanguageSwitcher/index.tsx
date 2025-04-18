'use client';
import { useLocale } from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import nextIntlConfig from '../../../../../next-intl.config';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  function onClick(value: string) {
    const newPath = pathname.replace(`/${currentLocale}`, `/${value}`);
    router.push(newPath);
    window.location.href = newPath;
  }

  return (
    <div className='flex content-center gap-1'>
      {nextIntlConfig.locales.map((locale, index) =>
        <button key={index} onClick={() => onClick(locale)}>
          <Image 
            className='hover:scale-120 md:w-6 cursor-pointer transition'
            src={`/images/${locale}.jpg`} 
            alt={`${locale} flag`} 
            width="30" 
            height="25" 
          />
        </button>

      )}
    </div>
  );
}