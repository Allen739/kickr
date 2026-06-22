import Image from 'next/image';
import { getFlagUrl } from '@/lib/flags';

interface FlagImageProps {
  teamName?: string | null;
  size?: number;
  className?: string;
}

export function FlagImage({ teamName, size = 24, className = '' }: FlagImageProps) {
  const url = teamName ? getFlagUrl(teamName) : 'https://flagcdn.com/w80/un.png';
  
  return (
    <div 
      className={`relative overflow-hidden rounded-sm bg-muted flex-shrink-0 ${className}`}
      style={{ width: size, height: size * 0.75 }}
    >
      <Image
        src={url}
        alt={teamName ? `${teamName} flag` : 'flag'}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
