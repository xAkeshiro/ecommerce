export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10">
      {/* Header skeleton */}
      <div className="flex items-end justify-between">
        <div>
          <div className="skeleton h-3 w-16" />
          <div className="skeleton mt-3 h-7 w-40" />
        </div>
        <div className="skeleton h-3 w-20" />
      </div>

      {/* Product grid skeleton */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-square w-full" />
            <div className="mt-4 space-y-2">
              <div className="skeleton h-3 w-24" />
              <div className="skeleton h-3 w-32" />
              <div className="skeleton h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
