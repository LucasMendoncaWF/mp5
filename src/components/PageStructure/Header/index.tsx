import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSelector from "./ThemeSelector";
import Image from 'next/image';
import MobileMenu from "./MobileMenu";

export default function Header () {
  return (
    <div className="bg-white dark:bg-gray-950 sticky px-6 p-3 top-0 left-0 flex justify-between w-full content-center">
      <Link href="/">
        <Image width="36" height="36" className="w-10" src='/images/logo.png' alt="mp5 logo" />
      </Link>
      <div className="hidden content-center flex-wrap gap-4 md:flex">
        <ThemeSelector />
        <LanguageSwitcher/>
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  )
}