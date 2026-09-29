import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { ClubBanner, Eyebrow, Footer } from './ui';

export default function ClubsPage({ clubs = [] }) {
  return (
    <div className="flex-1 flex flex-col paper-bg">
      <section className="max-w-6xl mx-auto w-full px-5 sm:px-8 pt-8 md:pt-14 pb-8">
        <Eyebrow>The directory · {clubs.length} clubs</Eyebrow>
        <h1 className="font-serif font-semibold text-[#1C1917] leading-[0.95] mt-4 text-[clamp(2.6rem,11vw,4.5rem)]">
          Pick your <span className="italic font-normal text-[#C25E42]">tribe.</span>
        </h1>
        <p className="text-[15px] text-[#78716C] mt-4 max-w-md leading-relaxed">
          Open any club to read how its audition works, then apply in one tap.
        </p>
      </section>

      <section className="max-w-3xl mx-auto w-full px-3 sm:px-8 pb-20">
        <div className="grid grid-cols-1 gap-7 lg:gap-9">
          {clubs.map((club, index) => (
            <motion.article
              key={club.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
              className="brut-card brut-card-hover group rounded-[20px] bg-white overflow-hidden flex flex-col cursor-pointer"
              onClick={() => navigate(`/clubs/${club.id}`)}
            >
              <ClubBanner club={club} large className="border-b-2 border-[#1C1917]" />

              <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-4 sm:gap-5">
                  <img
                    src={club.logo}
                    alt={`${club.name} logo`}
                    className="shrink-0 w-[76px] h-[76px] sm:w-[88px] sm:h-[88px] rounded-2xl object-cover border-2 border-[#1C1917] shadow-[3px_3px_0_#1C1917] bg-white group-hover:-rotate-3 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C25E42]">
                      {club.category}
                    </span>
                    <p className="font-serif text-[21px] sm:text-2xl leading-snug text-[#1C1917] mt-1">{club.short}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/clubs/${club.id}`);
                  }}
                  className="brut-btn mt-auto w-full rounded-full py-3.5 bg-[#1C1917] text-white group-hover:bg-[#C25E42] font-display font-extrabold uppercase tracking-[0.1em] text-[14px] flex items-center justify-center gap-2"
                >
                  View Audition Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
