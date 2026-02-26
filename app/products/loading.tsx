export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Title skeleton */}
      <div className="skeleton mx-auto h-8 w-32" />

      {/* Filter bar skeleton */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-8 w-24" />
          ))}
        </div>
        <div className="skeleton h-8 w-32" />
      </div>

      {/* Product grid skeleton */}
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-square w-full" />
            <div className="mt-4 space-y-2">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-3 w-36" />
              <div className="skeleton h-4 w-14" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
