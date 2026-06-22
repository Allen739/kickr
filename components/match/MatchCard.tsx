import Link from 'next/link';
import { format, parse } from 'date-fns';
import { Game } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { FlagImage } from '@/components/ui/FlagImage';
import { LiveBadge } from '@/components/ui/LiveBadge';

interface MatchCardProps {
  game: Game;
  compact?: boolean;
}

export function MatchCard({ game, compact = false }: MatchCardProps) {
  let matchDate = new Date();
  try {
    matchDate = parse(game.local_date, 'MM/dd/yyyy HH:mm', new Date());
  } catch (e) {}

  const isLive = game.finished === "FALSE" && game.time_elapsed !== "notstarted";
  const isFinished = game.finished === "TRUE";
  const isUpcoming = game.finished === "FALSE" && game.time_elapsed === "notstarted";

  const homeTeam = game.home_team_name_en || game.home_team_label || 'TBD';
  const awayTeam = game.away_team_name_en || game.away_team_label || 'TBD';

  return (
    <Link href={`/match/${game.id}`}>
      <Card className={`group transition-colors hover:bg-secondary/50 ${compact ? 'p-3' : 'p-4'} flex flex-col gap-3`}>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{format(matchDate, 'MMM d • HH:mm')}</span>
          {isLive ? (
            <LiveBadge />
          ) : isFinished ? (
            <span className="text-xs bg-secondary px-1.5 py-0.5 rounded font-medium">FT</span>
          ) : (
            <span className="text-xs uppercase tracking-wider">{game.group || game.type}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FlagImage teamName={game.home_team_name_en} size={24} />
            <span className="text-sm font-medium truncate">{homeTeam}</span>
          </div>

          <div className="font-mono text-sm font-bold shrink-0 tabular-nums">
            {isUpcoming ? (
              <span className="text-muted-foreground">vs</span>
            ) : (
              <span className={isLive ? 'text-red-400' : ''}>
                {game.home_score}&ndash;{game.away_score}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="text-sm font-medium truncate">{awayTeam}</span>
            <FlagImage teamName={game.away_team_name_en} size={24} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
