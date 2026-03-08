import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Calendar } from 'lucide-react';

export default function CandlestickChart() {
  const [hoveredCandle, setHoveredCandle] = useState(null);

  // Generate realistic candlestick data
  const generateData = () => {
    const data = [];
    let basePrice = 100;
    
    for (let i = 0; i < 30; i++) {
      const open = basePrice;
      const change = (Math.random() - 0.5) * 15;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 8;
      const low = Math.min(open, close) - Math.random() * 8;
      
      data.push({
        id: i,
        open,
        close,
        high,
        low,
        date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
      
      basePrice = close;
    }
    
    return data;
  };

  const data = generateData();
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const range = maxPrice - minPrice;
  const chartHeight = 300;

  const normalize = (price) => ((maxPrice - price) / range) * chartHeight;
  const isGain = (candle) => candle.close >= candle.open;

  // Calculate stats
  const startPrice = data[0].open;
  const endPrice = data[data.length - 1].close;
  const totalChange = endPrice - startPrice;
  const percentChange = ((totalChange / startPrice) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                Market Analysis
              </h1>
              <p className="text-slate-400 text-sm">Real-time stock performance tracking</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 rounded-lg backdrop-blur-sm border border-slate-600/50">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">Last 30 Days</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Current Price</p>
              <p className="text-3xl font-bold text-white">${endPrice.toFixed(2)}</p>
            </div>
            <div className={`bg-slate-700/40 backdrop-blur-sm border rounded-xl p-4 ${totalChange >= 0 ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Change</p>
              <div className="flex items-center gap-2">
                {totalChange >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-400" />
                )}
                <p className={`text-2xl font-bold ${totalChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}
                </p>
              </div>
            </div>
            <div className={`bg-slate-700/40 backdrop-blur-sm border rounded-xl p-4 ${totalChange >= 0 ? 'border-emerald-500/50' : 'border-red-500/50'}`}>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Change %</p>
              <p className={`text-3xl font-bold ${totalChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {totalChange >= 0 ? '+' : ''}{percentChange}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 overflow-hidden">
          {/* Y-axis labels */}
          <div className="flex gap-8">
            <div className="flex flex-col justify-between h-80 text-right text-xs text-slate-500 font-mono">
              <span>${maxPrice.toFixed(0)}</span>
              <span>${(maxPrice - range * 0.25).toFixed(0)}</span>
              <span>${(maxPrice - range * 0.5).toFixed(0)}</span>
              <span>${(maxPrice - range * 0.75).toFixed(0)}</span>
              <span>${minPrice.toFixed(0)}</span>
            </div>

            {/* Chart */}
            <div className="flex-1">
              <svg
                width="100%"
                height={chartHeight + 40}
                className="mb-4"
                viewBox={`0 0 ${data.length * 20 + 40} ${chartHeight + 40}`}
              >
                {/* Grid lines */}
                <defs>
                  <linearGradient id="gainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="lossGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                  <line
                    key={`grid-${ratio}`}
                    x1="0"
                    y1={normalize(minPrice + range * ratio)}
                    x2={data.length * 20 + 40}
                    y2={normalize(minPrice + range * ratio)}
                    stroke="#475569"
                    strokeDasharray="4,4"
                    opacity="0.2"
                  />
                ))}

                {/* Candlesticks */}
                {data.map((candle, idx) => {
                  const x = idx * 20 + 20;
                  const isGainCandle = isGain(candle);
                  const high = normalize(candle.high);
                  const low = normalize(candle.low);
                  const open = normalize(candle.open);
                  const close = normalize(candle.close);
                  const bodyTop = Math.min(open, close);
                  const bodyHeight = Math.abs(close - open) || 2;
                  const color = isGainCandle ? '#10b981' : '#ef4444';
                  const gradient = isGainCandle ? 'url(#gainGradient)' : 'url(#lossGradient)';

                  return (
                    <g
                      key={candle.id}
                      onMouseEnter={() => setHoveredCandle(candle.id)}
                      onMouseLeave={() => setHoveredCandle(null)}
                      className="cursor-pointer"
                    >
                      {/* Wick */}
                      <line
                        x1={x}
                        y1={high}
                        x2={x}
                        y2={low}
                        stroke={color}
                        strokeWidth="1"
                        opacity={hoveredCandle === candle.id ? "1" : "0.6"}
                      />

                      {/* Body */}
                      <rect
                        x={x - 6}
                        y={bodyTop}
                        width="12"
                        height={bodyHeight}
                        fill={hoveredCandle === candle.id ? color : gradient}
                        stroke={color}
                        strokeWidth="0.5"
                        rx="2"
                        className="transition-all duration-200"
                        opacity={hoveredCandle === candle.id ? "1" : "0.8"}
                      />

                      {/* Hover tooltip */}
                      {hoveredCandle === candle.id && (
                        <g>
                          <rect
                            x={x - 45}
                            y={Math.min(high, bodyTop) - 70}
                            width="90"
                            height="65"
                            fill="#1e293b"
                            stroke="#475569"
                            rx="4"
                            opacity="0.95"
                          />
                          <text
                            x={x}
                            y={Math.min(high, bodyTop) - 50}
                            textAnchor="middle"
                            className="text-xs fill-slate-300 font-semibold"
                          >
                            {candle.date}
                          </text>
                          <text
                            x={x}
                            y={Math.min(high, bodyTop) - 35}
                            textAnchor="middle"
                            className="text-xs fill-slate-400"
                          >
                            O: ${candle.open.toFixed(2)}
                          </text>
                          <text
                            x={x}
                            y={Math.min(high, bodyTop) - 20}
                            textAnchor="middle"
                            className="text-xs fill-slate-400"
                          >
                            H: ${candle.high.toFixed(2)}
                          </text>
                          <text
                            x={x}
                            y={Math.min(high, bodyTop) - 5}
                            textAnchor="middle"
                            className="text-xs fill-slate-400"
                          >
                            L: ${candle.low.toFixed(2)}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                <line
                  x1="0"
                  y1={chartHeight}
                  x2={data.length * 20 + 40}
                  y2={chartHeight}
                  stroke="#475569"
                  strokeWidth="1"
                  opacity="0.5"
                />
              </svg>

              {/* X-axis labels */}
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>{data[0].date}</span>
                <span>{data[Math.floor(data.length / 2)].date}</span>
                <span>{data[data.length - 1].date}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-8 pt-6 border-t border-slate-600/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500"></div>
              <span className="text-sm text-slate-400">Gains</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-sm text-slate-400">Losses</span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          Data updates automatically • Market hours 9:30 AM - 4:00 PM EST
        </p>
      </div>
    </div>
  );
}