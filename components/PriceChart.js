'use client'

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts'

// Custom tooltip that will show on hover
function CustomTooltip({ active, payload, label}){
    if (active && payload && payload.length){
        return (
            <div className = "bg-gay-800 border border-gray-700 rounded-lg p-3 shadow-xl">
                <p className= "text-gray-400 text-xs mb-1">{label}</p>
                <p className = "text-white font-bold">
                ${parseFloat(payload[0].value).toFixed(2)}
                </p>
            </div>
        )
    }
    return null
}

export default function PriceChart({ prices }){
    const chartData = [...prices]
    .reverse()
    .map((p) => ({
        date: p.date.slice(5), // Show "MM-DD" rather than the full "YYYY-MM-DD"
        close: parseFloat(p.close),
    }))
    return (
        <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              // Only show every 10th label so they don't overlap
              interval={9}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
              domain={['auto', 'auto']}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
}