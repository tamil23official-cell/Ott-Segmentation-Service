import { Flame, Clock, Compass, Moon, Users, Target } from 'lucide-react';
import { segments } from '@/data/mockData';
import { useInView } from '@/hooks/useInView';

const iconMap: Record<string, typeof Flame> = { Flame, Clock, Compass, Moon, Users };

export function Segments() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Audience Segments</h2>
        <p className="text-slate-400 mt-1">Five behavioral clusters identified by KMeans on 125K viewer profiles.</p>
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {segments.map((seg, i) => {
          const Icon = iconMap[seg.icon];
          return (
            <div
              key={seg.id}
              className={`glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20 ${
                inView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Header */}
              <div className={`relative h-28 bg-gradient-to-br ${seg.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                <div className="relative h-full flex items-center justify-between px-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-white font-display">{seg.percentage}%</span>
                    <p className="text-xs text-white/70">of audience</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-white leading-tight">{seg.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{seg.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-ink-700/50 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">Avg Watch Time</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{seg.avgWatchTime}</p>
                  </div>
                  <div className="bg-ink-700/50 rounded-lg p-3 border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">Avg Session</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{seg.avgSessionDuration}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Top Genres</p>
                  <div className="flex flex-wrap gap-1.5">
                    {seg.topGenres.map((g) => (
                      <span key={g} className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-slate-200">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-brand-violet flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wide">Personalization Strategy</p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{seg.strategy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
