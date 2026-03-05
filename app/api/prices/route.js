import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  const apiKey = process.env.ALPHAVANTAGE_API_KEY

  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`
  )

  const data = await response.json()

  // AlphaVantage returns price data nested under this key
  const timeSeries = data['Time Series (Daily)']

  if (!timeSeries) {
    return NextResponse.json({ error: 'No price data found' }, { status: 404 })
  }

  // Convert the object into an array and calculate the changes per day
  const prices = Object.entries(timeSeries)
    .map(([date, values], index, arr) => {
      const close = parseFloat(values['4. close'])
      const prevClose = arr[index + 1]
        ? parseFloat(arr[index + 1][1]['4. close'])
        : null

      const percentChange =
        prevClose !== null
          ? (((close - prevClose) / prevClose) * 100).toFixed(2)
          : null

      return {
        date,
        close: close.toFixed(2),
        volume: parseInt(values['5. volume']).toLocaleString(),
        percentChange,
      }
    })
    // Only return the most recent 90 days
    .slice(0, 90)

  return NextResponse.json(prices)
}