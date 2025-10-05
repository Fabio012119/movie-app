import { SkeletonCard } from "./Skeleton";

export function MoviesListSkeleton({ count = 8 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: `skeleton-${i}`,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
      {items.map((item) => (
        <SkeletonCard key={item.id} />
      ))}
    </div>
  );
}
