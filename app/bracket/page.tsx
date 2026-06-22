import { fetchGames } from '@/lib/api';
import { getCachedData } from '@/lib/cache';
import { MatchList } from '@/components/match/MatchList';

export default async function BracketPage() {
  const games = await getCachedData('all_games', fetchGames, 60);

  const getRound = (type: string) => games.filter(g => g.type === type);

  const rounds = [
    { name: 'Round of 32', matches: getRound('r32') },
    { name: 'Round of 16', matches: getRound('r16') },
    { name: 'Quarter-finals', matches: getRound('qf') },
    { name: 'Semi-finals', matches: getRound('sf') },
    { name: 'Third Place', matches: getRound('third') },
    { name: 'Final', matches: getRound('final') },
  ];

  return (
    <div className="flex flex-col gap-16 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Knockout Bracket</h1>
        <p className="text-sm text-muted-foreground">The path to the 2026 FIFA World Cup Final.</p>
      </div>

      <div className="flex flex-col gap-12">
        {rounds.map(round => (
          <section key={round.name} className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{round.name}</h2>
            <MatchList games={round.matches} />
          </section>
        ))}
      </div>
    </div>
  );
}
