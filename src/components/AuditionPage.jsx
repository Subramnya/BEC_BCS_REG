import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { AUDITION_FORM_URL } from '../data/links';
import MarkdownRenderer from './MarkdownRenderer';
import { ClubBanner, Eyebrow, Footer } from './ui';

const LONG_DETAILS = 900; // characters; longer details start collapsed
const ease = [0.22, 1, 0.36, 1];

function ApplyButton({ size = 'lg', className = '' }) {
  const big = size === 'lg';
  return (
    <a
      href={AUDITION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`brut-btn group rounded-full bg-[#C25E42] text-white font-display font-extrabold uppercase inline-flex items-center justify-center gap-2 ${
        big ? 'w-full py-4 sm:py-5 text-[16px] sm:text-lg tracking-[0.08em]' : 'px-5 py-2.5 text-[12px] tracking-[0.12em]'
      } ${className}`}
    >
      {big ? "I'm Ready to Give Audition" : 'Apply'}
      <ArrowUpRight className={`${big ? 'w-5 h-5' : 'w-4 h-4'} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
    </a>
  );
}

export default function AuditionPage({ club }) {
  const { process } = club.audition;
  const isLong = process.length > LONG_DETAILS;
  const [expanded, setExpanded] = useState(!isLong);

  return (
    <div className="flex-1 flex flex-col paper-bg">
      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 pt-5 md:pt-10 pb-20">
        <button
          onClick={() => navigate('/clubs')}
          className="group inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#57534E] hover:text-[#1C1917] py-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All clubs
        </button>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mt-3"
        >
          <ClubBanner club={club} className="rounded-2xl border-2 border-[#1C1917] shadow-[5px_5px_0_#1C1917]" />

          {/* Identity */}
          <div className="mt-8 flex items-center gap-4 sm:gap-5">
            <div className="shrink-0 rounded-2xl p-1 bg-white border-2 border-[#1C1917] shadow-[3px_3px_0_#1C1917] -rotate-3">
              <img src={club.logo} alt={`${club.name} logo`} className="w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-xl object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <Eyebrow>Audition details</Eyebrow>
              <h1 className="font-serif font-semibold text-[#1C1917] leading-[0.95] mt-2 text-[clamp(2rem,8.5vw,3.25rem)]">
                {club.name}
              </h1>
            </div>
            <ApplyButton size="sm" className="hidden sm:inline-flex self-center" />
          </div>

          {/* Process */}
          <section className="mt-8 rounded-[20px] bg-white border-2 border-[#1C1917] overflow-hidden">
            <header className="flex items-center justify-between px-5 sm:px-7 py-4 border-b-2 border-[#1C1917] bg-[#F4EFEA]">
              <h2 className="font-display font-extrabold text-[15px] uppercase tracking-[0.12em] text-[#1C1917]">
                How the audition works
              </h2>
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-[#78716C]">Read first</span>
            </header>

            <div className="relative">
              <div
                className={`px-5 sm:px-7 py-6 overflow-hidden transition-[max-height] duration-700 ease-out ${
                  expanded ? 'max-h-[400rem]' : 'max-h-[24rem]'
                }`}
              >
                <MarkdownRenderer content={process} />
              </div>
              {!expanded && (
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
              )}
            </div>

            {isLong && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="w-full border-t-2 border-[#1C1917] py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#1C1917] hover:bg-[#F4EFEA] flex items-center justify-center gap-2 transition-colors"
              >
                {expanded ? 'Show less' : 'Read full details'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </section>

          {/* CTA */}
          <div className="mt-10 text-center space-y-4">
            <p className="font-hand text-[26px] text-[#C25E42] -rotate-1">Read it all? Your stage is waiting.</p>
            <ApplyButton />
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#A8A29E]">Opens the audition form</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
