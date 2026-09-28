import React from 'react';
import { ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';
import { navigate } from '../router';
import { INSTAGRAM_URL, WHATSAPP_URL } from '../data/links';

// Club banner strip. Every banner is a wide ~6:1 card; when a club has no
// banner image, a typographic card in the same style stands in for it.
export function ClubBanner({ club, className = '' }) {
  if (club.banner) {
    return (
      <div className={`overflow-hidden bg-[#0f0d0c] ${className}`}>
        <img
          src={club.banner}
          alt={`${club.name} banner`}
          className="block w-full h-auto aspect-[6.2/1] object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
  const f = club.bannerFallback || { number: '', title: club.name.toUpperCase(), subtitle: club.category, motto: '' };
  return (
    <div className={`relative overflow-hidden aspect-[6.2/1] fallback-banner ${className}`}>
      <div className="absolute inset-0 flex items-center gap-[3.5%] px-[3.5%]">
        <div className="self-stretch flex flex-col items-center py-[3%] text-[#E9DCCB]/80 font-serif text-[clamp(9px,2.4vw,18px)]">
          {f.number}
          <span className="flex-1 w-px bg-[#E9DCCB]/40 mt-1" />
        </div>
        <div className="leading-tight">
          <p className="font-serif font-semibold text-[#F4EFEA] text-[clamp(14px,4.4vw,34px)] tracking-wide">{f.title}</p>
          <p className="font-serif text-[#E9DCCB] text-[clamp(10px,2.6vw,20px)]">{f.subtitle}</p>
          <p className="font-mono uppercase text-[#E9DCCB]/80 tracking-[0.25em] text-[clamp(6px,1.5vw,11px)] mt-[2%]">{f.motto}</p>
        </div>
      </div>
    </div>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#C25E42] ${className}`}>
      <span className="w-6 h-[2px] bg-[#C25E42]" />
      {children}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-[#1C1917] text-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-32 md:pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/uploads/spectrum-logo.jpeg" alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FAF8F5]/80" />
              <span className="font-serif text-2xl font-semibold">
                Creative <span className="italic text-[#E08A6F]">Spectrum</span>
              </span>
            </div>
            <p className="text-sm text-[#FAF8F5]/60 max-w-xs leading-relaxed">
              The home of every creative and technical club at Basaveshwar Engineering College.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/clubs')} className="footer-pill">Clubs</button>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="footer-pill">
              <Instagram className="w-4 h-4" /> Instagram <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-pill">
              <MessageCircle className="w-4 h-4" /> WhatsApp <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#FAF8F5]/10 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FAF8F5]/40">
          BEC Creative Spectrum · All rights reserved
        </div>
      </div>
    </footer>
  );
}
