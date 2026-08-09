import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, Brain, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { startInterview } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState('candidate_01');
  const [loading, setLoading] = useState(false);

  const mockProfile = {
    candidate_id: candidateId,
    completed_missions: [
      { day: 1, topic: "Prompt Engineering & Structured Outputs" },
      { day: 5, topic: "Vector Search & Hybrid RAG" },
      { day: 12, topic: "Agentic Workflows & State Machines" },
      { day: 18, topic: "Model Context Protocol (MCP)" }
    ]
  };

  const mockCurriculum = {
    modules: [
      { day: 1, title: "Prompts" },
      { day: 5, title: "RAG" },
      { day: 12, title: "Agents" },
      { day: 18, title: "MCP" }
    ]
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const data = await startInterview(candidateId, mockProfile, mockCurriculum);
      navigate('/interview', { state: { initialData: data, profile: mockProfile } });
    } catch (err) {
      alert("Error connecting to backend! Ensure Python backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl bg-blob-1 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bg-blob-2 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Header Tag */}
        <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>VicoDathon Technical Challenge Candidate Assessor</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
          Conduct Realistic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500">
            AI Cohort Interviews
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          An adaptive AI Staff Architect that evaluates candidates across 31 curriculum missions with scenario-driven questions and deep dynamic follow-ups.
        </p>

        {/* Candidate Configuration Card */}
        <div className="glass-card glass-card-hover border border-slate-800 p-8 rounded-3xl max-w-lg mx-auto text-left shadow-2xl relative">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Simulated Candidate Profile
          </label>
          
          <div className="relative mb-6">
            <input 
              type="text" 
              value={candidateId} 
              onChange={(e) => setCandidateId(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              placeholder="Enter candidate ID..."
            />
            <span className="absolute right-3 top-3.5 text-xs font-mono text-slate-500">
              ID: #9942
            </span>
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-xs text-slate-400 font-medium">Completed Missions Detected:</p>
            <div className="flex flex-wrap gap-2">
              {['Day 01: Prompts', 'Day 05: Hybrid RAG', 'Day 12: Agents', 'Day 18: MCP Protocol'].map((tag, i) => (
                <span key={i} className="flex items-center space-x-1 bg-slate-800/80 text-slate-300 text-[11px] px-2.5 py-1 rounded-md border border-slate-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold py-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 disabled:opacity-50 group cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            <span className="text-sm uppercase tracking-wide">{loading ? "Initializing Agent Context..." : "Launch Interview Session"}</span>
            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 max-w-4xl mx-auto text-left">
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <Brain className="w-6 h-6 text-cyan-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-200">Adaptive Deep Probe</h3>
            <p className="text-xs text-slate-400 mt-1">Detects vague answers and forces candidates to defend trade-offs and edge cases.</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <Cpu className="w-6 h-6 text-purple-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-200">≥ 8 Turns &amp; 4 Days</h3>
            <p className="text-xs text-slate-400 mt-1">Guarantees multi-turn coverage across at least 4 unique cohort modules.</p>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-sm font-bold text-slate-200">Structured Report</h3>
            <p className="text-xs text-slate-400 mt-1">Outputs JSON scorecards detailing technical depth, accuracy, and clarity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}