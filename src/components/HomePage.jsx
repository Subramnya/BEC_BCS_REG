import React from 'react';
import { ArrowRight, ArrowUpRight, Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_URL } from '../data/links';
import { ClubBanner, Eyebrow, Footer } from './ui';

const ease = [0.22, 1, 0.36, 1];

export default function HomePage({ clubs = [] }) {
  const half = Math.ceil(clubs.length / 2);
  const rowA = clubs.slice(0, half);
  const rowB = clubs.slice(half);

  return (
    <div className="flex-1 flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden paper-bg">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-8 pb-14 md:pt-16 md:pb-24 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="md:col-span-6 space-y-6 relative z-10"
          >
            <Eyebrow>Fresher Auditions · Open now</Eyebrow>

            <h1 className="font-serif font-semibold text-[#1C1917] uppercase leading-[0.95] tracking-[-0.01em] text-[clamp(3rem,13vw,5.75rem)]">
              <span className="text-[#C25E42]">Many</span> Worlds.
              <br />
              One <span className="italic font-normal normal-case marker-underline">Campus.</span>
            </h1>

            <p className="font-serif italic text-[1.35rem] sm:text-2xl leading-snug text-[#57534E] max-w-md">
              Ideas. Art. Code. Stories. Beats.
              <br />
              Find your people. Find your place.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                onClick={() => navigate('/clubs')}
                className="brut-btn group inline-flex items-center gap-3 rounded-full bg-[#C25E42] text-white pl-8 pr-3 py-3 font-display font-extrabold uppercase tracking-[0.12em] text-[15px]"
              >
                Get Started
                <span className="grid place-items-center w-9 h-9 rounded-full bg-[#1C1917] group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <span className="font-hand text-2xl text-[#C25E42] -rotate-3">Different minds. Different stories.</span>
            </div>
          </motion.div>

          {/* Front image, framed */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
            className="md:col-span-6 relative"
          >
            <div className="relative rounded-[22px] border-2 border-[#1C1917] bg-white p-2.5 shadow-[8px_8px_0_#1C1917]">
              <div className="relative overflow-hidden rounded-[14px] aspect-[4/3.1]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                  alt="Students collaborating on campus"
                  className="absolute inset-0 w-full h-full object-cover ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/55 via-transparent to-transparent" />
                <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between text-white">
                  <span className="font-serif italic text-xl sm:text-2xl leading-none">Your campus, your crew.</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">BEC</span>
                </div>
              </div>
            </div>

            <motion.div
              drag
              dragSnapToOrigin
              whileTap={{ scale: 1.08 }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: -10 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 220, damping: 14 }}
              className="sticker absolute -top-6 -left-3 sm:-left-6 bg-[#C28B38] text-[#1C1917]"
            >
              <span>
                Auditions
                <br />
                open ✦
              </span>
            </motion.div>
            <motion.div
              drag
              dragSnapToOrigin
              whileTap={{ scale: 1.08 }}
              initial={{ scale: 0, rotate: 30 }}
              animate={{ scale: 1, rotate: 8 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 220, damping: 14 }}
              className="sticker sticker-sm absolute -bottom-6 -right-2 sm:-right-5 bg-[#5D7A68] text-white"
            >
              <span>
                <b className="block text-2xl leading-none font-serif">{clubs.length}</b>
                clubs
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BANNER REEL */}
      <section className="bg-[#1C1917] text-[#FAF8F5] py-12 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow className="!text-[#E08A6F] [&>span]:!bg-[#E08A6F]">The line-up</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold mt-3 leading-none">
              {clubs.length} clubs. <span className="italic font-normal text-[#E08A6F]">Pick yours.</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/clubs')}
            className="hidden sm:inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] border-b-2 border-[#E08A6F] pb-1 hover:text-[#E08A6F] transition-colors"
          >
            All clubs <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 reel">
          {[rowA, rowB].map((row, r) => (
            <div key={r} className="marquee">
              <div className={`marquee-track gap-4 pr-4 ${r ? 'marquee-reverse' : ''}`}>
                {[...row, ...row, ...row].map((club, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/clubs/${club.id}`)}
                    className="reel-card shrink-0 w-[300px] sm:w-[420px] rounded-xl overflow-hidden ring-1 ring-white/10"
                    aria-label={`${club.name} audition details`}
                    tabIndex={i < row.length ? 0 : -1}
                  >
                    <ClubBanner club={club} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:hidden mt-8">
          <button
            onClick={() => navigate('/clubs')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FAF8F5] py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em]"
          >
            Explore all clubs <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* OFFICIAL CHANNELS */}
      <section className="paper-bg py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 space-y-4">
            <Eyebrow>Official channels</Eyebrow>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold leading-[1.02] text-[#1C1917]">
              Never miss an <span className="italic font-normal text-[#C25E42]">audition call.</span>
            </h2>
            <p className="text-[15px] text-[#78716C] leading-relaxed max-w-sm">
              Announcements, audition alerts and club highlights, straight from the source.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-5">
            <ChannelCard
              href={INSTAGRAM_URL}
              icon={<Instagram className="w-6 h-6" />}
              iconClass="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]"
              tint="bg-[#FFF1F6]"
              label="Instagram"
              labelClass="text-[#B03A6E]"
              title={INSTAGRAM_HANDLE}
              sub="Stories, reels & event highlights"
            />
            <ChannelCard
              href={WHATSAPP_URL}
              icon={<MessageCircle className="w-6 h-6" />}
              iconClass="bg-gradient-to-br from-[#25D366] to-[#128C7E]"
              tint="bg-[#EEF9F1]"
              label="WhatsApp channel"
              labelClass="text-[#1F7A45]"
              title="Official broadcast"
              sub="Instant audition & registration alerts"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ChannelCard({ href, icon, iconClass, tint, label, labelClass, title, sub }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`brut-card brut-card-hover group rounded-2xl p-5 flex flex-col gap-8 ${tint}`}
    >
      <div className="flex items-start justify-between">
        <span className={`grid place-items-center w-12 h-12 rounded-xl border-2 border-[#1C1917] text-white ${iconClass} group-hover:-rotate-6 transition-transform duration-300`}>
          {icon}
        </span>
        <span className="grid place-items-center w-9 h-9 rounded-full border-2 border-[#1C1917] bg-white group-hover:bg-[#1C1917] group-hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
      <div>
        <p className={`font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] ${labelClass}`}>{label}</p>
        <p className="font-display font-extrabold text-[17px] text-[#1C1917] mt-1 [overflow-wrap:anywhere]">{title}</p>
        <p className="text-[13px] text-[#78716C] mt-1">{sub}</p>
      </div>
    </a>
  );
}
