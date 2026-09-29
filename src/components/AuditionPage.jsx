import React from 'react';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { AUDITION_FORM_URL } from '../data/links';
import { ClubBanner, Eyebrow, Footer } from './ui';

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

function ComingSoon() {
  return (
    <div className="rounded-[20px] border-2 border-dashed border-[#1C1917] bg-[#FCF7ED] px-6 py-7 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-[#1C1917] text-[#FAF8F5] px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
        <Clock className="w-3.5 h-3.5" />
        Coming soon
      </span>
      <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-4 leading-tight">
        The registration form is on its way.
      </p>
      <p className="text-[14px] text-[#78716C] mt-2 max-w-sm mx-auto leading-relaxed">
        Follow our Instagram and WhatsApp channels to know the moment it opens.
      </p>
    </div>
  );
}

export default function AuditionPage({ club }) {
  const { rules = [], formComingSoon } = club.audition;

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
            <img
              src={club.logo}
              alt={`${club.name} logo`}
              className="shrink-0 w-[72px] h-[72px] sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#1C1917] shadow-[3px_3px_0_#1C1917] bg-white -rotate-3"
            />
            <div className="min-w-0 flex-1">
              <Eyebrow>Audition details</Eyebrow>
              <h1 className="font-serif font-semibold text-[#1C1917] leading-[0.95] mt-2 text-[clamp(2rem,8.5vw,3.25rem)]">
                {club.name}
              </h1>
            </div>
            {!formComingSoon && <ApplyButton size="sm" className="hidden sm:inline-flex self-center" />}
          </div>

          <p className="mt-6 text-[15px] text-[#57534E] leading-relaxed">{club.description}</p>

          {/* Rules — at most six */}
          <section className="mt-8 rounded-[20px] bg-white border-2 border-[#1C1917] overflow-hidden">
            <header className="px-5 sm:px-7 py-4 border-b-2 border-[#1C1917] bg-[#F4EFEA]">
              <h2 className="font-display font-extrabold text-[15px] uppercase tracking-[0.12em] text-[#1C1917]">
                How the audition works
              </h2>
            </header>
            <ol className="divide-y divide-dashed divide-[#1C1917]/20">
              {rules.map((rule, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.15 + i * 0.06 }}
                  className="flex gap-4 px-5 sm:px-7 py-4"
                >
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-[#1C1917] text-white font-mono text-[12px] font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#44403C] pt-1">{rule}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <div className="mt-10 text-center space-y-4">
            {formComingSoon ? (
              <ComingSoon />
            ) : (
              <>
                <p className="font-hand text-[26px] text-[#C25E42] -rotate-1">Read it all? Your stage is waiting.</p>
                <ApplyButton />
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#A8A29E]">Opens the audition form</p>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
