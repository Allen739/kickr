import { Game } from '@/lib/api';
import { MatchCard } from './MatchCard';

interface MatchListProps {
  games: Game[];
  title?: string;
  emptyMessage?: string;
}

export function MatchList({ games, title, emptyMessage = "No matches found." }: MatchListProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
        <div className="p-8 text-center bg-card/30 rounded-xl border border-dashed border-border text-muted-foreground">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {games.map(game => (
          <MatchCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
