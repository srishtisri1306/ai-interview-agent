import React from 'react';

export default function AudioVisualizer({ isActive }) {
  return (
    <div className="flex items-center space-x-1 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg">
      <span className="text-[10px] uppercase font-mono text-cyan-400 mr-2">Agent Voice</span>
      {[40, 70, 30, 90, 50, 80, 40].map((height, i) => (
        <div
          key={i}
          className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${
            isActive ? 'animate-pulse' : 'opacity-30'
          }`}
          style={{
            height: isActive ? `${Math.max(12, (height * Math.random()).toFixed(0))}px` : '6px',
            animationDelay: `${i * 0.15}s`
          }}
        />
      ))}
    </div>
  );
}