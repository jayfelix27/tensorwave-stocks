// Skeleton card that mimics the shape of a real StockCard
function SkeletonCard() {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-center gap-4">
        {/* Logo placeholder */}
        <div className="w-16 h-16 rounded-full bg-gray-800 animate-pulse" />
        {/* Symbol placeholder */}
        <div className="w-16 h-5 bg-gray-800 rounded animate-pulse" />
        {/* Name placeholder */}
        <div className="w-24 h-3 bg-gray-800 rounded animate-pulse" />
      </div>
    )
  }
  
  export default function LoadingSpinner() {
    return (
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Render 18 skeleton cards to fill the grid */}
          {Array.from({ length: 18 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }