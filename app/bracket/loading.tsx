import { Skeleton } from '@/components/ui/skeleton';

export default function BracketLoading() {
  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex gap-6 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 min-w-[160px] flex flex-col gap-4">
            {Array.from({ length: [16, 8, 4, 3, 1, 1][i] }).map((_, j) => (
              <Skeleton key={j} className="h-[72px] rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
