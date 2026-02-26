export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex items-center gap-2">
        <div className="skeleton h-3 w-12" />
        <div className="skeleton h-3 w-3" />
        <div className="skeleton h-3 w-16" />
        <div className="skeleton h-3 w-3" />
        <div className="skeleton h-3 w-20" />
      </div>

      {/* Main product section */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Image skeleton */}
        <div className="skeleton aspect-square w-full" />

        {/* Details skeleton */}
        <div className="space-y-4">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-7 w-40" />
          <div className="skeleton h-4 w-48" />
          <div className="skeleton mt-2 h-5 w-16" />
          <div className="mt-6 space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
          </div>
          <div className="skeleton mt-8 h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
