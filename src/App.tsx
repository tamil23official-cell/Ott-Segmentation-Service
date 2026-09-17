import { useState, useEffect, useCallback } from 'react';
import { Menu, Clapperboard } from 'lucide-react';
import { Sidebar, navItems } from '@/components/Sidebar';
import { Dashboard } from '@/sections/Dashboard';
import { Segments } from '@/sections/Segments';
import { Playground } from '@/sections/Playground';
import { ModelInsights } from '@/sections/ModelInsights';
import { Architecture } from '@/sections/Architecture';
import { ApiExplorer } from '@/sections/ApiExplorer';

function App() {
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = useCallback((id: string) => {
    setActive(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeLabel = navItems.find((n) => n.id === active)?.label ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-ink-900 flex">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-indigo/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-blue/6 rounded-full blur-[120px]" />
      </div>

      <Sidebar active={active} onNavigate={handleNavigate} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex-1 min-w-0 relative">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 glass-strong px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-300"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue via-brand-indigo to-brand-violet flex items-center justify-center">
              <Clapperboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white font-display">OTT Intelligence</span>
          </div>
        </header>

        {/* Desktop breadcrumb */}
        <header className="hidden lg:flex sticky top-0 z-30 glass-strong px-8 py-4 items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">OTT Audience Intelligence</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-medium">{activeLabel}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-ring" />
            <span className="text-xs text-green-400 font-medium">System Healthy</span>
          </div>
        </header>

        {/* Main content */}
        <main className="relative p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          <div key={active} className="animate-fade-in-up">
            {active === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {active === 'segments' && <Segments />}
            {active === 'playground' && <Playground />}
            {active === 'insights' && <ModelInsights />}
            {active === 'architecture' && <Architecture />}
            {active === 'api' && <ApiExplorer />}
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clapperboard className="w-4 h-4 text-brand-indigo" />
              <span>OTT Audience Intelligence — Hackathon Project</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>KMeans Clustering</span>
              <span className="text-slate-700">|</span>
              <span>Unsupervised Learning</span>
              <span className="text-slate-700">|</span>
              <span>Docker Compose</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
