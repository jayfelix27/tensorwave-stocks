'use client'

import { useState } from 'react'

export default function CompanyLogo({ domain, symbol }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <span className="text-xl font-bold text-blue-400">
        {symbol.slice(0, 2)}
      </span>
    )
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={symbol}
      width={64}
      height={64}
      className="object-contain"
      onError={() => setError(true)}
    />
  )
}