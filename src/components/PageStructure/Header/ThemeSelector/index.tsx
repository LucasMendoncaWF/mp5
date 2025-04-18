'use client'


export default function ThemeSelector() {

  const toggleTheme = () => {
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  return (
    <>
      <button
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </>
  )
}