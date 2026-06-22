import { Skeleton } from '@/components/ui/skeleton';

export default function TeamDetailLoading() {
  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <section className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-48 rounded-lg" />
      </section>
      <section className="flex flex-col gap-3">
        <Skeleton className="h-4 w-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
