'use client';

import { useEffect } from 'react';

export default function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem('dinero-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return null;
}
