'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/groups', label: 'Groups' },
  { href: '/fixtures', label: 'Fixtures' },
  { href: '/teams', label: 'Teams' },
  { href: '/bracket', label: 'Bracket' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 justify-between items-center">
          <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-70 transition-opacity">
            kikr
          </Link>

          <div className="flex items-center gap-1">
            {links.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-secondary text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
