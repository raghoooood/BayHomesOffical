"use client"

import { useState, useEffect } from 'react';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-8 h-8 flex items-center justify-center bg-transparent rounded-2xl transition-all duration-300 focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? <RiMoonLine size={30} /> : <RiSunLine size={30} />}
    </button>
  );
};

export default ThemeChanger;
