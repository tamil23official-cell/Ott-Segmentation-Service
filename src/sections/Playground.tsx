import { useState } from 'react';
import { Sparkles, Play, AlertCircle, Loader2, CheckCircle2, Film, Star, Clock } from 'lucide-react';
import { generateRecommendation, segments, type RecommendationResult, type MovieRec } from '@/data/mockData';

const allGenres = ['Action', 'Thriller', 'Comedy', 'Drama', 'Family', 'Romance', 'Documentary'];

interface FormState {
  userId: string;
  watchTime: string;
  sessionDuration: string;
  genres: string[];
}

interface Errors {
  userId?: string;
  watchTime?: string;
  sessionDuration?: string;
  genres?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export function Playground() {
  const [form, setForm] = useState<FormState>({
    userId: '',
    watchTime: '',
    sessionDuration: '',
    genres: [],
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  function validate(): boolean {
    const e: Errors = {};
    if (!form.userId.trim()) e.userId = 'User ID is required';
    if (!form.watchTime) e.watchTime = 'Watch time is required';
    else {
      const wt = parseFloat(form.watchTime);
      if (isNaN(wt)) e.watchTime = 'Must be a valid number';
      else if (wt < 0) e.watchTime = 'Cannot be negative';
    }
    if (!form.sessionDuration) e.sessionDuration = 'Session duration is required';
    else {
      const sd = parseFloat(form.sessionDuration);
      if (isNaN(sd)) e.sessionDuration = 'Must be a valid number';
      else if (sd < 0) e.sessionDuration = 'Cannot be negative';
    }
    if (form.genres.length === 0) e.genres = 'Select at least one genre';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function toggleGenre(g: string) {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(g) ? prev.genres.filter((x) => x !== g) : [...prev.genres, g],
    }));
    if (errors.genres) setErrors((prev) => ({ ...prev, genres: undefined }));
  }

  function handleSubmit() {
    if (!validate()) return;
    setStatus('loading');
    setResult(null);
    setTimeout(() => {
      try {
        const res = generateRecommendation(
          form.userId.trim(),
          parseFloat(form.watchTime),
          parseFloat(form.sessionDuration),
          form.genres
        );
        setResult(res);
        setStatus('success');
      } catch {
        setErrorMsg('Failed to generate recommendations. Please try again.');
        setStatus('error');
      }
    }, 1400);
  }

  function reset() {
    setForm({ userId: '', watchTime: '', sessionDuration: '', genres: [] });
    setStatus('idle');
    setResult(null);
    setErrors({});
  }

  const matchedSegment = result ? segments.find((s) => s.id === result.segmentId) : null;

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Recommendation Playground</h2>
        <p className="text-slate-400 mt-1">Enter a viewer profile and let the ML model assign a segment and recommend content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 space-y-5 h-fit">
          <div>
            <label className="text-xs font-medium text-slate-300 mb-2 block">User ID</label>
            <input
              type="text"
              value={form.userId}
              onChange={(e) => { setForm({ ...form, userId: e.target.value }); if (errors.userId) setErrors({ ...errors, userId: undefined }); }}
              placeholder="e.g. USR-8192"
              className={`w-full px-4 py-3 rounded-xl bg-ink-700/50 text-sm text-white placeholder:text-slate-500 border transition-all outline-none ${
                errors.userId ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-indigo/50'
              }`}
            />
            {errors.userId && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.userId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300 mb-2 block">Watch Time (hrs)</label>
              <input
                type="number"
                value={form.watchTime}
                onChange={(e) => { setForm({ ...form, watchTime: e.target.value }); if (errors.watchTime) setErrors({ ...errors, watchTime: undefined }); }}
                placeholder="32.5"
                className={`w-full px-4 py-3 rounded-xl bg-ink-700/50 text-sm text-white placeholder:text-slate-500 border transition-all outline-none ${
                  errors.watchTime ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-indigo/50'
                }`}
              />
              {errors.watchTime && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.watchTime}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-300 mb-2 block">Avg Session (min)</label>
              <input
                type="number"
                value={form.sessionDuration}
                onChange={(e) => { setForm({ ...form, sessionDuration: e.target.value }); if (errors.sessionDuration) setErrors({ ...errors, sessionDuration: undefined }); }}
                placeholder="85"
                className={`w-full px-4 py-3 rounded-xl bg-ink-700/50 text-sm text-white placeholder:text-slate-500 border transition-all outline-none ${
                  errors.sessionDuration ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-indigo/50'
                }`}
              />
              {errors.sessionDuration && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.sessionDuration}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 mb-2 block">Favorite Genres</label>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((g) => {
                const selected = form.genres.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                      selected
                        ? 'bg-gradient-to-r from-brand-indigo to-brand-violet text-white border-transparent scale-105 shadow-lg shadow-brand-indigo/20'
                        : 'bg-ink-700/50 text-slate-400 border-white/10 hover:border-brand-indigo/30 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
            {errors.genres && <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.genres}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-indigo/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {status === 'loading' ? 'Analyzing...' : 'Generate Recommendations'}
            </button>
            <button
              onClick={reset}
              className="px-5 py-3.5 rounded-xl glass text-slate-300 text-sm font-medium hover:text-white transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {status === 'idle' && (
            <div className="glass rounded-2xl p-12 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-ink-700/50 flex items-center justify-center mb-4 border border-white/5">
                <Film className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm max-w-xs">Fill in the viewer profile and click <span className="text-brand-blue font-medium">Generate Recommendations</span> to see results.</p>
            </div>
          )}

