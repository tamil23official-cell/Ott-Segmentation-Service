export interface SegmentData {
  id: number;
  name: string;
  shortName: string;
  icon: string;
  percentage: number;
  avgWatchTime: string;
  avgSessionDuration: string;
  topGenres: string[];
  description: string;
  strategy: string;
  color: string;
  gradient: string;
}

export interface MovieRec {
  title: string;
  genre: string;
  match: number;
  duration: string;
  rating: number;
  year: number;
}

export const segments: SegmentData[] = [
  {
    id: 3,
    name: 'High-Engagement Action Viewers',
    shortName: 'Action Loyalists',
    icon: 'Flame',
    percentage: 24,
    avgWatchTime: '42.8 hrs',
    avgSessionDuration: '92 min',
    topGenres: ['Action', 'Thriller', 'Sci-Fi'],
    description: 'Power users who binge long sessions and favor high-adrenaline content. They finish series and rarely abandon episodes.',
    strategy: 'Surface new action releases prominently. Notify on new seasons of thriller series. Recommend binge-worthy sequels and blockbuster premieres.',
    color: '#f97316',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 1,
    name: 'Casual Short-Session Viewers',
    shortName: 'Casual Snackers',
    icon: 'Clock',
    percentage: 31,
    avgWatchTime: '8.2 hrs',
    avgSessionDuration: '24 min',
    topGenres: ['Comedy', 'Reality', 'Short-form'],
    description: 'Light viewers who drop in for quick entertainment. Short bursts, often on mobile during commutes or breaks.',
    strategy: 'Highlight short-form comedy clips and standalone episodes. Use push notifications for trending clips. Avoid long series commitments.',
    color: '#38bdf8',
    gradient: 'from-sky-400 to-blue-600',
  },
  {
    id: 2,
    name: 'Genre Explorers',
    shortName: 'Explorers',
    icon: 'Compass',
    percentage: 18,
    avgWatchTime: '19.5 hrs',
    avgSessionDuration: '55 min',
    topGenres: ['Drama', 'Documentary', 'Mystery', 'Romance'],
    description: 'Curious viewers who jump across genres. They seek novelty and are open to international and indie content.',
    strategy: 'Rotate curated collections weekly. Feature "Hidden Gems" and "New Discoveries" rails. Personalize by recent exploration rather than fixed preferences.',
    color: '#a78bfa',
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    id: 4,
    name: 'Low-Activity Viewers',
    shortName: 'Dormant',
    icon: 'Moon',
    percentage: 15,
    avgWatchTime: '2.1 hrs',
    avgSessionDuration: '12 min',
    topGenres: ['News', 'Talk Shows'],
    description: 'Infrequent users with minimal engagement. Often lapsed subscribers who open the app rarely and watch little.',
    strategy: 'Deploy re-engagement campaigns with "We miss you" offers. Showcase trending headlines and can\'t-miss events. Limit notifications to avoid churn.',
    color: '#64748b',
    gradient: 'from-slate-400 to-slate-600',
  },
  {
    id: 5,
    name: 'Family Entertainment Fans',
    shortName: 'Family',
    icon: 'Users',
    percentage: 12,
    avgWatchTime: '15.3 hrs',
    avgSessionDuration: '68 min',
    topGenres: ['Family', 'Animation', 'Adventure'],
    description: 'Households that co-watch. Evening peaks, weekend spikes. They prefer wholesome content suitable for all ages.',
    strategy: 'Promote family movie nights and weekend collections. Highlight age-appropriate recommendations. Group profiles for multi-user households.',
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-600',
  },
];

