import Link from 'next/link';
import { Team } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { FlagImage } from '@/components/ui/FlagImage';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="group flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors">
        <FlagImage teamName={team.name_en} size={36} className="rounded-sm" />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm truncate">{team.name_en}</span>
          <span className="text-xs text-muted-foreground uppercase">{team.fifa_code}</span>
        </div>
      </Card>
    </Link>
  );
}
