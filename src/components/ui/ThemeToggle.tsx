'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dinero-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    localStorage.setItem('dinero-theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)] transition-colors text-sm"
      title={dark ? 'Modo claro' : 'Modo oscuro'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
