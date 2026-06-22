'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const links = [
  { href: '/groups', label: 'Groups' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/teams', label: 'Teams' },
  { href: '/bracket', label: 'Bracket' },
];

const supportUrl = '/support';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinkClass = (isActive: boolean) =>
    `px-3 py-1.5 text-sm rounded-md transition-colors ${
      isActive
        ? 'bg-secondary text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  const mobileLinkClass = (isActive: boolean) =>
    `px-3 py-3 text-sm rounded-md transition-colors ${
      isActive
        ? 'bg-secondary text-foreground font-medium'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="mr-auto hover:opacity-70 transition-opacity"
            onClick={() => setOpen(false)}
          >
            <img src="/logo.png" alt="kikr" className="h-40 w-auto -ml-4 invert dark:invert-0" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={navLinkClass(isActive)}>
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={supportUrl}
              className="px-3 py-1.5 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support
            </Link>
          </div>

          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-3 text-muted-foreground hover:text-foreground transition-colors active:bg-secondary/40 rounded-md"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l10 10" />
                  <path d="M15 5l-10 10" />
                </>
              ) : (
                <>
                  <path d="M3 5h14" />
                  <path d="M3 10h14" />
                  <path d="M3 15h14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-0.5">
            {links.map(link => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass(isActive)}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={supportUrl}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Support
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
