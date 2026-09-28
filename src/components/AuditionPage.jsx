import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronDown, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { AUDITION_FORM_URL } from '../data/links';
import MarkdownRenderer from './MarkdownRenderer';
import { ClubBanner } from './ClubsPage';
import { Footer } from './HomePage';

const LONG_DETAILS = 900; // characters; longer details start collapsed

export default function AuditionPage({ club }) {
  const { audition } = club;
  const isLong = audition.process.length > LONG_DETAILS;
  const [expanded, setExpanded] = useState(!isLong);

  const dates = [
    ['Registrations Open', audition.registrations_open],
    ['Live Auditions', audition.live_auditions],
    ['Results Announced', audition.results_announced]
  ].filter(([, value]) => value);

  return (
    <div className="flex-1 flex flex-col club-doodle-bg">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-6 pb-16 space-y-6">
        <button
          onClick={() => navigate('/clubs')}
          className="brut-btn inline-flex items-center gap-2 px-4 py-2 bg-white font-mono text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          All Clubs
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="brut-card bg-white overflow-hidden"
        >
          <div className="border-b-2 border-[#1C1917]">
            <ClubBanner club={club} className="aspect-[21/9]" />
          </div>

          <div className="p-5 sm:p-8 space-y-7">
            {/* Identity */}
            <div className="flex items-center gap-4">
              <div className="shrink-0 p-1 bg-white border-2 border-[#1C1917] shadow-[3px_3px_0_#1C1917] -rotate-2">
                <img src={club.logo} alt={`${club.name} logo`} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C25E42]">
                  Audition Details
                </span>
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#1C1917] leading-tight uppercase">
                  {club.name}
                </h1>
              </div>
            </div>

            {/* Key dates */}
            {dates.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {dates.map(([label, value]) => (
                  <div key={label} className="border-2 border-[#1C1917] bg-[#FAF8F5] px-4 py-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#78716C] flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-[#C25E42]" />
                      {label}
                    </p>
                    <p className="font-display font-extrabold text-[#1C1917] mt-1">{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Audition process */}
            <div className="border-2 border-[#1C1917]">
              <div className="bg-[#1C1917] text-[#FAF8F5] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest">
                ▸ Audition Process
              </div>
              <div className="relative">
                <div className={`px-4 sm:px-6 py-5 overflow-hidden transition-[max-height] duration-500 ${expanded ? 'max-h-[400rem]' : 'max-h-[26rem]'}`}>
                  <MarkdownRenderer content={audition.process} className="!text-sm" />
                </div>
                {!expanded && (
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                )}
              </div>
              {isLong && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="w-full border-t-2 border-[#1C1917] py-3 font-mono text-xs font-bold uppercase tracking-widest bg-[#FAF0ED] text-[#C25E42] hover:bg-[#F3DDD5] flex items-center justify-center gap-2"
                >
                  {expanded ? 'Show less' : 'Read full details'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-1">
              <p className="font-hand text-2xl text-[#C25E42] -rotate-1 text-center">Read it all? Then it's your turn.</p>
              <a
                href={AUDITION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="brut-btn brut-btn-lg w-full py-5 bg-[#C25E42] text-white font-display text-lg sm:text-xl font-extrabold tracking-wide uppercase flex items-center justify-center gap-2 group"
              >
                <span>I'm Ready to Give Audition</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <p className="text-center font-mono text-[11px] text-[#78716C]">Opens the audition registration form</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
