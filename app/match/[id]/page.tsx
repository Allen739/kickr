import { fetchGames, fetchStadiums } from '@/lib/api';
import { FlagImage } from '@/components/ui/FlagImage';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { parseScorers, parseEAT } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const games = await fetchGames();
  const game = games.find(g => g.id === id);

  if (!game) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Match not found.</div>;
  }

  const isLive = game.finished === "FALSE" && game.time_elapsed !== "notstarted";
  const isFinished = game.finished === "TRUE";
  const isUpcoming = game.finished === "FALSE" && game.time_elapsed === "notstarted";

  const homeScorers = parseScorers(game.home_scorers);
  const awayScorers = parseScorers(game.away_scorers);

  let matchDate = new Date();
  try {
    matchDate = parseEAT(game.local_date);
  } catch {}

  let stadiumName = 'TBD';
  try {
    const stadiums = await fetchStadiums();
    const stadium = stadiums.find(s => s.id === game.stadium_id);
    if (stadium) {
      stadiumName = `${stadium.name_en}, ${stadium.city_en}`;
    }
  } catch {}

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto pt-8">
      <div className="text-center flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
          {game.group ? `Group ${game.group} &middot; Matchday ${game.matchday}` : game.type.replace('r32', 'Round of 32').replace('r16', 'Round of 16').replace('qf', 'Quarter-finals').replace('sf', 'Semi-finals').replace('third', 'Third place').replace('final', 'Final')}
        </span>
        <span className="text-xs text-muted-foreground">
          {format(matchDate, 'EEEE, MMMM d, yyyy • HH:mm')}
        </span>
        {isLive && <LiveBadge />}
        {isFinished && <span className="text-xs bg-secondary px-2 py-0.5 rounded font-medium">Full Time</span>}
      </div>

      <div className="border border-border rounded-lg p-6 flex flex-col items-center gap-6">
        <div className="flex items-center justify-between w-full gap-4">
          <Link href={`/teams/${game.home_team_id}`} className="flex flex-col items-center gap-3 flex-1 hover:opacity-70 transition-opacity">
            <FlagImage teamName={game.home_team_name_en} size={80} className="rounded" />
            <span className="text-sm font-semibold text-center">{game.home_team_name_en || game.home_team_label}</span>
          </Link>

          <div className="text-3xl font-mono font-bold shrink-0 tabular-nums">
            {isUpcoming ? (
              <span className="text-muted-foreground text-base font-sans">vs</span>
            ) : (
              <span className={isLive ? 'text-red-400' : ''}>
                {game.home_score}&ndash;{game.away_score}
              </span>
            )}
          </div>

          <Link href={`/teams/${game.away_team_id}`} className="flex flex-col items-center gap-3 flex-1 hover:opacity-70 transition-opacity">
            <FlagImage teamName={game.away_team_name_en} size={80} className="rounded" />
            <span className="text-sm font-semibold text-center">{game.away_team_name_en || game.away_team_label}</span>
          </Link>
        </div>

        {!isUpcoming && (homeScorers.length > 0 || awayScorers.length > 0) && (
          <div className="grid grid-cols-2 gap-6 w-full text-xs border-t border-border pt-4">
            <div className="flex flex-col gap-1.5">
              {homeScorers.map((scorer, i) => (
                <div key={i} className="flex justify-end gap-2 items-center">
                  <span className="text-muted-foreground">{scorer}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {awayScorers.map((scorer, i) => (
                <div key={i} className="flex justify-start gap-2 items-center">
                  <span className="text-muted-foreground">{scorer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border border-border rounded-lg p-4">
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stadium</span>
            <span className="text-right">{stadiumName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type</span>
            <span className="capitalize">{game.type === 'group' ? 'Group Stage' : game.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
