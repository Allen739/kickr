'use client';

import { useMemo } from 'react';
import { isSameDay, parse, format } from 'date-fns';
import { MatchList } from './MatchList';
import type { Game } from '@/lib/api';

export function TodaySection({ games }: { games: Game[] }) {
  const today = useMemo(() => new Date(), []);

  const todaysMatches = games.filter(g => {
    try {
      const matchDate = parse(g.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return isSameDay(matchDate, today);
    } catch { return false; }
  });

  const currentMatchday = [...new Set(todaysMatches.filter(g => g.type === 'group').map(g => g.matchday))].sort()[0] || '';

  const liveMatches = games.filter(g => g.finished === 'FALSE' && g.time_elapsed !== 'notstarted');

  const showLive = liveMatches.length > 0;
  const displayMatches = showLive ? liveMatches : todaysMatches;

  if (displayMatches.length === 0) return null;

  return (
    <>
      <section className="flex flex-col items-start gap-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
          {currentMatchday ? `Matchday ${currentMatchday} — ${format(today, 'MMMM d, yyyy')}` : 'Tournament'}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          2026 FIFA World Cup
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          Live scores, group standings, and knockout bracket for the tournament.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {showLive ? 'Live Now' : "Today's Matches"}
        </h2>
        <MatchList games={displayMatches} />
      </section>
    </>
  );
}
