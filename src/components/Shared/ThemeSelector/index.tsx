'use client';
import { useEffect, useState } from 'react';
import './themeSelector.scss';
export default function ThemeSelector() {
  const [buttonTheme, setButtonTheme] = useState<'dark' | 'light' | ''>('');

  const toggleTheme = () => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.cookie = `theme=${newTheme}; path=/; SameSite=Lax;`;

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setButtonTheme(theme);
  };

  useEffect(() => {
    const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setButtonTheme(theme);
  }, []);

  if (!buttonTheme) {
    return;
  }

  return (
    <button
      className={`theme-toggle-button theme-toggle-button--${buttonTheme}`}
      onClick={toggleTheme}
    >
      <div className="theme-toggle-button__inner-circle">
        <div className="theme-toggle-button__inner-icon"></div>
      </div>
    </button>
  );
}