export const movieDatabase: Record<string, MovieRec[]> = {
  Action: [
    { title: 'Shadow Strike', genre: 'Action', match: 96, duration: '2h 14m', rating: 8.4, year: 2025 },
    { title: 'Midnight Run', genre: 'Action', match: 91, duration: '1h 58m', rating: 7.9, year: 2024 },
    { title: 'Velocity', genre: 'Action', match: 88, duration: '2h 02m', rating: 8.1, year: 2025 },
    { title: 'Iron Protocol', genre: 'Action', match: 85, duration: '1h 47m', rating: 7.6, year: 2024 },
  ],
  Thriller: [
    { title: 'The Silent Pact', genre: 'Thriller', match: 93, duration: '2h 08m', rating: 8.2, year: 2025 },
    { title: 'Cold Harbor', genre: 'Thriller', match: 89, duration: '1h 52m', rating: 7.8, year: 2024 },
    { title: 'Deception Lane', genre: 'Thriller', match: 86, duration: '2h 15m', rating: 8.0, year: 2025 },
    { title: 'Nightfall', genre: 'Thriller', match: 82, duration: '1h 44m', rating: 7.5, year: 2024 },
  ],
  Comedy: [
    { title: 'Happy Accidents', genre: 'Comedy', match: 90, duration: '1h 38m', rating: 7.7, year: 2025 },
    { title: 'Office Royale', genre: 'Comedy', match: 87, duration: '1h 29m', rating: 7.4, year: 2024 },
    { title: 'Triple Threat', genre: 'Comedy', match: 84, duration: '1h 35m', rating: 7.2, year: 2025 },
    { title: 'The Weekend Plan', genre: 'Comedy', match: 81, duration: '1h 41m', rating: 7.0, year: 2024 },
  ],
  Drama: [
    { title: 'Tides of Change', genre: 'Drama', match: 92, duration: '2h 22m', rating: 8.6, year: 2025 },
    { title: 'Letters Unsent', genre: 'Drama', match: 88, duration: '2h 05m', rating: 8.1, year: 2024 },
    { title: 'The Long Way Home', genre: 'Drama', match: 85, duration: '1h 58m', rating: 7.8, year: 2025 },
    { title: 'Borrowed Time', genre: 'Drama', match: 83, duration: '2h 11m', rating: 7.9, year: 2024 },
  ],
  Family: [
    { title: 'Wonder Valley', genre: 'Family', match: 91, duration: '1h 42m', rating: 8.0, year: 2025 },
    { title: 'The Great Pet Adventure', genre: 'Family', match: 88, duration: '1h 36m', rating: 7.6, year: 2024 },
    { title: 'Starlight Pals', genre: 'Family', match: 86, duration: '1h 28m', rating: 7.5, year: 2025 },
    { title: 'Camp Evergreen', genre: 'Family', match: 83, duration: '1h 33m', rating: 7.3, year: 2024 },
  ],
  Romance: [
    { title: 'Summer in Lisbon', genre: 'Romance', match: 89, duration: '1h 51m', rating: 7.8, year: 2025 },
    { title: 'Two Hearts, One City', genre: 'Romance', match: 86, duration: '1h 47m', rating: 7.5, year: 2024 },
    { title: 'The Coffee Shop', genre: 'Romance', match: 84, duration: '1h 39m', rating: 7.3, year: 2025 },
    { title: 'Autumn Letters', genre: 'Romance', match: 81, duration: '1h 44m', rating: 7.1, year: 2024 },
  ],
  Documentary: [
    { title: 'Deep Blue Secrets', genre: 'Documentary', match: 90, duration: '1h 48m', rating: 8.3, year: 2025 },
    { title: 'Cities of Tomorrow', genre: 'Documentary', match: 87, duration: '1h 55m', rating: 8.0, year: 2024 },
    { title: 'The Codebreakers', genre: 'Documentary', match: 85, duration: '2h 01m', rating: 7.9, year: 2025 },
    { title: 'Wild Frontiers', genre: 'Documentary', match: 82, duration: '1h 42m', rating: 7.7, year: 2024 },
  ],
};

export interface RecommendationResult {
  userId: string;
  segmentId: number;
  segmentName: string;
  distanceToCentroid: number;
  explanation: string;
  recommendations: MovieRec[];
}