          {status === 'loading' && (
            <div className="glass rounded-2xl p-12 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
              <Loader2 className="w-12 h-12 text-brand-indigo animate-spin mb-4" />
              <p className="text-slate-300 text-sm">Running KMeans inference...</p>
              <p className="text-slate-500 text-xs mt-1">Assigning segment and matching content</p>
            </div>
          )}

          {status === 'error' && (
            <div className="glass rounded-2xl p-12 h-full flex flex-col items-center justify-center text-center min-h-[400px] border border-red-500/20">
              <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
              <p className="text-white text-sm font-medium">Something went wrong</p>
              <p className="text-slate-400 text-xs mt-1">{errorMsg}</p>
              <button onClick={handleSubmit} className="mt-4 px-4 py-2 rounded-lg glass text-sm text-white hover:bg-white/10 transition-all">Retry</button>
            </div>
          )}

          {status === 'success' && result && matchedSegment && (
            <div className="space-y-4 animate-fade-in-up">
              {/* Result Header */}
              <div className="glass rounded-2xl p-6 border-glow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${matchedSegment.gradient} flex items-center justify-center flex-shrink-0`}>
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-400">User</span>
                      <span className="text-sm font-semibold text-white">{result.userId}</span>
                      <span className="text-slate-600">→</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-indigo/20 text-brand-violet border border-brand-indigo/30">
                        Segment {result.segmentId}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-2">{result.segmentName}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="bg-ink-700/50 rounded-lg p-3 border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">Segment ID</p>
                    <p className="text-lg font-bold text-brand-blue font-display">{result.segmentId}</p>
                  </div>
                  <div className="bg-ink-700/50 rounded-lg p-3 border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">Distance</p>
                    <p className="text-lg font-bold text-brand-violet font-display">{result.distanceToCentroid}</p>
                  </div>
                  <div className="bg-ink-700/50 rounded-lg p-3 border border-white/5 text-center">
                    <p className="text-[10px] text-slate-500 uppercase">Match</p>
                    <p className="text-lg font-bold text-green-400 font-display">{Math.round((1 - result.distanceToCentroid) * 100)}%</p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-ink-700/30 rounded-xl border border-white/5">
                  <p className="text-xs font-semibold text-slate-300 mb-1">Why this segment?</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{result.explanation}</p>
                </div>
              </div>

              {/* Recommendation Cards */}
              <div>
                <p className="text-xs font-semibold text-slate-300 mb-3 px-1">Recommended for you</p>
                <div className="grid grid-cols-2 gap-4">
                  {result.recommendations.map((movie, i) => (
                    <RecCard key={movie.title} movie={movie} delay={i * 0.1} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RecCard({ movie, delay }: { movie: MovieRec; delay: number }) {
  return (
    <div
      className="glass rounded-xl overflow-hidden group hover:-translate-y-1 hover:border-brand-indigo/30 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative h-40 bg-gradient-to-br from-ink-600 to-ink-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-12 h-12 text-slate-600 group-hover:scale-110 transition-transform" />
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-brand-blue">{movie.match}% match</span>
        </div>
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm flex items-center gap-1">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-medium text-white">{movie.rating}</span>
        </div>
        <button className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110">
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </button>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-white truncate">{movie.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-slate-400">{movie.genre}</span>
          <span className="text-slate-600">·</span>
          <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{movie.duration}</span>
          <span className="text-slate-600">·</span>
          <span className="text-[10px] text-slate-400">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}
