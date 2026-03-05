'use client' 

export default function Error ({ error, reset }){
    return (
        <main className = "min-h-screen bg-gray-950 flex items-center justify-center">
            <div className = "text-center space-y-4">
                <p className = "text-5xl">⚠️</p>
                <h2 className = "text-2xl font-bold text-white"> Something went wrong</h2>
                <p className = "text-gray-400 text-sm max-w-md">
                {error?.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <button 
                onClick = {reset}
                className = " mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors "
                >
                    Try Again
                </button>
            </div>
        </main>
    )
}