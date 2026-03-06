import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-5xl">🔍</p>
        <h2 className="text-2xl font-bold text-white">Stock Not Found</h2>
        <p className="text-gray-400 text-sm">
          We couldn't find data for that stock symbol.
        </p>
        <Link
          href="/"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </main>
  )
}
