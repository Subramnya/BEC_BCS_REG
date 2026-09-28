import React, { useEffect, useRef, useState } from 'react';
import { navigate } from '../router';

export default function Header({ view }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'clubs', label: 'Clubs', path: '/clubs' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-[#FAF8F5] border-b-2 border-[#1C1917] navbar-motion ${hidden ? 'navbar-hidden' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 text-left group">
          <img
            src="/uploads/spectrum-logo.jpeg"
            alt="Creative Spectrum"
            className="w-9 h-9 rounded-md object-cover border-2 border-[#1C1917] group-hover:-rotate-6 transition-transform"
          />
          <div>
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-[#1C1917] block leading-none">
              BEC CREATIVE SPECTRUM
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-[#78716C] block mt-1">
              Basaveshwar Engineering College
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-3">
          {links.map((l) => {
            const active = view === l.id || (l.id === 'clubs' && view === 'audition');
            return (
              <button
                key={l.id}
                onClick={() => navigate(l.path)}
                className={`brut-btn px-5 py-2 font-mono text-xs font-bold uppercase tracking-widest ${
                  active ? 'bg-[#C25E42] text-white' : 'bg-white text-[#1C1917]'
                }`}
              >
                {l.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
