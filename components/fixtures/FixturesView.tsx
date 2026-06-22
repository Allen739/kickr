'use client';

import { useState, useMemo } from 'react';
import { Game } from '@/lib/api';
import { parseEAT } from '@/lib/utils';
import { MatchList } from '@/components/match/MatchList';

interface FixturesViewProps {
  games: Game[];
}

const GROUPS = ['All', 'Group Stage', ...Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i))];

export function FixturesView({ games }: FixturesViewProps) {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedMatchday, setSelectedMatchday] = useState<number | null>(null);

  const matchdays = useMemo(() => {
    const days = new Set<number>();
    games.forEach(g => {
      const md = parseInt(g.matchday);
      if (!isNaN(md)) days.add(md);
    });
    return Array.from(days).sort((a, b) => a - b);
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(g => {
      if (selectedGroup === 'Group Stage') {
        if (g.type !== 'group') return false;
      } else if (selectedGroup !== 'All') {
        if (g.group !== selectedGroup) return false;
      }
      if (selectedMatchday !== null && parseInt(g.matchday) !== selectedMatchday) return false;
      return true;
    });
  }, [games, selectedGroup, selectedMatchday]);

  const completed = useMemo(() => {
    return filteredGames
      .filter(g => g.finished === 'TRUE')
      .sort((a, b) => {
        const dateA = parseEAT(a.local_date);
        const dateB = parseEAT(b.local_date);
        return dateB.getTime() - dateA.getTime();
      });
  }, [filteredGames]);

  const upcoming = useMemo(() => {
    return filteredGames
      .filter(g => g.finished === 'FALSE')
      .sort((a, b) => {
        const dateA = parseEAT(a.local_date);
        const dateB = parseEAT(b.local_date);
        return dateA.getTime() - dateB.getTime();
      });
  }, [filteredGames]);

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fixtures & Results</h1>
        <p className="text-sm text-muted-foreground">All 104 matches of the 2026 FIFA World Cup.</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1">
          {GROUPS.map(group => (
            <button
              key={group}
              onClick={() => { setSelectedGroup(group); setSelectedMatchday(null); }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedGroup === group
                  ? 'bg-secondary text-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {group === 'All' ? 'All' : group === 'Group Stage' ? 'Group Stage' : `Group ${group}`}
            </button>
          ))}
        </div>

        {matchdays.length > 1 && (
          <div className="flex items-center gap-1.5 ml-2 pl-3 border-l border-border/50">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">MD</span>
            <button
              onClick={() => setSelectedMatchday(null)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedMatchday === null
                  ? 'bg-secondary text-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {matchdays.map(md => (
              <button
                key={md}
                onClick={() => setSelectedMatchday(md)}
                className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedMatchday === md
                    ? 'bg-secondary text-foreground'
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {md}
              </button>
            ))}
          </div>
        )}
      </div>

      {upcoming.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Upcoming Matches
          </h2>
          <MatchList games={upcoming} />
        </section>
      )}

      {completed.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Completed Matches
          </h2>
          <MatchList games={completed} />
        </section>
      )}

      {upcoming.length === 0 && completed.length === 0 && (
        <div className="p-8 text-center bg-card/30 rounded-xl border border-dashed border-border text-muted-foreground">
          No matches found for this filter combination.
        </div>
      )}
    </div>
  );
}
