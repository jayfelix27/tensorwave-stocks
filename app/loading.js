import LoadingSpinner from '@/components/LoadingSpinner'

export default function Loading() {
    return (
        <main className = "min-h-screen bg-gray-900">
            <div className = "bg-gray-900 border-b border-gray-800 px-8 py-6">
                <div className = "max-w-7xl mx-auto">
                    <h1 className = "text-3xl font-bold text-white"> TesnsorWave Stocks</h1>
                    <p className = "text-gray-400 mt-1"> Track your favorite stocks</p>
                </div>
            </div>
            <LoadingSpinner />
        </main>
    )
}