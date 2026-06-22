import { fetchGames } from '@/lib/api';
import { getCachedData } from '@/lib/cache';
import { MatchList } from '@/components/match/MatchList';
import { parse } from 'date-fns';

export default async function FixturesPage() {
  const games = await getCachedData('all_games', fetchGames, 60);

  const completed = games
    .filter(g => g.finished === 'TRUE')
    .sort((a, b) => {
      const dateA = parse(a.local_date, 'MM/dd/yyyy HH:mm', new Date());
      const dateB = parse(b.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return dateB.getTime() - dateA.getTime();
    });

  const upcoming = games
    .filter(g => g.finished === 'FALSE')
    .sort((a, b) => {
      const dateA = parse(a.local_date, 'MM/dd/yyyy HH:mm', new Date());
      const dateB = parse(b.local_date, 'MM/dd/yyyy HH:mm', new Date());
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-2 pt-4">
        <h1 className="text-3xl font-bold tracking-tight">Fixtures & Results</h1>
        <p className="text-sm text-muted-foreground">All 104 matches of the 2026 FIFA World Cup.</p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Upcoming Matches</h2>
        <MatchList games={upcoming} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Completed Matches</h2>
        <MatchList games={completed} />
      </section>
    </div>
  );
}
