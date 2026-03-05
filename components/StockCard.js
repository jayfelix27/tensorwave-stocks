'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function StockCard ({ symbol, name, domain}){
    // If the logo fails to load, fall back to showing initials
    const [imgError, setImgError] = useState(false)

    return (
        // Link wraps the whole card so clicking anywhere navigates to the details page
        <Link href={`/stock/${symbol}`}>
        <div className="
          bg-gray-900 border border-gray-800
          rounded-2xl p-6 cursor-pointer
          hover:border-blue-500 hover:bg-gray-800
          transition-all duration-200
          flex flex-col items-center gap-4
          group
        ">
          {/* Logo or fallback initials */}
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <Image
                src={`https://logo.clearbit.com/${domain}`}
                alt={`${name} logo`}
                width={64}
                height={64}
                className="rounded-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              // Fallback: show first 2 letters of the symbol
              <span className="text-xl font-bold text-blue-400">
                {symbol.slice(0, 2)}
              </span>
            )}
          </div>
  
          {/* Stock symbol — big and bold */}
          <div className="text-center">
            <p className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {symbol}
            </p>
            <p className="text-sm text-gray-400 mt-1 text-center leading-tight">
              {name}
            </p>
          </div>
  
          {/* "View Details" hint that appears on hover */}
          <span className="
            text-xs text-blue-500 opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          ">
            View Details →
          </span>
        </div>
      </Link>
    )
}