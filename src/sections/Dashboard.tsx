import { Users, Layers, Clock, Sparkles, ArrowRight, TrendingUp, Play } from 'lucide-react';
import { kpiData } from '@/data/mockData';
import { DonutChart, EngagementLineChart, GenreBarChart } from '@/components/Charts';
import { useInView } from '@/hooks/useInView';

const iconMap: Record<string, typeof Users> = { Users, Layers, Clock, Sparkles };

interface DashboardProps {
  onNavigate: (id: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { ref: heroRef, inView: heroIn } = useInView<HTMLDivElement>(0.1);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div ref={heroRef} className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/20 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-brand-blue rounded-full animate-float" />
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-brand-violet rounded-full animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative p-8 sm:p-12 lg:p-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-brand-blue mb-6 ${heroIn ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            ML-Powered Audience Intelligence
          </div>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-4 ${heroIn ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            Understand Every <span className="text-gradient">Viewer.</span>
          </h1>
          <p className={`text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed ${heroIn ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            AI-powered audience segmentation and personalized OTT recommendations. Clustering 125,000+ viewers into behavioral profiles for precision targeting.
          </p>
          <div className={`flex flex-wrap gap-4 ${heroIn ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => onNavigate('segments')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-indigo/30 transition-all hover:scale-[1.02]"
            >
              Explore Segments
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass text-white font-semibold text-sm hover:bg-white/10 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 text-brand-blue" />
              Try Recommendation Engine
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = iconMap[kpi.icon];
          return (
            <div
              key={kpi.label}
              className="glass rounded-2xl p-5 hover:border-brand-indigo/30 transition-all duration-300 group hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-indigo/20 to-brand-blue/10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${kpi.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                  <TrendingUp className="w-3 h-3" />
                  {kpi.trend}
                </span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white font-display">
                {kpi.value}
                {kpi.suffix && <span className="text-base text-slate-400 ml-1">{kpi.suffix}</span>}
              </p>
              <p className="text-xs text-slate-400 mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold text-white mb-1">Audience Distribution</h3>
          <p className="text-xs text-slate-400 mb-6">Viewers by preferred genre</p>
          <DonutChart />
        </div>
        <div className="glass rounded-2xl p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold text-white mb-1">Engagement Trends</h3>
          <p className="text-xs text-slate-400 mb-6">Monthly engagement score (2025)</p>
          <EngagementLineChart />
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet" />
              <span className="text-xs text-slate-400">Engagement Index</span>
            </div>
            <span className="text-xs text-green-400 font-medium ml-auto">+48% YoY</span>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 lg:col-span-1">
          <h3 className="text-sm font-semibold text-white mb-1">Preferred Genres</h3>
          <p className="text-xs text-slate-400 mb-6">Top genres by viewer count</p>
          <GenreBarChart />
        </div>
      </div>
    </div>
  );
}
