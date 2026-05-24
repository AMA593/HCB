import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useData } from './DataProvider';
import { ArrowUpRight } from 'lucide-react';

export default function PortofolioSection() {
  const { data } = useData();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const porto = data?.portofolio;
  
  if (!porto) return null;

  return (
    <section id="portofolio" className="py-24 border-b border-brand-blue/15 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-3 uppercase font-bold tracking-widest leading-none inline-block mb-4">
            [IDENTITAS KAMI]
          </span>
          <h2 className="text-5xl sm:text-6xl font-heading text-brand-dark font-bold leading-none tracking-tight break-words">
            Our <span className="text-brand-red italic font-light">Portofolio</span>
          </h2>
        </motion.div>

        {/* Tentang Kami, Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-white p-8 border border-brand-blue/10 lux-shadow"
          >
            <h3 className="font-mono text-xs font-bold text-brand-blue uppercase tracking-widest mb-4 border-b border-brand-blue/10 pb-2">TENTANG KAMI</h3>
            <p className="font-sans font-light text-gray-600 leading-relaxed text-sm">
              {porto.aboutUs || "Teks tentang kami belum ditambahkan. Perbarui melalui panel admin."}
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-white p-6 border-l-4 border-brand-red border border-y-brand-blue/10 border-r-brand-blue/10 lux-shadow"
            >
              <h3 className="font-mono text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 border-b border-brand-blue/5 pb-2">VISI KAMI</h3>
              <p className="font-sans font-light text-brand-dark italic text-sm">
                "{porto.vision || "Belum ada visi."}"
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-white p-6 border-l-4 border-brand-blue border border-y-brand-blue/10 border-r-brand-blue/10 lux-shadow"
            >
              <h3 className="font-mono text-[10px] font-bold text-brand-blue uppercase tracking-widest mb-2 border-b border-brand-blue/5 pb-2">MISI KAMI</h3>
              <p className="font-sans font-light text-gray-500 text-sm">
                "{porto.mission || "Belum ada misi."}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* Layanan Kami */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="font-heading text-3xl font-bold text-brand-dark mb-4">Layanan Kami</h3>
            <div className="w-16 h-1 bg-brand-red mx-auto"></div>
          </div>
          
          <div className="flex flex-col border-t border-brand-blue/10 bg-brand-white">
            {porto.services && porto.services.map((srv, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={srv.id}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                className="py-8 px-6 sm:px-12 border-b border-brand-blue/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-brand-blue/[0.02] transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
                <div className="md:col-span-1">
                  <span className="font-mono text-sm text-brand-red font-bold block group-hover:scale-110 transition-transform">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="md:col-span-4">
                  <h4 className="font-heading text-lg sm:text-2xl font-bold text-brand-dark transition-all group-hover:text-brand-blue">
                    {srv.title}
                  </h4>
                </div>
                <div className="md:col-span-6">
                  <p className="font-sans font-light text-sm text-gray-500 leading-relaxed group-hover:text-brand-dark transition-colors">
                    {srv.desc}
                  </p>
                </div>
                <div className="md:col-span-1 text-right hidden md:block">
                  <ArrowUpRight size={24} className={`inline text-brand-blue/20 group-hover:text-brand-red transform transition-transform duration-500 ${hoveredService === idx ? 'translate-x-1 -translate-y-1' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Keunggulan Kami */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-heading text-3xl font-bold text-brand-dark mb-4">Keunggulan Kami</h3>
            <div className="w-16 h-1 bg-brand-blue mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {porto.advantages && porto.advantages.map((adv, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                key={adv.id}
                className="bg-brand-white p-8 border border-brand-blue/10 lux-shadow hover:border-brand-red/40 transition-colors group"
              >
                <div className="w-10 h-10 bg-brand-blue/5 text-brand-red flex items-center justify-center font-mono font-bold text-lg mb-6 group-hover:bg-brand-red group-hover:text-white transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="font-heading text-xl font-bold text-brand-dark mb-3">{adv.title}</h4>
                <p className="font-sans font-light text-xs text-gray-500 leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
