import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSelector from "./ThemeSelector";

export default function Header () {
  return (
    <div className="bg-white dark:bg-gray-950 sticky p-5 top-0 left-0 flex justify-between w-full">
      Header
      <ThemeSelector />
      <LanguageSwitcher/>
      <Link href="/teste">test</Link>
    </div>
  )
}