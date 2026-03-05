export default function LoadingSpinner(){
    return (
        <div className = "flex flex-col itmes-center justify-center py-32 gap-4">
            {/* spinning circle */}
            <div className = "w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animae-spin"/>
            <p className = "text-gray-400 text-sm"> Loading stock data ...</p>
        </div>
    )
}