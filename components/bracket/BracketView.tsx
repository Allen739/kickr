import { Game } from '@/lib/api';
import { FlagImage } from '@/components/ui/FlagImage';

interface BracketViewProps {
  games: Game[];
}

const MATCH_H = 72;
const GAP = 8;
const SLOT = MATCH_H + GAP;
const TOTAL_SLOTS = 16;
const TOTAL_H = SLOT * TOTAL_SLOTS;

interface RoundDef {
  type: string;
  label: string;
  count: number;
  roundIndex: number;
}

const rounds: RoundDef[] = [
  { type: 'r32', label: 'Round of 32', count: 16, roundIndex: 0 },
  { type: 'r16', label: 'Round of 16', count: 8, roundIndex: 1 },
  { type: 'qf', label: 'Quarter-finals', count: 4, roundIndex: 2 },
  { type: 'sf', label: 'Semi-finals', count: 2, roundIndex: 3 },
  { type: 'final', label: 'Final', count: 1, roundIndex: 4 },
];

function getTop(roundIndex: number, matchIndex: number): number {
  if (roundIndex === 0) return matchIndex * SLOT;
  const centroid = Math.pow(2, roundIndex - 1) * (2 * matchIndex + 1) * SLOT;
  return centroid - MATCH_H / 2;
}

function BracketMatch({ game }: { game?: Game }) {
  if (!game) {
    return (
      <div style={{ height: MATCH_H }} className="flex items-center px-3 border border-dashed border-border/40 rounded text-xs text-muted-foreground">
        TBD
      </div>
    );
  }

  const isUpcoming = game.finished === 'FALSE' && game.time_elapsed === 'notstarted';
  const homeTeam = game.home_team_name_en || game.home_team_label || 'TBD';
  const awayTeam = game.away_team_name_en || game.away_team_label || 'TBD';

  return (
    <div style={{ height: MATCH_H }} className="border border-border rounded text-xs bg-card/50 flex flex-col justify-center">
      <div className="flex items-center gap-2 px-3 py-1">
        <FlagImage teamName={game.home_team_name_en} size={16} />
        <span className="flex-1 truncate font-medium">{homeTeam}</span>
        {!isUpcoming && <span className="font-mono font-bold tabular-nums">{game.home_score}</span>}
      </div>
      <div className="flex items-center gap-2 px-3 py-1 border-t border-border/40">
        <FlagImage teamName={game.away_team_name_en} size={16} />
        <span className="flex-1 truncate">{awayTeam}</span>
        {!isUpcoming && <span className="font-mono font-bold tabular-nums">{game.away_score}</span>}
      </div>
    </div>
  );
}

function BracketConnector({ height }: { height: number }) {
  return (
    <div style={{ height }} className="w-5 shrink-0">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="text-border"
      >
        <line x1="0" y1="25" x2="50" y2="25" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="75" x2="50" y2="75" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="25" x2="50" y2="75" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

function RoundColumn({ round, matches }: { round: RoundDef; matches: Game[] }) {
  return (
    <div className="relative" style={{ height: TOTAL_H, width: 160 }}>
      {Array.from({ length: round.count }).map((_, mi) => {
        const game = matches[mi];
        const top = getTop(round.roundIndex, mi);
        return (
          <div key={game?.id ?? mi} style={{ position: 'absolute', top, left: 0, right: 0 }}>
            <BracketMatch game={game} />
          </div>
        );
      })}
    </div>
  );
}

function ConnectorColumn({ roundIndex, count }: { roundIndex: number; count: number }) {
  const connHeight = Math.pow(2, roundIndex + 1) * SLOT;
  return (
    <div className="flex flex-col justify-around" style={{ height: TOTAL_H }}>
      {Array.from({ length: count }).map((_, i) => (
        <BracketConnector key={i} height={connHeight} />
      ))}
    </div>
  );
}

export function BracketView({ games }: BracketViewProps) {
  const matchesByRound = rounds.map(r => games.filter(g => g.type === r.type));
  const thirdPlace = games.filter(g => g.type === 'third');

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex items-start min-w-[1000px]">
        {rounds.map((round, ri) => {
          const matches = matchesByRound[ri];
          return (
            <div key={round.type} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 text-center h-3">
                  {round.label}
                </div>
                <RoundColumn round={round} matches={matches} />
              </div>
              {ri < rounds.length - 1 && (
                <ConnectorColumn roundIndex={ri} count={rounds[ri + 1].count} />
              )}
            </div>
          );
        })}

        {thirdPlace.length > 0 && (
          <div className="flex items-center gap-0">
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 text-center h-3">
                Third Place
              </div>
              <div className="flex items-center justify-center" style={{ height: TOTAL_H, width: 160 }}>
                <div className="w-full">
                  <BracketMatch game={thirdPlace[0]} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
