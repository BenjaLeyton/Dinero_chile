'use client';

import ThemeToggle from './ThemeToggle';

export default function FloatingThemeToggle() {
  return (
    <div className="fixed top-4 right-4 z-40">
      <ThemeToggle />
    </div>
  );
}
