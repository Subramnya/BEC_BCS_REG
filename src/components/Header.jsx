import React, { useEffect, useRef, useState } from 'react';
import { navigate } from '../router';

export default function Header({ view }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      setScrolled(y > 8);
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
      className={`sticky top-0 z-40 navbar-motion ${hidden ? 'navbar-hidden' : ''} ${
        scrolled ? 'bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#1C1917]/15' : 'bg-[#FAF8F5] border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left group min-w-0">
          <img
            src="/uploads/spectrum-logo.jpeg"
            alt=""
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#1C1917] group-hover:rotate-[-8deg] transition-transform duration-300"
          />
          <div className="min-w-0 leading-none">
            <span className="block font-serif text-[21px] font-semibold tracking-tight text-[#1C1917] truncate">
              Creative <span className="italic text-[#C25E42]">Spectrum</span>
            </span>
            <span className="block font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#78716C] mt-1 truncate">
              BEC · Clubs &amp; Auditions
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border-2 border-[#1C1917] bg-white">
          {links.map((l) => {
            const active = view === l.id || (l.id === 'clubs' && view === 'audition');
            return (
              <button
                key={l.id}
                onClick={() => navigate(l.path)}
                aria-current={active ? 'page' : undefined}
                className={`px-5 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  active ? 'bg-[#1C1917] text-[#FAF8F5]' : 'text-[#1C1917] hover:bg-[#F4EFEA]'
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
