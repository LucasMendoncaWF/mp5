'use client';
import { useLocale } from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

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
    <div>
      <button onClick={() => onClick('pt')}>PT</button>
      <button onClick={() => onClick('en')}>EN</button>
    </div>
  );
}