import { fetchGames } from '@/lib/api';
import { MatchList } from '@/components/match/MatchList';
import { TodaySection } from '@/components/match/TodaySection';
import { parse } from 'date-fns';

export default async function Home() {
  const games = await fetchGames();

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

  return (
    <div className="flex flex-col gap-16">
      <TodaySection games={games} />

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
