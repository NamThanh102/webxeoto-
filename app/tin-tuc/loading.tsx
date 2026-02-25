export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="h-12 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-1 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-48 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="bg-gray-200 h-3 rounded w-24 animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 animate-pulse"></div>
                <div className="bg-gray-200 h-3 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
