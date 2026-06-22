'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <Sun size={16} className="dark:hidden" />
      <Moon size={16} className="hidden dark:block" />
    </button>
  );
}
