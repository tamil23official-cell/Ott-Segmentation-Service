import { useInView } from '@/hooks/useInView';
import { genreDistribution, engagementTrend, elbowData, clusterBalance } from '@/data/mockData';

export function DonutChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const total = genreDistribution.reduce((s, d) => s + d.viewers, 0);
  let cumulative = 0;
  const radius = 80;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6 sm:flex-row sm:justify-around">
      <div className="relative w-[220px] h-[220px] flex-shrink-0">
        <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
          {genreDistribution.map((d, i) => {
            const fraction = d.viewers / total;
            const dash = fraction * circumference;
            const offset = (cumulative / total) * circumference;
            cumulative += d.viewers;
            return (
              <circle
                key={d.genre}
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${inView ? dash : 0} ${circumference}`}
                strokeDashoffset={-offset}
                style={{ transition: `stroke-dasharray 1.2s ease ${i * 0.1}s` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white font-display">125K</span>
          <span className="text-xs text-slate-400">Total Viewers</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {genreDistribution.map((d) => (
          <div key={d.genre} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
            <span className="text-sm text-slate-300">{d.genre}</span>
            <span className="text-xs text-slate-500 ml-auto">{Math.round((d.viewers / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EngagementLineChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...engagementTrend.map((d) => d.value));
  const points = engagementTrend.map((d, i) => {
    const x = (i / (engagementTrend.length - 1)) * 100;
    const y = 100 - (d.value / max) * 80 - 10;
    return { x, y, ...d };
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div ref={ref} className="w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-48">
        <defs>
          <linearGradient id="engagementGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="engagementLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#engagementGrad)" opacity={inView ? 1 : 0} style={{ transition: 'opacity 1s ease 0.3s' }} />
        <path
          d={pathD}
          fill="none"
          stroke="url(#engagementLine)"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={inView ? 0 : 1000}
          style={{ transition: 'stroke-dashoffset 1.8s ease' }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between mt-2">
        {engagementTrend.map((d) => (
          <span key={d.month} className="text-[10px] text-slate-500">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export function GenreBarChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...genreDistribution.map((d) => d.viewers));
  return (
    <div ref={ref} className="space-y-3">
      {genreDistribution.map((d, i) => (
        <div key={d.genre} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-20 flex-shrink-0">{d.genre}</span>
          <div className="flex-1 h-6 bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
              style={{
                width: inView ? `${(d.viewers / max) * 100}%` : '0%',
                background: `linear-gradient(90deg, ${d.color}88, ${d.color})`,
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <span className="text-[10px] text-white font-medium">{(d.viewers / 1000).toFixed(1)}K</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ElbowChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const maxInertia = Math.max(...elbowData.map((d) => d.inertia));
  const w = 100;
  const h = 100;
  const points = elbowData.map((d, i) => ({
    x: (i / (elbowData.length - 1)) * w,
    y: h - (d.inertia / maxInertia) * 80 - 8,
    ...d,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const elbowIdx = 4;

  return (
    <div ref={ref} className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-48">
        <defs>
          <linearGradient id="elbowLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {points.map((p, i) =>
          i < points.length - 1 ? (
            <line key={i} x1={p.x} y1={p.y} x2={points[i + 1].x} y2={points[i + 1].y}
              stroke="url(#elbowLine)" strokeWidth="0.5" strokeDasharray="1000"
              strokeDashoffset={inView ? 0 : 1000}
              style={{ transition: `stroke-dashoffset 1.5s ease ${i * 0.1}s` }}
              vectorEffect="non-scaling-stroke" />
          ) : null
        )}
        {points.map((p, i) => (
          <g key={i}>
            {i === elbowIdx && (
              <circle cx={p.x} cy={p.y} r="3" fill="#f0abfc" opacity={inView ? 0.3 : 0}
                style={{ transition: `opacity 0.5s ease ${0.8 + i * 0.1}s` }}>
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={i === elbowIdx ? 1.8 : 1.2}
              fill={i === elbowIdx ? '#f0abfc' : '#6366f1'}
              opacity={inView ? 1 : 0}
              style={{ transition: `opacity 0.3s ease ${0.5 + i * 0.1}s` }} />
          </g>
        ))}
      </svg>
      <div className="flex justify-between mt-2 px-1">
        {elbowData.map((d) => (
          <span key={d.k} className={`text-[10px] ${d.k === 5 ? 'text-fuchsia-400 font-bold' : 'text-slate-500'}`}>K={d.k}</span>
        ))}
      </div>
    </div>
  );
}

export function ClusterBalanceChart() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...clusterBalance.map((d) => d.count));
  return (
    <div ref={ref} className="space-y-4">
      {clusterBalance.map((d, i) => (
        <div key={d.segment} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-20 flex-shrink-0">{d.segment}</span>
          <div className="flex-1 h-8 bg-ink-700 rounded-lg overflow-hidden relative">
            <div
              className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
              style={{
                width: inView ? `${(d.count / max) * 100}%` : '0%',
                background: `linear-gradient(90deg, ${d.color}66, ${d.color})`,
                transitionDelay: `${i * 0.12}s`,
              }}
            >
              <span className="text-xs text-white font-semibold">{d.count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
