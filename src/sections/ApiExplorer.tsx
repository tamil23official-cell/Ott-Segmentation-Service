import { useState } from 'react';
import { Check, Copy, Terminal, Heart, Send } from 'lucide-react';

const endpoints = [
  {
    method: 'GET',
    path: '/health',
    label: 'Health Check',
    icon: Heart,
    color: 'text-green-400',
    badge: 'bg-green-500/15 text-green-400 border-green-500/20',
    request: null,
    response: `{
  "status": "ok",
  "model_loaded": true
}`,
  },
  {
    method: 'POST',
    path: '/recommend',
    label: 'Get Recommendations',
    icon: Send,
    color: 'text-brand-violet',
    badge: 'bg-brand-indigo/15 text-brand-violet border-brand-indigo/20',
    request: `{
  "user_id": "USR-8192",
  "watch_time_hours": 32.5,
  "top_genres": ["Action", "Thriller"],
  "avg_session_mins": 85
}`,
    response: `{
  "user_id": "USR-8192",
  "segment_id": 3,
  "segment_name": "High-Engagement Action Viewers",
  "recommendations": ["Shadow Strike", "Midnight Run", "Velocity"],
  "distance_to_centroid": 0.42
}`,
  },
];

export function ApiExplorer() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState(0);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const ep = endpoints[activeEndpoint];

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">API Explorer</h2>
        <p className="text-slate-400 mt-1">REST endpoints exposed by the API service. Try them in your terminal.</p>
      </div>

      {/* Endpoint Tabs */}
      <div className="flex flex-wrap gap-3">
        {endpoints.map((e, i) => {
          const Icon = e.icon;
          return (
            <button
              key={e.path}
              onClick={() => setActiveEndpoint(i)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeEndpoint === i
                  ? 'glass border-brand-indigo/30 text-white'
                  : 'bg-ink-700/30 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${activeEndpoint === i ? e.color : ''}`} />
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${e.badge}`}>{e.method}</span>
              <span className="font-mono text-xs">{e.path}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal-style display */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-ink-700/30">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <span className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-slate-500 ml-2" />
          <span className="text-xs text-slate-400 font-mono">api.ott-intelligence.local{ep.path}</span>
          <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-bold border ${ep.badge}`}>{ep.method}</span>
        </div>

        <div className="p-5 space-y-4">
          {/* Request */}
          {ep.request && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Request Body</span>
                <button
                  onClick={() => copy(ep.request!, 'req')}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
                >
                  {copied === 'req' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied === 'req' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="bg-ink-900/60 rounded-xl p-4 text-xs leading-relaxed font-mono text-slate-300 overflow-x-auto border border-white/5">
                {ep.request}
              </pre>
            </div>
          )}

          {/* Response */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Response</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                  200 OK
                </span>
              </div>
              <button
                onClick={() => copy(ep.response, 'res')}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
              >
                {copied === 'res' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                {copied === 'res' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="bg-ink-900/60 rounded-xl p-4 text-xs leading-relaxed font-mono text-slate-300 overflow-x-auto border border-white/5">
              {ep.response}
            </pre>
          </div>
        </div>
      </div>

      {/* Curl example */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-ink-700/30">
          <span className="text-xs font-semibold text-white">cURL Example</span>
        </div>
        <div className="p-5">
          <pre className="bg-ink-900/60 rounded-xl p-4 text-xs leading-relaxed font-mono text-slate-300 overflow-x-auto border border-white/5">
{ep.method === 'GET'
  ? `curl -X GET http://localhost:8000/health \\
  -H "Content-Type: application/json"`
  : `curl -X POST http://localhost:8000/recommend \\
  -H "Content-Type: application/json" \\
  -d '${ep.request?.replace(/\n\s*/g, ' ')}'`}
          </pre>
        </div>
      </div>
    </div>
  );
}
