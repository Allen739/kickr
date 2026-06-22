import { fetchGames } from '@/lib/api';
import { MatchList } from '@/components/match/MatchList';
import { isSameDay, parse } from 'date-fns';

export default async function Home() {
  const games = await fetchGames();

  const today = new Date('2026-06-22T00:00:00');

  const todaysMatches = games.filter(g => {
    try {
      const matchDate = parse(g.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return isSameDay(matchDate, today);
    } catch { return false; }
  });

  const recentResults = games
    .filter(g => g.finished === 'TRUE')
    .sort((a, b) => {
      const dateA = parse(a.local_date, 'MM/dd/yyyy HH:mm', new Date());
      const dateB = parse(b.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  const upcomingMatches = games
    .filter(g => g.finished === 'FALSE' && g.time_elapsed === 'notstarted')
    .sort((a, b) => {
      const dateA = parse(a.local_date, 'MM/dd/yyyy HH:mm', new Date());
      const dateB = parse(b.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 6);

  const liveMatches = games.filter(g => g.finished === 'FALSE' && g.time_elapsed !== 'notstarted');

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
          Matchday 2 — June 22, 2026
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl leading-tight">
          2026 FIFA World Cup
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          Live scores, group standings, and knockout bracket for the tournament.
        </p>
      </section>

      {(liveMatches.length > 0 || todaysMatches.length > 0) && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {liveMatches.length > 0 ? 'Live Now' : "Today's Matches"}
          </h2>
          <MatchList games={liveMatches.length > 0 ? liveMatches : todaysMatches} />
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recent Results</h2>
        <MatchList games={recentResults} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Upcoming Fixtures</h2>
        <MatchList games={upcomingMatches} />
      </section>
    </div>
  );
}
