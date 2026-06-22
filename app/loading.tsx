import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-start gap-4 pt-4">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-12 w-96" />
        <Skeleton className="h-4 w-64" />
      </section>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
