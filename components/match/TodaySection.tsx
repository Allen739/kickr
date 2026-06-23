'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { isSameDay, parse, format } from 'date-fns';
import { MatchList } from './MatchList';
import type { Game } from '@/lib/api';

export function TodaySection({ games: initialGames }: { games: Game[] }) {
  const [games, setGames] = useState(initialGames);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('https://worldcup26.ir/get/games');
      if (!res.ok) return;
      const data = await res.json();
      const mapped: Game[] = (data.games || []).map((g: any) => ({
        ...g,
        finished: g.finished === 'TRUE' || g.finished?.toLowerCase() === 'finished' ? 'TRUE' : g.finished,
        time_elapsed: g.time_elapsed?.toLowerCase() === 'finished' ? 'finished' : g.time_elapsed,
      }));
      setGames(mapped);
      setLastUpdate(new Date());
    } catch {}
  }, []);

  const hasLiveMatches = useMemo(
    () => games.some(g => g.finished === 'FALSE' && g.time_elapsed !== 'notstarted'),
    [games],
  );

  useEffect(() => {
    if (!hasLiveMatches) return;
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [hasLiveMatches, refresh]);

  const today = useMemo(() => new Date(), []);

  const todaysMatches = useMemo(() => games.filter(g => {
    try {
      const matchDate = parse(g.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return isSameDay(matchDate, today);
    } catch { return false; }
  }), [games, today]);

  const currentMatchday = useMemo(
    () => [...new Set(todaysMatches.filter(g => g.type === 'group').map(g => g.matchday))].sort()[0] || '',
    [todaysMatches],
  );

  const liveMatches = useMemo(
    () => games.filter(g => g.finished === 'FALSE' && g.time_elapsed !== 'notstarted'),
    [games],
  );

  const showLive = liveMatches.length > 0;
  const displayMatches = showLive ? liveMatches : todaysMatches;

  if (displayMatches.length === 0) return null;

  return (
    <>
      <section className="flex flex-col items-start gap-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
          {currentMatchday ? `Matchday ${currentMatchday} — ${format(today, 'MMMM d, yyyy')}` : 'Tournament'}
          {hasLiveMatches && (
            <span className="text-red-500 font-semibold text-[10px] uppercase tracking-wider ml-1">● Live</span>
          )}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          2026 FIFA World Cup
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          Live scores, group standings, and knockout bracket for the tournament.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {showLive ? 'Live Now' : "Today's Matches"}
          </h2>
          {lastUpdate && (
            <span className="text-[10px] text-muted-foreground">
              Updated {format(lastUpdate, 'HH:mm:ss')}
            </span>
          )}
        </div>
        <MatchList games={displayMatches} />
      </section>
    </>
  );
}
