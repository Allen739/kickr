import { Skeleton } from '@/components/ui/skeleton';

export default function MatchDetailLoading() {
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto pt-8">
      <div className="text-center flex flex-col items-center gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-24 rounded-lg" />
    </div>
  );
}
