import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitAnswer } from '../services/api';
import { Send, Bot, User, Layers, Cpu, Zap, CheckCircle } from 'lucide-react';
import AudioVisualizer from '../components/AudioVisualizer';

export default function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialData = location.state?.initialData;

  const [sessionId] = useState(initialData?.session_id);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialData?.interviewer_message || "Welcome! Let's examine your cohort implementations." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionNum, setQuestionNum] = useState(initialData?.question_number || 1);
  const scrollRef = useRef(null);

  // Quick suggestion answers for hackathon testing
  const quickPills = [
    "I used hybrid search with dense vectors and BM25 reranking to handle keyword noise.",
    "State transitions were managed using a Pydantic state machine stored in Redis.",
    "We enforced structured output schemas via function calling to eliminate parsing errors.",
    "Backpressure was handled by queuing requests in RabbitMQ and scaling worker nodes."
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const finalMsg = textToSend || input;
    if (!finalMsg.trim() || loading) return;

    const newMsgs = [...messages, { role: 'user', content: finalMsg }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await submitAnswer(sessionId, finalMsg);
      if (res.is_complete) {
        navigate('/report', { state: { summary: res.summary } });
      } else {
        setMessages([...newMsgs, { role: 'assistant', content: res.interviewer_message }]);
        setQuestionNum(res.question_number || questionNum + 1);
      }
    } catch (err) {
      alert("Failed to submit response to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-80px)] p-4 flex flex-col md:flex-row gap-4">
      {/* Sidebar Analytics Console */}
      <div className="w-full md:w-72 glass-card p-4 rounded-2xl border border-slate-800 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Assessment Status</span>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2 mt-1">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Live Console</span>
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Turns Completed</span>
                <span className="font-mono text-cyan-400 font-bold">{questionNum} / 8+</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (questionNum / 8) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Active Topics</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {['Day 01', 'Day 05', 'Day 12', 'Day 18'].map((d, i) => (
                  <span key={i} className="bg-cyan-500/10 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/20">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AudioVisualizer isActive={loading} />
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 glass-card border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 rounded-xl shrink-0 ${
                m.role === 'assistant' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 neon-border-cyan' 
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/30 neon-border-purple'
              }`}>
                {m.role === 'assistant' ? <Bot className="w-5 h-5"/> : <User className="w-5 h-5"/>}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                m.role === 'assistant' 
                  ? 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-md' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-3 text-cyan-400 text-xs font-mono animate-pulse">
              <Zap className="w-4 h-4 animate-spin" />
              <span>Interviewer is evaluating technical depth...</span>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Quick Answer Suggestions */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] font-mono text-slate-500 shrink-0">Demo Shortcuts:</span>
          {quickPills.map((pill, i) => (
            <button
              key={i}
              onClick={() => handleSend(pill)}
              disabled={loading}
              className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-2.5 py-1 rounded-lg shrink-0 transition text-left truncate max-w-xs cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="bg-slate-950 p-4 border-t border-slate-800 flex items-center space-x-3">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your technical response..."
            disabled={loading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 p-3.5 rounded-xl font-bold transition disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <Send className="w-4 h-4"/>
          </button>
        </form>
      </div>
    </div>
  );
}