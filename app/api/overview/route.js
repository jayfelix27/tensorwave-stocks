import { NextResponse } from 'next/server'

// Simple in-memory cache so we don't waste API calls during development
const cache = {}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  // If we already fetched this symbol, return the cached version
  if (cache[symbol]) {
    console.log(`Cache hit for ${symbol}`)
    return NextResponse.json(cache[symbol])
  }

  const apiKey = process.env.ALPHAVANTAGE_API_KEY

  const response = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
  )

  const data = await response.json()

  // Only cache if we got real data back (not a rate limit message)
  if (data.Symbol) {
    cache[symbol] = data
  }

  return NextResponse.json(data)
}