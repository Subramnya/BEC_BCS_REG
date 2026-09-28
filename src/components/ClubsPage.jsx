import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { Footer } from './HomePage';

export function ClubBanner({ club, className = '' }) {
  // Banners come in mixed aspect ratios (square posters and wide covers),
  // so show the whole image over a blurred copy of itself instead of cropping.
  return (
    <div className={`relative w-full overflow-hidden bg-[#1C1917] ${className}`}>
      <img src={club.banner} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60" />
      <img src={club.banner} alt={`${club.name} banner`} className="relative w-full h-full object-contain" loading="lazy" />
    </div>
  );
}

export default function ClubsPage({ clubs = [] }) {
  return (
    <div className="flex-1 flex flex-col club-doodle-bg">
      <div className="bg-[#FAF8F5] border-b-2 border-[#1C1917]">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-8 space-y-3">
          <span className="inline-block font-mono text-[11px] font-bold tracking-[0.2em] uppercase bg-[#C25E42] text-white px-3 py-1.5 rotate-1 border-2 border-[#1C1917]">
            The Directory
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C1917] uppercase leading-none">
            Pick your <span className="italic font-normal text-[#C25E42]">tribe.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] max-w-xl">
            {clubs.length} clubs, one campus. Open a club to read its audition details and apply.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {clubs.map((club, index) => (
            <motion.article
              key={club.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
              className="brut-card brut-card-hover bg-white overflow-hidden flex flex-col"
            >
              {/* Banner */}
              <div className="relative border-b-2 border-[#1C1917]">
                <ClubBanner club={club} className="aspect-[16/9]" />
                <span className="absolute top-3 left-3 font-mono text-xs font-bold bg-[#FAF8F5] border-2 border-[#1C1917] px-2 py-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-3 right-3 font-mono text-[11px] font-bold uppercase tracking-wider bg-[#FAF0ED] text-[#C25E42] border-2 border-[#1C1917] px-2.5 py-0.5">
                  {club.category}
                </span>
              </div>

              {/* Logo (left) + short description (right) */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col gap-5">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 p-1.5 bg-white border-2 border-[#1C1917] shadow-[4px_4px_0_#1C1917] -rotate-2 hover:rotate-2 transition-transform">
                    <img
                      src={club.logo}
                      alt={`${club.name} logo`}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#1C1917] leading-tight">
                      {club.name}
                    </h2>
                    <p className="text-sm text-[#57534E] leading-relaxed mt-1.5 line-clamp-4">
                      {club.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/clubs/${club.id}`)}
                  className="brut-btn brut-btn-lg mt-auto w-full py-4 bg-[#C25E42] text-white font-display text-base font-extrabold tracking-wide uppercase flex items-center justify-center gap-2 group"
                >
                  <span>View Audition Details</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
