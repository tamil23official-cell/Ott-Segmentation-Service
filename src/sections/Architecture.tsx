import { Brain, Globe, ShieldCheck, Container, ArrowRight, CheckCircle2, Activity, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export function Architecture() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  const services = [
    {
      name: 'Trainer Service',
      icon: Brain,
      gradient: 'from-brand-blue to-cyan-500',
      tasks: [
        'Loads and preprocesses viewer dataset',
        'Performs feature engineering on watch patterns',
        'Trains KMeans clustering model (K=5)',
        'Saves serialized model artifact to disk',
      ],
      port: 'Internal',
    },
    {
      name: 'API Service',
      icon: Globe,
      gradient: 'from-brand-indigo to-brand-violet',
      tasks: [
        'Loads pre-trained KMeans model on startup',
        'GET /health — returns service status',
        'POST /recommend — assigns segment & returns recs',
        'No retraining — instant inference per request',
      ],
      port: 'Port 8000',
    },
    {
      name: 'Evaluator Service',
      icon: ShieldCheck,
      gradient: 'from-green-500 to-emerald-600',
      tasks: [
        'Pings /health to verify API is live',
        'Sends test viewer profiles through API',
        'Computes silhouette & inertia metrics',
        'Writes metrics.json for monitoring',
      ],
      port: 'On-demand',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">System Architecture</h2>
          <p className="text-slate-400 mt-1">Three microservices orchestrated by Docker Compose.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-ring" />
          <span className="text-xs font-medium text-green-400">System Healthy</span>
        </div>
      </div>

      {/* Service Cards */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc, i) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.name}
              className={`glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center mb-4 border-glow`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-base font-bold text-white">{svc.name}</h3>
              <span className="text-[10px] text-slate-500 mt-1 inline-block">{svc.port}</span>

              <ul className="mt-4 space-y-2.5">
                {svc.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Connection Flow */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-4">Data Flow</h3>
        <div className="flex flex-col md:flex-row items-center gap-3">
          {['Trainer', 'Model Artifact', 'API Service', 'Evaluator'].map((node, i) => (
            <div key={node} className="flex items-center gap-3">
              <div className="px-4 py-2.5 rounded-xl bg-ink-700/60 border border-white/10 text-xs font-medium text-white">
                {node}
              </div>
              {i < 3 && <ArrowRight className="w-4 h-4 text-slate-600 rotate-90 md:rotate-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Docker Compose */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5 bg-ink-700/30">
          <Container className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-semibold text-white">docker-compose.yml</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">
            <Activity className="w-3 h-3 text-green-400" />
            3 containers running
          </span>
        </div>
        <pre className="p-5 text-xs leading-relaxed overflow-x-auto font-mono text-slate-300">
{`version: "3.8"

services:
  trainer:
    build: ./trainer
    volumes:
      - ./models:/app/models
    command: python train.py

  api:
    build: ./api
    ports:
      - "8000:8000"
    volumes:
      - ./models:/app/models:ro
    depends_on:
      - trainer
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s

  evaluator:
    build: ./evaluator
    depends_on:
      - api
    command: python evaluate.py --api http://api:8000`}
        </pre>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Containers', value: '3', icon: Container },
          { label: 'API Latency', value: '<50ms', icon: Zap },
          { label: 'Uptime', value: '99.9%', icon: Activity },
          { label: 'Health Checks', value: 'Passing', icon: ShieldCheck },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-ink-700/50 flex items-center justify-center border border-white/5">
                <Icon className="w-4 h-4 text-brand-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-white font-display">{s.value}</p>
                <p className="text-[10px] text-slate-400">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
