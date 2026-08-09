import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Award, RefreshCw } from 'lucide-react';

export default function Report() {
  const location = useLocation();
  const summary = location.state?.summary || "Interview Complete!";

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-6">
      <Award className="w-12 h-12 text-emerald-400 mx-auto" />
      <h1 className="text-2xl font-bold text-white">Interview Summary</h1>
      <p className="text-slate-300 text-sm">{summary}</p>
      <Link to="/" className="inline-flex items-center space-x-2 bg-slate-800 text-cyan-400 px-6 py-2.5 rounded-xl border border-slate-700">
        <RefreshCw className="w-4 h-4" />
        <span>Start New Session</span>
      </Link>
    </div>
  );
}