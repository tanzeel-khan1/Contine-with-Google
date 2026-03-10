import React, { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, Calendar, Loader2 } from 'lucide-react';
import useAttendance from '../Hooks/AttendanceHook';

export default function CandlestickChart() {
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const { attendance, loading, error, getUserAttendance } = useAttendance();

  useEffect(() => {
    getUserAttendance();
  }, []);

  const generateDataFromAttendance = () => {
    if (attendance && attendance.length > 0) {
      return attendance.map((record, i) => {
        const basePrice = 100 + i * 2;
        const isPresent = record.status === "present";
        const open = basePrice;
        const close = isPresent
          ? basePrice + (Math.random() * 10 + 2)
          : basePrice - (Math.random() * 10 + 2);
        const high = Math.max(open, close) + Math.random() * 4;
        const low  = Math.min(open, close) - Math.random() * 4;

        // ✅ date field use kiya (checkIn nahi) — jo guaranteed exist karta hai
        const parsedDate = new Date(record.date);
        const displayDate = isNaN(parsedDate)
          ? `Day ${i + 1}`
          : parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        return {
          id: i, open, close, high, low,
          status: record.status,
          approvalStatus: record.approvalStatus,
          date: displayDate,
        };
      });
    }
    return generateDummyData();
  };

  const generateDummyData = () => {
    const data = [];
    let basePrice = 100;
    for (let i = 0; i < 30; i++) {
      const open = basePrice;
      const change = (Math.random() - 0.5) * 15;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 8;
      const low  = Math.min(open, close) - Math.random() * 8;
      data.push({
        id: i, open, close, high, low,
        date: new Date(Date.now() - (29 - i) * 86400000)
          .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
      basePrice = close;
    }
    return data;
  };

  const data = generateDataFromAttendance();
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const range    = maxPrice - minPrice || 1;
  const chartHeight = 300;

  const normalize = (price) => ((maxPrice - price) / range) * chartHeight;
  const isGain = (candle) => candle.close >= candle.open;

  const presentCount = attendance.filter(r => r.status === 'present').length;
  const absentCount  = attendance.filter(r => r.status === 'absent').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
          <p className="text-slate-400 text-sm">Fetching attendance data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center max-w-sm">
          <p className="text-red-400 font-semibold text-lg mb-2">Error</p>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <button
            onClick={getUserAttendance}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                Attendance Analysis
              </h1>
              <p className="text-slate-400 text-sm">
                {attendance.length > 0
                  ? `${attendance.length} records • Green = Present, Red = Absent`
                  : 'Showing demo data'}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-700/40 rounded-lg backdrop-blur-sm border border-slate-600/50">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm">All Records</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-700/40 backdrop-blur-sm border border-slate-600/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Total Records</p>
              <p className="text-3xl font-bold text-white">{attendance.length || data.length}</p>
            </div>
            <div className="bg-slate-700/40 backdrop-blur-sm border border-emerald-500/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Present Days</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <p className="text-2xl font-bold text-emerald-400">{presentCount}</p>
              </div>
            </div>
            <div className="bg-slate-700/40 backdrop-blur-sm border border-red-500/50 rounded-xl p-4">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Absent Days</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-red-400" />
                <p className="text-2xl font-bold text-red-400">{absentCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-8 overflow-hidden">
          <div className="flex gap-8">

            {/* Y-axis */}
            <div className="flex flex-col justify-between h-80 text-right text-xs text-slate-500 font-mono">
              <span>{maxPrice.toFixed(0)}</span>
              <span>{(maxPrice - range * 0.25).toFixed(0)}</span>
              <span>{(maxPrice - range * 0.5).toFixed(0)}</span>
              <span>{(maxPrice - range * 0.75).toFixed(0)}</span>
              <span>{minPrice.toFixed(0)}</span>
            </div>

            <div className="flex-1">
              <svg
                width="100%"
                height={chartHeight + 40}
                className="mb-4"
                viewBox={`0 0 ${data.length * 20 + 40} ${chartHeight + 40}`}
              >
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

                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                  <line key={`grid-${ratio}`}
                    x1="0" y1={normalize(minPrice + range * ratio)}
                    x2={data.length * 20 + 40} y2={normalize(minPrice + range * ratio)}
                    stroke="#475569" strokeDasharray="4,4" opacity="0.2"
                  />
                ))}

                {data.map((candle, idx) => {
                  const x = idx * 20 + 20;
                  const isGainCandle = isGain(candle);
                  const highY    = normalize(candle.high);
                  const lowY     = normalize(candle.low);
                  const openY    = normalize(candle.open);
                  const closeY   = normalize(candle.close);
                  const bodyTop  = Math.min(openY, closeY);
                  const bodyHeight = Math.abs(closeY - openY) || 2;
                  const color    = isGainCandle ? '#10b981' : '#ef4444';
                  const gradient = isGainCandle ? 'url(#gainGradient)' : 'url(#lossGradient)';

                  // tooltip ko screen ke andar rakhne ke liye
                  const totalWidth = data.length * 20 + 40;
                  const tooltipX = x + 55 > totalWidth ? x - 55 : x + 5;

                  return (
                    <g key={candle.id}
                      onMouseEnter={() => setHoveredCandle(candle.id)}
                      onMouseLeave={() => setHoveredCandle(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <line x1={x} y1={highY} x2={x} y2={lowY}
                        stroke={color} strokeWidth="1"
                        opacity={hoveredCandle === candle.id ? '1' : '0.6'}
                      />
                      <rect x={x - 6} y={bodyTop} width="12" height={bodyHeight}
                        fill={hoveredCandle === candle.id ? color : gradient}
                        stroke={color} strokeWidth="0.5" rx="2"
                        opacity={hoveredCandle === candle.id ? '1' : '0.8'}
                      />

                      {hoveredCandle === candle.id && (
                        <g>
                          <rect
                            x={x - 50} y={Math.max(4, Math.min(highY, bodyTop) - 85)}
                            width="100" height="80"
                            fill="#1e293b" stroke="#475569" rx="4" opacity="0.97"
                          />
                          <text x={x} y={Math.max(4, Math.min(highY, bodyTop) - 85) + 14}
                            textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="600">
                            {candle.date}
                          </text>
                          <text x={x} y={Math.max(4, Math.min(highY, bodyTop) - 85) + 28}
                            textAnchor="middle" fill={isGainCandle ? '#10b981' : '#ef4444'} fontSize="9" fontWeight="700">
                            {candle.status ? candle.status.toUpperCase() : ''}
                          </text>
                          {candle.approvalStatus && (
                            <text x={x} y={Math.max(4, Math.min(highY, bodyTop) - 85) + 42}
                              textAnchor="middle" fill="#64748b" fontSize="8">
                              {candle.approvalStatus}
                            </text>
                          )}
                          <text x={x} y={Math.max(4, Math.min(highY, bodyTop) - 85) + 57}
                            textAnchor="middle" fill="#94a3b8" fontSize="8">
                            O: {candle.open.toFixed(1)}  C: {candle.close.toFixed(1)}
                          </text>
                          <text x={x} y={Math.max(4, Math.min(highY, bodyTop) - 85) + 70}
                            textAnchor="middle" fill="#94a3b8" fontSize="8">
                            H: {candle.high.toFixed(1)}  L: {candle.low.toFixed(1)}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                <line x1="0" y1={chartHeight} x2={data.length * 20 + 40} y2={chartHeight}
                  stroke="#475569" strokeWidth="1" opacity="0.5"
                />
              </svg>

              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>{data[0]?.date}</span>
                <span>{data[Math.floor(data.length / 2)]?.date}</span>
                <span>{data[data.length - 1]?.date}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-8 pt-6 border-t border-slate-600/50">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500"></div>
              <span className="text-sm text-slate-400">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span className="text-sm text-slate-400">Absent</span>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          Green candles = Present days • Red candles = Absent days
        </p>
      </div>
    </div>
  );
}