export function generateRecommendation(
  userId: string,
  watchTimeHours: number,
  avgSessionMins: number,
  genres: string[]
): RecommendationResult {
  let bestSegment = segments[1];
  let bestScore = -Infinity;

  for (const seg of segments) {
    const segWatch = parseFloat(seg.avgWatchTime);
    const segSession = parseInt(seg.avgSessionDuration);
    const watchSim = 1 - Math.abs(watchTimeHours - segWatch) / Math.max(segWatch, watchTimeHours, 1);
    const sessionSim = 1 - Math.abs(avgSessionMins - segSession) / Math.max(segSession, avgSessionMins, 1);
    const genreOverlap = genres.filter((g) => seg.topGenres.some((sg) => sg.toLowerCase().includes(g.toLowerCase()) || g.toLowerCase().includes(sg.toLowerCase()))).length / Math.max(genres.length, 1);
    const score = watchSim * 0.4 + sessionSim * 0.3 + genreOverlap * 0.3;
    if (score > bestScore) {
      bestScore = score;
      bestSegment = seg;
    }
  }

  const distance = (1 - bestScore) * 0.8 + 0.1;

  const recs: MovieRec[] = [];
  const usedGenres = new Set<string>();
  for (const g of genres) {
    const pool = movieDatabase[g] || [];
    for (const m of pool) {
      if (!recs.find((r) => r.title === m.title)) {
        recs.push({ ...m, match: Math.min(99, m.match + Math.floor(Math.random() * 4)) });
        usedGenres.add(g);
        break;
      }
    }
    if (recs.length >= 4) break;
  }
  while (recs.length < 4) {
    const fallbackGenres = bestSegment.topGenres;
    for (const fg of fallbackGenres) {
      const pool = movieDatabase[fg] || [];
      for (const m of pool) {
        if (!recs.find((r) => r.title === m.title)) {
          recs.push({ ...m, match: Math.max(70, m.match - 5) });
          break;
        }
      }
      if (recs.length >= 4) break;
    }
    if (recs.length < 4) break;
  }

  const explanations: Record<number, string> = {
    3: `With ${watchTimeHours.toFixed(1)} hours of watch time and ${avgSessionMins}-minute average sessions, this viewer matches the high-engagement action profile. Strong genre overlap with ${genres.join(', ')} confirms the action-thriller cluster. The model placed this profile ${distance.toFixed(2)} units from the segment centroid.`,
    1: `Short sessions (${avgSessionMins} min) and moderate watch time (${watchTimeHours.toFixed(1)} hrs) align with the casual snacking pattern. Genre preferences in ${genres.join(', ')} reinforce light-entertainment behavior. Distance to centroid: ${distance.toFixed(2)}.`,
    2: `Diverse genre interest (${genres.join(', ')}) with ${watchTimeHours.toFixed(1)} hours watched signals an exploratory viewer. The model detected cross-genre hopping behavior typical of this segment. Distance to centroid: ${distance.toFixed(2)}.`,
    4: `Low watch time (${watchTimeHours.toFixed(1)} hrs) and brief sessions (${avgSessionMins} min) classify this as a dormant viewer. Minimal genre engagement detected. Distance to centroid: ${distance.toFixed(2)}.`,
    5: `Watch patterns (${watchTimeHours.toFixed(1)} hrs, ${avgSessionMins}-min sessions) with preferences in ${genres.join(', ')} match household co-viewing behavior. Distance to centroid: ${distance.toFixed(2)}.`,
  };

  return {
    userId,
    segmentId: bestSegment.id,
    segmentName: bestSegment.name,
    distanceToCentroid: parseFloat(distance.toFixed(2)),
    explanation: explanations[bestSegment.id] || `Profile matched to ${bestSegment.name} based on behavioral features. Distance to centroid: ${distance.toFixed(2)}.`,
    recommendations: recs.slice(0, 4),
  };
}

export const kpiData = [
  { label: 'Total Viewers', value: '125,840', icon: 'Users', trend: '+12.4%', trendUp: true },
  { label: 'Active Segments', value: '5', icon: 'Layers', trend: 'Stable', trendUp: true },
  { label: 'Avg. Watch Time', value: '32.5', suffix: 'hrs', icon: 'Clock', trend: '+5.2%', trendUp: true },
  { label: 'Silhouette Score', value: '0.72', icon: 'Sparkles', trend: 'Good', trendUp: true },
];

export const genreDistribution = [
  { genre: 'Action', viewers: 32100, color: '#f97316' },
  { genre: 'Comedy', viewers: 28400, color: '#38bdf8' },
  { genre: 'Drama', viewers: 22100, color: '#a78bfa' },
  { genre: 'Thriller', viewers: 18900, color: '#6366f1' },
  { genre: 'Family', viewers: 14200, color: '#22c55e' },
  { genre: 'Documentary', viewers: 10140, color: '#f0abfc' },
];

export const engagementTrend = [
  { month: 'Jan', value: 62 },
  { month: 'Feb', value: 65 },
  { month: 'Mar', value: 71 },
  { month: 'Apr', value: 68 },
  { month: 'May', value: 75 },
  { month: 'Jun', value: 82 },
  { month: 'Jul', value: 79 },
  { month: 'Aug', value: 88 },
  { month: 'Sep', value: 92 },
];

export const elbowData = [
  { k: 1, inertia: 18500 },
  { k: 2, inertia: 11200 },
  { k: 3, inertia: 6800 },
  { k: 4, inertia: 4200 },
  { k: 5, inertia: 2800 },
  { k: 6, inertia: 2400 },
  { k: 7, inertia: 2150 },
  { k: 8, inertia: 1980 },
];

export const clusterBalance = [
  { segment: 'Casual', count: 39010, color: '#38bdf8' },
  { segment: 'Action', count: 30202, color: '#f97316' },
  { segment: 'Explorers', count: 22651, color: '#a78bfa' },
  { segment: 'Low-Activity', count: 18876, color: '#64748b' },
  { segment: 'Family', count: 15101, color: '#22c55e' },
];

export const pipelineSteps = [
  { label: 'Dataset', icon: 'Database', detail: '125K viewer records' },
  { label: 'Feature Engineering', icon: 'Wrench', detail: 'Watch time, sessions, genres' },
  { label: 'StandardScaler', icon: 'Scaling', detail: 'Normalize features' },
  { label: 'KMeans Clustering', icon: 'CircleDot', detail: 'K=5, unsupervised' },
  { label: 'Saved Model', icon: 'Save', detail: 'kmeans_model.pkl' },
  { label: 'REST API', icon: 'Globe', detail: '/recommend endpoint' },
  { label: 'Evaluation', icon: 'ChartBar', detail: 'Silhouette & inertia' },
];
