import StockCard from "@/components/StockCard";
import { STOCKS } from '@/lib/stocks'

export default function Home(){
  return (
    <main className = " min-h-screen bg-bray-950">

      {/* Header */}
      <div className="bgpgray-900 border-b border-gray-800 px-8 py-6">
        <div className = "max-w-7xl mx-auto">
          <h1 className = "text-3xl font-bold text-white">
            TesnorWave Stocks
          </h1>
          <p className = "text-gray-400 mt-1">
            Track your favorite stocks. Click any card to see the details
          </p>
        </div>
      </div>

      { /* Stocks Card Grid */}
      <div className = "max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {STOCKS.map((stock) => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
              domain={stock.domain}
              />
          ))}
        </div>
      </div>
      
    </main>
  )
}