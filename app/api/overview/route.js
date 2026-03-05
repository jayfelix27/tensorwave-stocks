import { NextResponse } from "next/server";

export async function GET (request){
    // 1. extract the symbol from the URL query string
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol')

    // 2. If no symbol is found/provided, return an error
    if (!symbol){
        return NextResponse.json ({ error: "Symbol is required" }, { status: 400 })
    }

    // 3. Read api key from env 
    const apiKey = process.env.ALPHAVANTAGE_API_KEY

    // 4. call AlphaVantage
    const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
    )

    // 5. Parse the response as a json file
    const data = await response.json()

    // 6. Send it back to whoever called this route
    return NextResponse.json(data)

    
}