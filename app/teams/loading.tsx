import { Skeleton } from '@/components/ui/skeleton';

export default function TeamsLoading() {
  return (
    <div className="flex flex-col gap-16 pt-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-4 w-64" />
      </div>
      {Array.from({ length: 3 }).map((_, gi) => (
        <section key={gi} className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 4 }).map((_, ti) => (
              <Skeleton key={ti} className="h-16 rounded-lg" />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
