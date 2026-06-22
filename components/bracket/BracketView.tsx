import { Game } from '@/lib/api';
import { FlagImage } from '@/components/ui/FlagImage';

interface BracketViewProps {
  games: Game[];
}

const rounds = [
  { type: 'r32', label: 'Round of 32', count: 16 },
  { type: 'r16', label: 'Round of 16', count: 8 },
  { type: 'qf', label: 'Quarter-finals', count: 4 },
  { type: 'sf', label: 'Semi-finals', count: 2 },
  { type: 'final', label: 'Final', count: 1 },
];

function BracketMatch({ game, slot }: { game?: Game; slot: number }) {
  if (!game) {
    return (
      <div className="h-[72px] flex items-center px-3 border border-dashed border-border/40 rounded text-xs text-muted-foreground">
        TBD
      </div>
    );
  }

  const isUpcoming = game.finished === 'FALSE' && game.time_elapsed === 'notstarted';
  const homeTeam = game.home_team_name_en || game.home_team_label || 'TBD';
  const awayTeam = game.away_team_name_en || game.away_team_label || 'TBD';

  return (
    <div className="border border-border rounded text-xs bg-card/50">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50">
        <FlagImage teamName={game.home_team_name_en} size={16} />
        <span className="flex-1 truncate font-medium">{homeTeam}</span>
        {!isUpcoming && <span className="font-mono font-bold tabular-nums">{game.home_score}</span>}
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5">
        <FlagImage teamName={game.away_team_name_en} size={16} />
        <span className="flex-1 truncate">{awayTeam}</span>
        {!isUpcoming && <span className="font-mono font-bold tabular-nums">{game.away_score}</span>}
      </div>
    </div>
  );
}

export function BracketView({ games }: BracketViewProps) {
  const matchesByRound = rounds.map(r => games.filter(g => g.type === r.type));

  const thirdPlace = games.filter(g => g.type === 'third');

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex gap-3 min-w-[900px]">
        {rounds.map((round, ri) => {
          const matches = matchesByRound[ri];
          const count = round.count;
          const prevCount = ri > 0 ? rounds[ri - 1].count : count * 2;

          return (
            <div key={round.type} className="flex flex-col flex-1 min-w-[160px]">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center h-4">
                {round.label}
              </div>
              <div className="flex-1 flex flex-col justify-around gap-1.5">
                {Array.from({ length: count }).map((_, mi) => {
                  const game = matches[mi];
                  return <BracketMatch key={game?.id ?? mi} game={game} slot={mi} />;
                })}
              </div>
              {ri < rounds.length - 1 && (
                <div className="mt-3 text-center">
                  <svg className="w-full h-4" preserveAspectRatio="none">
                    {Array.from({ length: prevCount / 2 }).map((_, ci) => {
                      const y1 = `${(ci * 2) / (count * 2 - 1) * 100}%`;
                      const y2 = `${(ci * 2 + 1) / (count * 2 - 1) * 100}%`;
                      const ym = `${(ci * 4 + 1) / (count * 4 - 1) * 100}%`;
                      return (
                        <g key={ci}>
                          <line x1="0" y1={y1} x2="60%" y2={y1} stroke="currentColor" className="text-border" strokeWidth="1" />
                          <line x1="0" y1={y2} x2="60%" y2={y2} stroke="currentColor" className="text-border" strokeWidth="1" />
                          <line x1="60%" y1={y1} x2="60%" y2={y2} stroke="currentColor" className="text-border" strokeWidth="1" />
                          <line x1="60%" y1={ym} x2="100%" y2={ym} stroke="currentColor" className="text-border" strokeWidth="1" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>
          );
        })}

        {thirdPlace.length > 0 && (
          <div className="flex flex-col flex-1 min-w-[160px]">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center h-4">
              Third Place
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <BracketMatch game={thirdPlace[0]} slot={0} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
