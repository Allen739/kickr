import { Skeleton } from '@/components/ui/skeleton';

export default function FixturesLoading() {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-2 pt-4">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
