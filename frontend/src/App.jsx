import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Report from './pages/Report';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState('cyberpunk');

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 ${
        theme === 'matrix' ? 'bg-zinc-950' : theme === 'slate' ? 'bg-slate-900' : 'bg-slate-950'
      }`}>
        <Navbar onThemeChange={setTheme} currentTheme={theme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}