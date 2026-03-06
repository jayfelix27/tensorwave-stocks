import StockCard from "@/components/StockCard";
import { STOCKS } from '@/lib/stocks'

export default function Home(){
  return (
    <main className="min-h-screen" style={{backgroundColor: '#030712'}}>

      {/* Header */}
      <div style={{backgroundColor: '#161b22', borderBottom: '1px solid #30363d', padding: '24px 32px'}}>
  <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <h1 className="text-3xl font-bold text-white">TensorWave Stocks</h1>
      </div>
      <p className="text-gray-400 mt-1">
        Track your favorite stocks — click any card to see details
      </p>
      </div>
      <div style={{backgroundColor: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', padding: '4px 16px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.05em'}}>
      LIVE MARKET DATA
      </div>
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