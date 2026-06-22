import { fetchGames, fetchTeams, fetchGroups } from '@/lib/api';
import { MatchList } from '@/components/match/MatchList';
import { FlagImage } from '@/components/ui/FlagImage';
import { GroupTable } from '@/components/group/GroupTable';

export const dynamic = 'force-dynamic';

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teams = await fetchTeams();
  const team = teams.find(t => t.id === id);

  if (!team) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Team not found.</div>;
  }

  const games = await fetchGames();
  const teamGames = games.filter(g => g.home_team_id === id || g.away_team_id === id);

  const groups = await fetchGroups();
  const teamGroup = groups.find(g => g.group === team.group);

  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex items-center gap-4">
        <FlagImage teamName={team.name_en} size={64} className="rounded" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">{team.name_en}</h1>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span>Group {team.group || '?'}</span>
            <span>&middot;</span>
            <span>{team.fifa_code}</span>
          </div>
        </div>
      </div>

      {teamGroup && (
        <section className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Group Standings</h2>
          <GroupTable standing={teamGroup} />
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Matches</h2>
        <MatchList games={teamGames} emptyMessage="No matches found for this team." />
      </section>
    </div>
  );
}
