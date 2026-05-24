import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from './DataProvider';
import { Eye, X } from 'lucide-react';

export default function GallerySection() {
  const { data } = useData();
  const gallery = data?.gallery || [];
  
  const [filter, setFilter] = useState<'konveksi' | 'sablon'>('konveksi');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = gallery.filter(g => g.category === filter);

  return (
    <>
      <section id="gallery" className="py-24 border-b border-brand-blue/15 px-4 sm:px-6 lg:px-8 bg-brand-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-brand-blue/10 gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[04 / GALERI KARYA]</span>
                <span className="font-mono text-xs text-brand-blue font-bold">({gallery.length} FOTO ARSIP)</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
                Galeri <span className="text-brand-red italic font-light">Karya</span>
              </h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setFilter('konveksi')} 
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border ${filter === 'konveksi' ? 'bg-brand-red text-white border-brand-red' : 'border-brand-blue/20 hover:border-brand-red'}`}
              >Konveksi</button>
              <button 
                onClick={() => setFilter('sablon')} 
                className={`px-4 py-2 text-xs font-mono uppercase tracking-widest border ${filter === 'sablon' ? 'bg-brand-red text-white border-brand-red' : 'border-brand-blue/20 hover:border-brand-red'}`}
              >Sablon</button>
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
            <AnimatePresence>
              {filteredGallery.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  onClick={() => setLightboxIndex(gallery.findIndex(g => g.id === item.id))}
                  className="bg-brand-white border border-brand-blue/10 hover:border-brand-red/30 p-2 transition-all duration-[600ms] group relative flex flex-col justify-between cursor-none lux-shadow aspect-square"
                >
                  <div className="w-full h-full overflow-hidden bg-[#FAF6F0] relative border border-brand-blue/5">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover filter transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-brand-red font-bold uppercase">{item.category || 'Konveksi'}</span>
                      <span className="font-sans text-xs text-white truncate">{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-20 border border-brand-blue/10 bg-[#FAF6F0] lux-shadow mt-4">
              <h3 className="font-heading text-xl italic text-gray-500 mb-2 font-bold">Kategori ini belum memiliki arsip rupa.</h3>
            </div>
          )}

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-none"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute top-6 right-6 text-white bg-white/10 p-2 border border-white/20 hover:bg-brand-red transition-colors z-[110]">
              <X size={24} />
            </div>
            
            <img 
              src={gallery[lightboxIndex].image} 
              alt={gallery[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain border border-white/10 lux-shadow"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none">
              <span className="bg-brand-white/10 backdrop-blur border border-white/20 px-6 py-3 font-mono text-white text-xs uppercase tracking-[0.2em]">
                {gallery[lightboxIndex].title} • {gallery[lightboxIndex].category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
