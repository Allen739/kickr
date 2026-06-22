import { fetchGames } from '@/lib/api';
import { getCachedData } from '@/lib/cache';
import { FixturesView } from '@/components/fixtures/FixturesView';

export default async function FixturesPage() {
  const games = await getCachedData('all_games', fetchGames, 60);

  return <FixturesView games={games} />;
}
