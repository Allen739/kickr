import { fetchTeams } from '@/lib/api';
import { getCachedData } from '@/lib/cache';
import { TeamCard } from '@/components/team/TeamCard';

export default async function TeamsPage() {
  const teams = await getCachedData('all_teams', fetchTeams, 3600);

  const teamsByGroup = teams.reduce((acc, team) => {
    const g = team.group || '?';
    if (!acc[g]) acc[g] = [];
    acc[g].push(team);
    return acc;
  }, {} as Record<string, typeof teams>);

  const groups = Object.keys(teamsByGroup).sort();

  return (
    <div className="flex flex-col gap-16 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-sm text-muted-foreground">All 48 teams participating in the 2026 FIFA World Cup.</p>
      </div>

      <div className="flex flex-col gap-12">
        {groups.map(group => (
          <section key={group} className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Group {group}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {teamsByGroup[group].map(team => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
