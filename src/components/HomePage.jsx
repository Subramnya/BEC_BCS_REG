import React from 'react';
import { ArrowRight, ArrowUpRight, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { navigate } from '../router';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_URL } from '../data/links';

export default function HomePage({ clubs = [] }) {
  const ticker = clubs.map((c) => c.name);

  return (
    <div className="flex-1 flex flex-col">
      {/* HERO — same campus photo & headline as before */}
      <section className="relative min-h-[82vh] flex items-center pt-10 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[#EAD8D2] border-b-2 border-[#1C1917]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80"
            alt="Campus students collaborating"
            className="w-full h-full object-cover opacity-75 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent" />
          <div className="absolute inset-0 grain-overlay" />
        </div>

        {/* Floating brutalist stickers */}
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          initial={{ opacity: 0, rotate: 12, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 8, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          className="sticker hidden sm:flex absolute top-12 right-[8%] z-10 bg-[#C28B38] text-[#1C1917]"
          title="Drag me"
        >
          AUDITIONS<br />OPEN ✦
        </motion.div>
        <motion.div
          drag
          dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
          initial={{ opacity: 0, rotate: -14, scale: 0.6 }}
          animate={{ opacity: 1, rotate: -7, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring' }}
          className="sticker hidden lg:flex absolute bottom-24 right-[18%] z-10 bg-[#5D7A68] text-white"
          title="Drag me"
        >
          {clubs.length} CLUBS
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl space-y-7"
          >
            <span className="inline-block font-mono text-[11px] font-bold tracking-[0.2em] uppercase bg-[#1C1917] text-[#FAF8F5] px-3 py-1.5 -rotate-1">
              ● Fresher Auditions 2026
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1C1917] leading-[1.02] uppercase">
              <span className="text-[#C25E42]">Many</span> Worlds.<br />
              One <span className="italic font-normal marker-underline">Campus.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-[#57534E] max-w-lg font-serif italic leading-relaxed"
            >
              Ideas. Art. Code. Stories. Beats.<br />
              Find your people. Find your place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-2"
            >
              <button
                onClick={() => navigate('/clubs')}
                className="brut-btn brut-btn-lg px-9 py-4 bg-[#C25E42] text-white font-display text-base font-extrabold tracking-wider uppercase inline-flex items-center gap-3 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <p className="font-hand text-2xl sm:text-3xl text-[#C25E42] -rotate-2 pt-2">
              "Different minds. Different stories."
            </p>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TICKER — club names */}
      <div className="marquee bg-[#1C1917] text-[#FAF8F5] border-b-2 border-[#1C1917] py-3">
        <div className="marquee-track font-display font-extrabold uppercase text-lg sm:text-xl tracking-wide">
          {[...ticker, ...ticker].map((name, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 whitespace-nowrap">
              {name}
              <span className="text-[#C25E42]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* OFFICIAL CHANNELS — Instagram & WhatsApp */}
      <section className="relative py-16 sm:py-20 club-doodle-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="brut-card bg-white p-7 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-center lg:text-left space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-[#1C1917] bg-[#FAF0ED] text-[#C25E42] font-mono text-[11px] font-bold tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>OFFICIAL CHANNELS</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight leading-tight">
                  Join Our Community Channels
                </h2>
                <p className="text-sm sm:text-base text-[#78716C] leading-relaxed">
                  Stay connected for real-time announcements, audition notifications, and club highlights.
                </p>
              </div>

              <div className="grid gap-5 w-full lg:w-auto grid-cols-1 sm:grid-cols-2 lg:min-w-[580px]">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brut-card brut-card-hover group relative overflow-hidden p-5 bg-gradient-to-br from-[#FAF5F7] to-[#FFE8F1] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 border-2 border-[#1C1917] rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white group-hover:rotate-6 transition-transform">
                      <Instagram className="w-7 h-7" />
                    </div>
                    <div className="w-9 h-9 border-2 border-[#1C1917] rounded-full bg-white flex items-center justify-center group-hover:bg-[#E1306C] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#A8557A]">Instagram</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
                    </div>
                    <p className="font-display font-extrabold text-[15px] sm:text-base text-[#1C1917] group-hover:text-[#E1306C] transition-colors [overflow-wrap:anywhere]">
                      {INSTAGRAM_HANDLE}
                    </p>
                    <p className="text-xs text-[#78716C] mt-1">Stories, reels, & event highlights</p>
                  </div>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brut-card brut-card-hover group relative overflow-hidden p-5 bg-gradient-to-br from-[#F2FAF5] to-[#DDF5E5] flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 border-2 border-[#1C1917] rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white group-hover:-rotate-6 transition-transform">
                      <MessageCircle className="w-7 h-7" />
                    </div>
                    <div className="w-9 h-9 border-2 border-[#1C1917] rounded-full bg-white flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2D8653]">WhatsApp Channel</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    </div>
                    <p className="font-display font-extrabold text-base sm:text-lg text-[#1C1917] group-hover:text-[#1A9E4B] transition-colors">
                      Official WhatsApp Broadcast
                    </p>
                    <p className="text-xs text-[#78716C] mt-1">Instant audition & registration alerts</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-[#1C1917] bg-[#FAF8F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/uploads/spectrum-logo.jpeg" alt="" className="w-6 h-6 rounded object-cover border border-[#1C1917]" />
          <span className="font-display font-extrabold text-sm text-[#1C1917]">BEC Creative Spectrum</span>
        </div>
        <span className="font-mono text-[11px] text-[#78716C]">© 2026 All Rights Reserved</span>
      </div>
    </footer>
  );
}
