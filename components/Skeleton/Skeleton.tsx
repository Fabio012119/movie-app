export function SkeletonCard() {
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="relative w-full pt-[50%] bg-neutral-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-neutral-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-neutral-200 rounded animate-pulse" />
        <div className="mt-2 flex gap-2">
          <div className="h-9 w-24 bg-neutral-200 rounded animate-pulse" />
          <div className="h-9 w-16 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
