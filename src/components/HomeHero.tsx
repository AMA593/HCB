import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useData } from './DataProvider';

export default function HomeHero() {
  return (
    <>
      <section className="relative z-10 pt-16 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-blue/15">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-brand-blue font-bold">BERDIRI SEJAK 2017 DI DEMAK. JAWA TENGAH</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-brand-blue/60 leading-relaxed max-w-xs border-l-2 border-brand-red pl-4">
                9+ tahun™ dalam bentuk digital kustom, pekerjaan jahitan presisi, dan disiplin kreatif tanpa henti.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <h1 className="font-heading text-5xl sm:text-7xl md:text-[5.5rem] leading-[1] md:leading-[0.9] font-bold tracking-tight text-brand-dark word-break break-words">
                HISTORY<br className="hidden md:block" />
                <span className="font-light italic text-brand-red block md:inline mt-2 md:mt-0">COUNTRYBOY©</span>
              </h1>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative aspect-[4/3] w-full lux-border-all overflow-hidden bg-brand-dark group"
            >
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-color z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1524275539700-cf5113cdc074?q=80&w=800&auto=format&fit=crop" 
                alt="Konveksi / Sewing Lab" 
                className="w-full h-full object-cover filter contrast-125 brightness-95 transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute top-4 left-4 z-20 bg-brand-white/95 backdrop-blur-sm px-4 py-2 border border-brand-blue/10 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="font-mono text-[10px] uppercase text-brand-blue tracking-[0.2em]">LAB KONVEKSI</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="relative aspect-[4/3] w-full lux-border-all overflow-hidden bg-brand-dark group"
            >
              <div className="absolute inset-0 bg-brand-blue/10 mix-blend-color z-10 pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop" 
                alt="Sablon / Screen Printing" 
                className="w-full h-full object-cover filter contrast-125 brightness-95 transform scale-100 group-hover:scale-105 transition-transform duration-[2000ms]"
              />
              <div className="absolute top-4 left-4 z-20 bg-brand-white/95 backdrop-blur-sm px-4 py-2 border border-brand-blue/10 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="font-mono text-[10px] uppercase text-brand-blue tracking-[0.2em]">STUDIO SABLON</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Endless Scroll Marquee */}
      <section className="bg-brand-blue text-brand-white py-6 border-b border-brand-blue/15 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-16 font-mono font-bold uppercase tracking-[0.3em] text-xs sm:text-sm items-center">
          {Array(8).fill("AFFORDABLE PRICES • SCREEN PRINTING AND CONVECTION • PREMIUM AND ELEGANT • HIGH QUALITY").map((text, i) => (
            <React.Fragment key={i}>
              <span className="text-brand-white">{text}</span>
              <Star size={10} className="fill-brand-red stroke-none" />
              <span className="text-stroke-red font-light italic">HISTORY COUNTRYBOY©</span>
              <Star size={10} className="fill-brand-red stroke-none" />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
