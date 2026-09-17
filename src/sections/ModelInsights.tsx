import { Database, Wrench, Scaling, CircleDot, Save, Globe, ChartBar, ChevronRight, Info } from 'lucide-react';
import { pipelineSteps, elbowData } from '@/data/mockData';
import { ElbowChart, ClusterBalanceChart } from '@/components/Charts';
import { useInView } from '@/hooks/useInView';

const iconMap: Record<string, typeof Database> = {
  Database, Wrench, Scaling, CircleDot, Save, Globe, ChartBar,
};

export function ModelInsights() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  const metrics = [
    { label: 'Silhouette Score', value: '0.72', desc: 'Well-separated clusters', color: 'text-green-400' },
    { label: 'Inertia Score', value: '2,800', desc: 'Within-cluster sum of squares', color: 'text-brand-blue' },
    { label: 'Cluster Stability', value: '94.2%', desc: 'Consistent across re-runs', color: 'text-brand-violet' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Model Insights</h2>
        <p className="text-slate-400 mt-1">The ML pipeline — from raw data to deployed inference.</p>
      </div>

      {/* Info Banner */}
      <div className="glass rounded-2xl p-5 flex items-start gap-3 border border-brand-indigo/15">
        <Info className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-300 leading-relaxed">
          This system uses <span className="text-white font-medium">unsupervised learning</span> (KMeans clustering).
          The model is trained offline and saved as a serialized artifact. The API loads the pre-trained model at startup
          and serves predictions without retraining on each request — ensuring sub-millisecond inference latency.
        </p>
      </div>

      {/* Pipeline */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-white mb-6">ML Pipeline</h3>
        <div ref={ref} className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:overflow-x-auto">
          {pipelineSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.label} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-ink-700/40 border border-white/5 min-w-[120px] transition-all hover:border-brand-indigo/30 hover:bg-ink-700/60 ${
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-indigo/20 to-brand-blue/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <p className="text-xs font-semibold text-white text-center leading-tight">{step.label}</p>
                  <p className="text-[10px] text-slate-500 text-center">{step.detail}</p>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0 hidden lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className="glass rounded-2xl p-6 hover:border-brand-indigo/30 transition-all hover:-translate-y-1"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <p className="text-xs text-slate-400 mb-2">{m.label}</p>
            <p className={`text-3xl font-bold font-display ${m.color}`}>{m.value}</p>
            <p className="text-xs text-slate-500 mt-2">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Elbow Method</h3>
          <p className="text-xs text-slate-400 mb-6">Inertia vs. number of clusters — K=5 is the optimal elbow point</p>
          <ElbowChart />
          <div className="mt-4 p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
            <p className="text-xs text-fuchsia-300">
              <span className="font-semibold">Optimal K = 5</span> — the inertia drops sharply until K=5, then flattens. This confirms 5 segments as the best trade-off.
            </p>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Cluster Balance</h3>
          <p className="text-xs text-slate-400 mb-6">Number of viewers assigned to each segment</p>
          <ClusterBalanceChart />
        </div>
      </div>
    </div>
  );
}
