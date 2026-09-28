import React, { useState, useEffect, useCallback } from 'react';
import { Home, Grid } from 'lucide-react';
import Header from './components/Header';
import Splash from './components/Splash';
import HomePage from './components/HomePage';
import ClubsPage from './components/ClubsPage';
import AuditionPage from './components/AuditionPage';
import clubs from './data/clubs.json';
import { navigate } from './router';

// Hash routes: #/  ·  #/clubs  ·  #/clubs/<club-id>
// Hash routing needs no server rewrites, so the build works on any static host.
function parseRoute() {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (parts[0] === 'clubs' && parts[1]) return { view: 'audition', clubId: parts[1] };
  if (parts[0] === 'clubs') return { view: 'clubs' };
  return { view: 'home' };
}

export default function App() {
  const [route, setRoute] = useState(parseRoute);
  const [showSplash, setShowSplash] = useState(true);
  const hideSplash = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const update = () => {
      const el = document.getElementById('scroll-progress');
      const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (el) el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (showSplash) return <Splash onDone={hideSplash} />;

  const club = route.view === 'audition' ? clubs.find((c) => c.id === route.clubId) : null;
  const view = route.view === 'audition' && !club ? 'clubs' : route.view;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans flex flex-col relative pb-24 md:pb-0">
      <div id="scroll-progress" className="scroll-progress-bar" />
      <Header view={view} />

      <main className="flex-1 flex flex-col">
        <div key={view + (club?.id || '')} className="view-transition-enter flex-1 flex flex-col">
          {view === 'home' && <HomePage clubs={clubs} />}
          {view === 'clubs' && <ClubsPage clubs={clubs} />}
          {view === 'audition' && <AuditionPage club={club} />}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION — Home & Clubs only */}
      <nav
        className="fixed left-1/2 -translate-x-1/2 z-[9000] md:hidden w-[min(92vw,360px)] bottom-[max(14px,env(safe-area-inset-bottom))]"
        aria-label="Primary"
      >
        <div className="grid grid-cols-2 gap-1 p-1.5 rounded-full bg-[#1C1917] border-2 border-[#1C1917] shadow-[0_10px_30px_-10px_rgba(28,25,23,0.55)]">
          {[
            { id: 'home', label: 'Home', icon: Home, path: '/' },
            { id: 'clubs', label: 'Clubs', icon: Grid, path: '/clubs' }
          ].map(({ id, label, icon: Icon, path }) => {
            const active = view === id || (id === 'clubs' && view === 'audition');
            return (
              <button
                key={id}
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center justify-center gap-2 py-3 rounded-full font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active ? 'bg-[#FAF8F5] text-[#1C1917]' : 'text-[#FAF8F5]/70 active:text-white'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2.4} />
                {label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
