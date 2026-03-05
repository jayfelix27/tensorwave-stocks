import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter ({ subsets: ['latin']})

export const metdata = {
  title: 'TesnorWave Stocks',
  description: 'Stock market dashboard',
}

export default function RootLayout({ children }){
  return (
    <html lang = "en">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        {children}
        </body>
    </html>
  )
}


