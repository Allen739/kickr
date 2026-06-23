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
  { href: '/top-scorers', label: 'Scorers' },
];

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
          </div>
        </div>
      )}
    </nav>
  );
}
