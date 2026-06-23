import { fetchGames } from '@/lib/api';
import { parseScorers } from '@/lib/utils';
import { FlagImage } from '@/components/ui/FlagImage';

interface ScorerEntry {
  name: string;
  goals: number;
  team: string;
}

function extractPlayerName(scorerStr: string): { name: string; isOwnGoal: boolean } {
  const isOwnGoal = scorerStr.includes("(OG)");
  const cleaned = scorerStr.replace(/\s+\d+(\+\d+)?'\s*(\([^)]*\))?$/, '');
  return { name: cleaned, isOwnGoal };
}

export default async function TopScorersPage() {
  const games = await fetchGames();

  const scorerMap = new Map<string, ScorerEntry>();

  for (const game of games) {
    if (game.finished !== 'TRUE') continue;

    const homeScorers = parseScorers(game.home_scorers);
    const awayScorers = parseScorers(game.away_scorers);

    for (const s of homeScorers) {
      const { name, isOwnGoal } = extractPlayerName(s);
      if (isOwnGoal) continue;
      const key = name.toLowerCase().replace(/\s+/g, '');
      if (!scorerMap.has(key)) {
        scorerMap.set(key, { name, goals: 0, team: game.home_team_name_en || '' });
      }
      scorerMap.get(key)!.goals += 1;
    }

    for (const s of awayScorers) {
      const { name, isOwnGoal } = extractPlayerName(s);
      if (isOwnGoal) continue;
      const key = name.toLowerCase().replace(/\s+/g, '');
      if (!scorerMap.has(key)) {
        scorerMap.set(key, { name, goals: 0, team: game.away_team_name_en || '' });
      }
      scorerMap.get(key)!.goals += 1;
    }
  }

  const scorers = Array.from(scorerMap.values()).sort((a, b) => b.goals - a.goals);
  const topScorers = scorers.slice(0, 20);

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Top Scorers</h1>
        <p className="text-sm text-muted-foreground">The race for the Golden Boot.</p>
      </div>

      {topScorers.length === 0 ? (
        <div className="p-8 text-center bg-card/30 rounded-xl border border-dashed border-border text-muted-foreground text-sm">
          No goals scored yet.
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {topScorers.map((scorer, i) => {
            const isFirst = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;
            return (
              <div
                key={scorer.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isFirst
                    ? 'bg-yellow-500/10 border border-yellow-500/20'
                    : isSecond
                      ? 'bg-gray-300/5 border border-gray-400/10'
                      : isThird
                        ? 'bg-amber-700/10 border border-amber-700/20'
                        : 'border border-transparent hover:bg-secondary/30'
                }`}
              >
                <span className={`w-8 text-center font-mono text-sm font-bold tabular-nums ${
                  isFirst ? 'text-yellow-500' : isSecond ? 'text-gray-400' : isThird ? 'text-amber-600' : 'text-muted-foreground'
                }`}>
                  {i + 1}
                </span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FlagImage teamName={scorer.team} size={20} />
                  <span className="font-medium text-sm truncate">{scorer.name}</span>
                  <span className="text-xs text-muted-foreground truncate hidden sm:inline">{scorer.team}</span>
                </div>
                <span className={`font-mono text-lg font-bold tabular-nums ${
                  isFirst ? 'text-yellow-500' : 'text-foreground'
                }`}>
                  {scorer.goals}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
