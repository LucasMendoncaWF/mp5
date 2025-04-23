import Link from 'next/link';

import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSelector from '../ThemeSelector';

interface Props {
  // eslint-disable-next-line no-unused-vars
  setMenuOpen: (_value: boolean) => void;
  isMenuOpen: boolean;
  onClickLink: () => void;
}

export default function MobileMenu({ setMenuOpen, isMenuOpen, onClickLink }: Props) {
  return (
    <div className="flex content-center h-full">
      <button
        onClick={() => setMenuOpen(true)}
        className="cursor-pointer hover:opacity-60 transition"
      >
        <div className="bg-primary w-8 h-1"></div>
        <div className="bg-primary w-8 h-1 mt-1"></div>
        <div className="bg-primary w-8 h-1 mt-1"></div>
      </button>

      {isMenuOpen && (
        <div className="fixed text-right fade-in w-40 top-15 right-0 bg-background border-b-4 border-l-4 p-4">
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#about-section">
              About
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#main-projects-section">
              Projects
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#intranets-section">
              Intranets
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#skills-section">
              Skills
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#experience-section">
              Experience
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#design-section">
              Design
            </Link>
          </div>
          <div className="text-lg py-1 hover:opacity-80 transition">
            <Link onClick={onClickLink} href="#contact-section">
              Contact
            </Link>
          </div>
          <div className="flex gap-3 justify-center mb-3 mt-3">
            <ThemeSelector />
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </div>
  );
}
