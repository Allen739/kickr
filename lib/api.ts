export interface Game {
  _id: string;
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  home_scorers: string;
  away_scorers: string;
  group: string;
  matchday: string;
  local_date: string;
  persian_date: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_name_en?: string;
  home_team_name_fa?: string;
  away_team_name_en?: string;
  away_team_name_fa?: string;
  home_team_label?: string;
  away_team_label?: string;
}

export interface GroupStandingTeam {
  team_id: string;
  points: string;
  played: string;
  won: string;
  drawn: string;
  lost: string;
  goals_for: string;
  goals_against: string;
  goal_difference: string;
  name_en: string;
  name_fa: string;
}

export interface GroupStanding {
  _id: string;
  id: string;
  group: string;
  teams: GroupStandingTeam[];
}

export interface Team {
  _id: string;
  id: string;
  name_en: string;
  name_fa: string;
  flag: string;
  fifa_code: string;
  group: string;
}

export interface Stadium {
  _id: string;
  id: string;
  name_en: string;
  name_fa: string;
  city_en: string;
  city_fa: string;
  capacity: string;
  location: string;
}

const API_BASE = 'https://worldcup26.ir/get';

export async function fetchGames(): Promise<Game[]> {
  const res = await fetch(`${API_BASE}/games`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch games');
  const data = await res.json();
  return data.games.map((g: any) => ({
    ...g,
    finished: g.finished === 'TRUE' || g.finished?.toLowerCase() === 'finished' ? 'TRUE' : g.finished,
    time_elapsed: g.time_elapsed?.toLowerCase() === 'finished' ? 'finished' : g.time_elapsed,
  }));
}

export async function fetchGroups(): Promise<GroupStanding[]> {
  const [groupsRes, teamsRes] = await Promise.all([
    fetch(`${API_BASE}/groups`, { next: { revalidate: 60 } }),
    fetch(`${API_BASE}/teams`, { next: { revalidate: 3600 } }),
  ]);
  if (!groupsRes.ok) throw new Error('Failed to fetch groups');
  if (!teamsRes.ok) throw new Error('Failed to fetch teams');

  const groupsData = await groupsRes.json();
  const teamsData = await teamsRes.json();

  const teamMap = new Map<string, { name_en: string; name_fa: string }>();
  for (const t of teamsData.teams) {
    teamMap.set(t.id, { name_en: t.name_en, name_fa: t.name_fa });
  }

  return groupsData.groups.map((g: any) => ({
    _id: g._id,
    id: g._id,
    group: g.name,
    teams: (g.teams || []).map((t: any) => {
      const names = teamMap.get(t.team_id) || { name_en: `Team ${t.team_id}`, name_fa: '' };
      return {
        team_id: t.team_id,
        points: t.pts,
        played: t.mp,
        won: t.w,
        drawn: t.d,
        lost: t.l,
        goals_for: t.gf,
        goals_against: t.ga,
        goal_difference: t.gd,
        name_en: names.name_en,
        name_fa: names.name_fa,
      };
    }),
  }));
}

export async function fetchTeams(): Promise<Team[]> {
  const res = await fetch(`${API_BASE}/teams`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch teams');
  const data = await res.json();
  return data.teams.map((t: any) => ({
    _id: t._id,
    id: t.id,
    name_en: t.name_en,
    name_fa: t.name_fa,
    flag: t.flag,
    fifa_code: t.fifa_code,
    group: t.groups,
  }));
}

export async function fetchStadiums(): Promise<Stadium[]> {
  const res = await fetch(`${API_BASE}/stadiums`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error('Failed to fetch stadiums');
  const data = await res.json();
  return data.stadiums;
}
