import Image from 'next/image';
import Link from 'next/link';

import routes from '@/app/routes';

import SearchField from './SearchField';

export default function Header() {
  return (
    <div className="z-9999 text-2xl bg-background gap-4 sticky px-6 pb-2 pt-3 items-center flex-wrap top-0 left-0 flex md:justify-center justify-between w-full content-center">
      <Link className="font-secondary hover:scale-108 transition" href={routes.explore}>
        <Image src="/images/logo.png" width="40" height="40" alt="logo" />
      </Link>
      <SearchField />
    </div>
  );
}
