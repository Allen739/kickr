import { fetchGames } from '@/lib/api';
import { BracketView } from '@/components/bracket/BracketView';

export default async function BracketPage() {
  const games = await fetchGames();
  const knockout = games.filter(g => g.type !== 'group');

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Knockout Bracket</h1>
        <p className="text-sm text-muted-foreground">The path to the 2026 FIFA World Cup Final.</p>
      </div>

      <BracketView games={knockout} />
    </div>
  );
}
