import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-all font-bold text-slate-700"
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}

      {theme === 'light'
        ? t('dark_mode', 'Dark Mode')
        : t('light_mode', 'Light Mode')}
    </button>
  );
};

export default ThemeToggle;
