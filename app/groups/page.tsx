import { fetchGroups, GroupStanding } from '@/lib/api';
import { getCachedData } from '@/lib/cache';
import { GroupTable } from '@/components/group/GroupTable';

export default async function GroupsPage() {
  const groups = await getCachedData('all_groups', fetchGroups, 60);

  const sortedGroups = [...groups]
    .filter((g): g is GroupStanding => typeof g.group === 'string')
    .sort((a, b) => a.group.localeCompare(b.group));

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
        <p className="text-sm text-muted-foreground">Standings for all 12 groups (A&ndash;L).</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sortedGroups.map((group) => (
          <GroupTable key={group.id} standing={group} />
        ))}
      </div>
    </div>
  );
}
