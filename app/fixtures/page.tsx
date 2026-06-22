import { fetchGames } from '@/lib/api';
import { FixturesView } from '@/components/fixtures/FixturesView';

export default async function FixturesPage() {
  const games = await fetchGames();

  return <FixturesView games={games} />;
}
