import { LayoutDashboard, Layers, Sparkles, BarChart3, Server, Code2, X, Clapperboard } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'segments', label: 'Audience Segments', icon: Layers },
  { id: 'playground', label: 'Recommendation Playground', icon: Sparkles },
  { id: 'insights', label: 'Model Insights', icon: BarChart3 },
  { id: 'architecture', label: 'System Architecture', icon: Server },
  { id: 'api', label: 'API Explorer', icon: Code2 },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ active, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onCloseMobile} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full glass-strong border-r border-white/5 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-violet flex items-center justify-center border-glow">
                <Clapperboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white font-display leading-tight">OTT Intelligence</h1>
                <p className="text-[10px] text-slate-400">Audience Segmentation</p>
              </div>
            </div>
            <button onClick={onCloseMobile} className="lg:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-indigo/20 to-transparent text-white border border-brand-indigo/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                  <span>{item.label}</span>
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5">
            <div className="glass rounded-xl p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse-ring" />
              <div>
                <p className="text-xs font-semibold text-white">System Healthy</p>
                <p className="text-[10px] text-slate-400">All services operational</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
