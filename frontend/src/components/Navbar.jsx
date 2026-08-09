import React, { useState } from 'react';
import { Bot, Terminal, Palette, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onThemeChange, currentTheme }) {
  const [showPalette, setShowPalette] = useState(false);

  const themes = [
    { id: 'cyberpunk', name: 'Cyber Neon', color: 'from-cyan-500 to-purple-600' },
    { id: 'matrix', name: 'Matrix Green', color: 'from-emerald-500 to-teal-700' },
    { id: 'slate', name: 'Deep Space', color: 'from-slate-600 to-slate-800' }
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 opacity-75 blur transition group-hover:opacity-100" />
          <div className="relative bg-slate-950 p-2 rounded-lg border border-slate-800">
            <Bot className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-lg text-white tracking-wide">VicoDathon</span>
            <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              AI Agent v2.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Personalized Cohort Interviewer</p>
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        {/* Theme Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowPalette(!showPalette)}
            className="flex items-center space-x-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-medium transition"
          >
            <Palette className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {showPalette && (
            <div className="absolute right-0 mt-2 w-40 glass-card border border-slate-700 rounded-xl p-2 shadow-2xl z-50 space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onThemeChange(t.id);
                    setShowPalette(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-lg transition ${
                    currentTheme === t.id ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${t.color}`} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center space-x-2 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono font-medium hidden sm:inline">FastAPI Active</span>
        </div>
      </div>
    </nav>
  );
}