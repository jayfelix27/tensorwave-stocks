import Image from 'next/image'
import Link from 'next/link'
import { STOCKS } from '@/lib/stocks'
import PriceChart from '@/components/PriceChart'
import LoadingSpinner from '@/components/LoadingSpinner'
import CompanyLogo from '@/components/CompanyLogo'

// Helper: returns green or red color based on positive/negative value
function changeColor(value) {
  if (value === null || value === undefined) return 'text-gray-400'
  return parseFloat(value) >= 0 ? 'text-green-400' : 'text-red-400'
}

// Helper: safely display a value, show "N/A" if missing
function safeValue(value) {
  if (!value || value === 'None' || value === '') return 'N/A'
  return value
}

// Helper: format big numbers like 1400000000 → "$1.40B"
function formatMarketCap(value) {
  if (!value || value === 'None') return 'N/A'
  const num = parseFloat(value)
  if (num >= 1_000_000_000_000) return `$${(num / 1_000_000_000_000).toFixed(2)}T`
  if (num >= 1_000_000_000) return `$${(num / 1_000_000_000).toFixed(2)}B`
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

// This is a SERVER COMPONENT — it fetches data directly
export default async function StockPage({ params }) {
  const { symbol } = await params

  // Find this stock in our list (for the logo domain)
  const stockInfo = STOCKS.find((s) => s.symbol === symbol)

  // Fetch both API routes at the same time using Promise.all
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const [overviewRes, pricesRes] = await Promise.all([
    fetch(`${baseUrl}/api/overview?symbol=${symbol}`, { cache: 'no-store' }),
    fetch(`${baseUrl}/api/prices?symbol=${symbol}`, { cache: 'no-store' }),
  ])

  const overview = await overviewRes.json()
  const prices = await pricesRes.json()

  return (
    <main className="min-h-screen bg-gray-900">

      {/* Top navigation bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            ← Back to all stocks
          </Link>
          <span className="text-gray-700">|</span>
          <span className="text-white font-semibold">{symbol}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Company Header */}
        <div className="flex items-center gap-5">
          {stockInfo && (
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
              <CompanyLogo domain={stockInfo.domain} symbol={symbol} />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">
              {safeValue(overview.Name)}
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-1 rounded-full">
                {safeValue(overview.Symbol)}
              </span>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                {safeValue(overview.Exchange)}
              </span>
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-full">
                {safeValue(overview.AssetType)}
              </span>
            </div>
          </div>
        </div>

        {/* Company Description */}
        {overview.Description && overview.Description !== 'None' && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-3">About</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              {overview.Description}
            </p>
          </div>
        )}

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Sector',            value: safeValue(overview.Sector) },
            { label: 'Industry',          value: safeValue(overview.Industry) },
            { label: 'Market Cap',        value: formatMarketCap(overview.MarketCapitalization) },
            { label: 'Asset Type',        value: safeValue(overview.AssetType) },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4"
            >
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-white font-semibold text-sm">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Price Chart */}
        {Array.isArray(prices) && prices.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Price History (Last 90 Days)
            </h2>
            <PriceChart prices={prices} />
          </div>
        )}

        {/* Price History Table */}
        {Array.isArray(prices) && prices.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Daily Prices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-500 font-medium pb-3 pr-6">Date</th>
                    <th className="text-right text-gray-500 font-medium pb-3 pr-6">Close Price</th>
                    <th className="text-right text-gray-500 font-medium pb-3 pr-6">Volume</th>
                    <th className="text-right text-gray-500 font-medium pb-3">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((price, index) => (
                    <tr
                      key={price.date}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-3 pr-6 text-gray-300">{price.date}</td>
                      <td className="py-3 pr-6 text-right text-white font-medium">
                        ${price.close}
                      </td>
                      <td className="py-3 pr-6 text-right text-gray-400">
                        {price.volume}
                      </td>
                      <td className={`py-3 text-right font-medium ${changeColor(price.percentChange)}`}>
                        {price.percentChange !== null
                          ? `${parseFloat(price.percentChange) >= 0 ? '+' : ''}${price.percentChange}%`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}