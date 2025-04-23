'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import ThemeSelector from './ThemeSelector';

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const onClickLink = () => {
    setMenuOpen(false);
  };

  const onBlur = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };
  return (
    <div
      onBlur={onBlur}
      onMouseLeave={onBlur}
      className="border-b-4 z-9999 text-2xl bg-background sticky px-6 pb-2 pt-3 top-0 left-0 flex justify-between w-full content-center"
    >
      <Link className="font-secondary hover:scale-108 transition" href="/">
        <Image src="/images/logo.png" width="40" height="40" alt="logo" />
      </Link>
      <div className="hidden content-center flex-wrap gap-4 md:flex">
        <ThemeSelector />
        <LanguageSwitcher />
      </div>
      <div className="md:hidden">
        <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} onClickLink={onClickLink} />
      </div>
    </div>
  );
}
