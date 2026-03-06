import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Keep the nav bar visible while loading */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <span className="text-gray-400 text-sm">← Back to all stocks</span>
          <span className="text-gray-700">|</span>
          <span className="text-white font-semibold">Loading...</span>
        </div>
      </div>
      <LoadingSpinner />
    </main>
  )
}