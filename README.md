# 📈 TensorWave Stocks

A stock market dashboard built with Next.js, Tailwind CSS, and the AlphaVantage API.

## Features

- Browse 18 major stocks on the homepage
- Click any stock to view its detail page
- Company overview including name, sector, industry, and market cap
- 90-day price history table with close price, volume, and % change
- Interactive line chart of price history
- Company logos via Clearbit
- Loading skeleton screens while data fetches
- Error handling for failed API calls
- Fully responsive layout (mobile friendly)

## Tech Stack

- [Next.js 15](https://nextjs.org/) — React framework with App Router
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first styling
- [Recharts](https://recharts.org/) — Price history line chart
- [AlphaVantage API](https://www.alphavantage.co/) — Stock market data
- [Clearbit Logo API](https://clearbit.com/logo) — Company logos

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jayfelix27/tensorwave-stocks.git
cd tensorwave-stocks
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project:
```
ALPHAVANTAGE_API_KEY=your_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

