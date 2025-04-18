'use client'

import { useState } from "react"
import ThemeSelector from "../ThemeSelector"
import LanguageSwitcher from "../LanguageSwitcher"
import Link from "next/link"

export default function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  return (
    <div className="flex content-center h-full" onMouseLeave={() => setMenuOpen(false)}>
      <button onClick={() => setMenuOpen(true)} className="cursor-pointer hover:opacity-60 transition">
        <div className="bg-white w-8 h-1"></div>
        <div className="bg-white w-8 h-1 mt-1"></div>
        <div className="bg-white w-8 h-1 mt-1"></div>
      </button>

      {isMenuOpen && 
        <div className="fixed fade-in w-40 top-15 right-0 bg-white dark:bg-gray-950 p-4">
          <Link href="#"><div className="mb-3 text-sm text-right">Home</div></Link>
          <Link href="#"><div className="mb-3 text-sm text-right">Playlists</div></Link>
          <Link href="#"><div className="mb-3 text-sm text-right">Explore</div></Link>
          <Link href="#"><div className="mb-5 text-sm text-right">Settings</div></Link>
          <div className="flex gap-3 justify-end mb-3">
            <ThemeSelector />
            <LanguageSwitcher/>
          </div>
          
        </div>
      }
    </div>
  )
}