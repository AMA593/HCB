import React, { useState } from 'react';
import { useData } from '../components/DataProvider';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';

export default function Gallery() {
  const { data, loading } = useData();
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const gallery = data?.gallery || [];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex === null) return;
    setPhotoIndex(photoIndex === 0 ? gallery.length - 1 : photoIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoIndex === null) return;
    setPhotoIndex(photoIndex === gallery.length - 1 ? 0 : photoIndex + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Syncing visual archives...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-white min-h-screen py-16 grid-blueprint relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Alignment */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-brand-blue/10 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[03 / VISUAL RECORDS]</span>
              <span className="font-mono text-xs text-brand-blue font-bold">({gallery.length} ARCHIVES ONLINE)</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
              Visual <span className="text-brand-red italic font-light">Archive</span>
            </h1>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed border-l-2 border-brand-blue pl-6 py-1">
            Visual reports documenting precise physical outcomes from our printing screen lines, embroidery grids, and customized uniform orders.
          </p>
        </div>

        {/* Dense Masonry Grid Layout reminiscent of high fashion look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setPhotoIndex(idx)}
              className="bg-brand-white border border-brand-blue/10 hover:border-brand-red/30 p-4 transition-all duration-[800ms] group relative flex flex-col justify-between cursor-none lux-shadow"
            >
              {/* Header inside border */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-brand-blue/5">
                <span className="font-mono text-[10px] text-brand-red">/{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gray-400">ARCHIVE DOCUMENT</span>
              </div>

              {/* Main Photo block */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF6F0] relative border border-brand-blue/5 mb-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro hover details */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-brand-white uppercase flex items-center gap-1">
                    <Eye size={12} className="text-brand-red animate-pulse" /> Zoom Archive
                  </span>
                  <span className="font-mono text-[8px] bg-white/20 backdrop-blur text-white px-2 py-0.5 rounded">Active Code</span>
                </div>
              </div>

              {/* Description summary */}
              <div>
                <h4 className="font-heading text-xl font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-all">
                  {item.title}
                </h4>
                <div className="mt-2 pt-4 border-t border-brand-blue/5 flex justify-between items-center text-[10px] font-mono text-gray-400 uppercase">
                  <span>ISO 9001:2015 PASSED</span>
                  <span className="text-brand-blue font-bold">VERIFIED</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Archive State */}
        {gallery.length === 0 && (
          <div className="text-center py-32 border border-brand-blue/10 bg-brand-white/50 lux-shadow">
            <h3 className="font-heading text-xl italic text-gray-500 mb-2 font-bold">No Visual Archival Records Available</h3>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Connect using system panel to synchronize raw layouts.</p>
          </div>
        )}

      </div>

      {/* Stunning Full Screen Lightbox with Arrow Swapping */}
      <AnimatePresence>
        {photoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPhotoIndex(null)}
            className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 cursor-none select-none"
          >
            {/* Top Row details inside Lightbox */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4 w-full">
              <div className="flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#9dacc3]">
                  ARCHIVE CLASSIFIED ({photoIndex + 1}/{gallery.length})
                </span>
              </div>
              <button 
                onClick={() => setPhotoIndex(null)}
                className="p-3 border border-white/10 text-white/50 hover:text-brand-red hover:border-brand-red transition-colors cursor-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Slide block with side navigation arrows */}
            <div className="flex-grow flex items-center justify-between gap-4 w-full relative">
              
              {/* Left arrow button */}
              <button 
                onClick={handlePrev}
                className="p-3 sm:p-4 border border-white/10 bg-[#0d121f]/50 text-white hover:text-brand-red hover:border-brand-red hover:bg-[#ED3500]/5 transition-all cursor-none"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Centered Image Card */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="max-w-4xl max-h-[60vh] sm:max-h-[70vh] relative border-2 border-brand-blue bg-black/40 overflow-hidden shadow-2xl flex items-center justify-center p-2"
              >
                <motion.img 
                  key={photoIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  src={gallery[photoIndex]?.image} 
                  alt="Aesthetic view" 
                  className="max-w-full max-h-[55vh] sm:max-h-[65vh] object-contain filter contrast-125 brightness-95"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right arrow button */}
              <button 
                onClick={handleNext}
                className="p-3 sm:p-4 border border-white/10 bg-[#0d121f]/50 text-white hover:text-brand-red hover:border-brand-red hover:bg-[#ED3500]/5 transition-all cursor-none"
              >
                <ArrowRight size={20} />
              </button>

            </div>

            {/* Bottom Row specs details inside Lightbox */}
            <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
              <span className="font-heading text-xl sm:text-2xl font-bold italic text-brand-white text-center sm:text-left">
                {gallery[photoIndex]?.title}
              </span>
              <div className="flex items-center gap-6 text-[10px] font-mono text-[#9dacc3]">
                <span>FABRIC: ORGANIC BRUSHED CARDED</span>
                <span>STATE: COMPLETE DELIVERY</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
