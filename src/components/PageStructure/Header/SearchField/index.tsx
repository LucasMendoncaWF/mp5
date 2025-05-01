'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import routes from '@/app/routes';

export default function SearchField() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (searchQuery !== null) {
        const genre = searchParams.get('genre');
        router.push(`${routes.search}?query=${searchQuery}${genre ? `&genre=${genre}` : ''}`);
      }
    }, 200);
  }, [searchQuery, router, searchParams]);

  useEffect(() => {
    const search = searchParams.get('query');
    if (searchQuery === null && search) {
      setSearchQuery(search);
    }
  }, [searchQuery, searchParams]);

  useEffect(() => {
    if (!pathname.includes(routes.search)) {
      setSearchQuery(null);
    }
  }, [pathname]);

  return (
    <div className="relative md:w-100">
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery || ''}
        maxLength={150}
        className="text-[13px] w-full text-text-color px-5 py-2 pr-10 border-2 border-text-color rounded-full"
      />
      <Image
        className="dark:invert absolute right-5 top-[13px]"
        width="15"
        height="15"
        alt="search icon"
        src="/images/search-icon.png"
      />
    </div>
  );
}
