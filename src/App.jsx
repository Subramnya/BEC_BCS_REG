import React, { useState, useEffect } from 'react';
import { Home, Grid } from 'lucide-react';
import Header from './components/Header';
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

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#FAF8F5] z-[10000] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={() => setShowSplash(false)}
          onError={() => setShowSplash(false)}
          className="w-full max-w-4xl max-h-screen object-contain transform-gpu"
        >
          <source src="/intro_new.mp4" type="video/mp4" />
        </video>
        <button
          onClick={() => setShowSplash(false)}
          className="brut-btn absolute top-6 right-6 px-4 py-2 bg-white text-xs font-bold tracking-wider uppercase"
        >
          Skip Intro →
        </button>
      </div>
    );
  }

  const club = route.view === 'audition' ? clubs.find((c) => c.id === route.clubId) : null;
  const view = route.view === 'audition' && !club ? 'clubs' : route.view;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans flex flex-col relative pb-20 md:pb-0">
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
      <nav className="fixed bottom-0 left-0 right-0 z-[9000] md:hidden bg-[#FAF8F5] border-t-2 border-[#1C1917] grid grid-cols-2">
        {[
          { id: 'home', label: 'HOME', icon: Home, path: '/' },
          { id: 'clubs', label: 'CLUBS', icon: Grid, path: '/clubs' }
        ].map(({ id, label, icon: Icon, path }) => {
          const active = view === id || (id === 'clubs' && view === 'audition');
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-1 py-3 font-mono text-[11px] font-bold tracking-widest transition-colors ${
                active ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#1C1917]'
              } ${id === 'home' ? 'border-r-2 border-[#1C1917]' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
