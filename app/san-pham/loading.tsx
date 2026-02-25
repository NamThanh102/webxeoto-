export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-12 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter Bar */}
        <div className="mb-8 flex gap-4">
          <div className="h-12 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-48 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="bg-gray-200 h-4 rounded w-3/4 animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2 animate-pulse"></div>
                <div className="bg-gray-200 h-10 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
