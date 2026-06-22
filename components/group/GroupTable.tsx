import { GroupStanding } from '@/lib/api';
import { FlagImage } from '@/components/ui/FlagImage';

interface GroupTableProps {
  standing: GroupStanding;
}

export function GroupTable({ standing }: GroupTableProps) {
  const sortedTeams = [...standing.teams].sort((a, b) => {
    if (parseInt(b.points) !== parseInt(a.points)) return parseInt(b.points) - parseInt(a.points);
    if (parseInt(b.goal_difference) !== parseInt(a.goal_difference)) return parseInt(b.goal_difference) - parseInt(a.goal_difference);
    return parseInt(b.goals_for) - parseInt(a.goals_for);
  });

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="text-sm font-semibold">Group {standing.group}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-center w-8 py-2 font-medium">#</th>
              <th className="text-left py-2 font-medium">Team</th>
              <th className="text-center w-8 py-2 font-medium">P</th>
              <th className="text-center w-8 py-2 font-medium hidden sm:table-cell">W</th>
              <th className="text-center w-8 py-2 font-medium hidden sm:table-cell">D</th>
              <th className="text-center w-8 py-2 font-medium hidden sm:table-cell">L</th>
              <th className="text-center w-8 py-2 font-medium hidden md:table-cell">GF</th>
              <th className="text-center w-8 py-2 font-medium hidden md:table-cell">GA</th>
              <th className="text-center w-8 py-2 font-medium">GD</th>
              <th className="text-center w-8 py-2 font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => {
              const qualified = index < 2;
              return (
                <tr key={team.team_id} className={`border-b border-border last:border-0 ${qualified ? 'bg-primary/5' : ''}`}>
                  <td className="text-center py-2">
                    <span className={`inline-flex w-5 h-5 items-center justify-center rounded text-xs font-medium ${
                      qualified ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <FlagImage teamName={team.name_en} size={16} />
                      <span className="font-medium">{team.name_en}</span>
                    </div>
                  </td>
                  <td className="text-center py-2">{team.played}</td>
                  <td className="text-center py-2 text-muted-foreground hidden sm:table-cell">{team.won}</td>
                  <td className="text-center py-2 text-muted-foreground hidden sm:table-cell">{team.drawn}</td>
                  <td className="text-center py-2 text-muted-foreground hidden sm:table-cell">{team.lost}</td>
                  <td className="text-center py-2 text-muted-foreground hidden md:table-cell">{team.goals_for}</td>
                  <td className="text-center py-2 text-muted-foreground hidden md:table-cell">{team.goals_against}</td>
                  <td className="text-center py-2 font-medium">{parseInt(team.goal_difference) > 0 ? '+' : ''}{team.goal_difference}</td>
                  <td className="text-center py-2 font-bold">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
