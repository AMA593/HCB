import React, { useState, useMemo } from 'react';
import { useData } from '../components/DataProvider';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Search, SlidersHorizontal, ShoppingBag, X, Check, Eye } from 'lucide-react';
import { CatalogItem } from '../types';

export default function Catalog() {
  const { data, loading } = useData();
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  const catalog = useMemo(() => data?.catalog || [], [data]);

  // Compute active product categories
  const categories = useMemo(() => {
    const types = new Set(catalog.map(item => item.type.toUpperCase()));
    return ['ALL', ...Array.from(types)];
  }, [catalog]);

  // Filter & Search
  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      const matchesType = selectedType === 'ALL' || item.type.toUpperCase() === selectedType;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [catalog, selectedType, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Syncing catalog vault...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-white min-h-screen py-16 grid-blueprint relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subheader Column */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-brand-blue/10 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[01 / ARCHIVE CODES]</span>
              <span className="font-mono text-xs text-brand-blue font-bold">({catalog.length} ARCHIVES LOADED)</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
              Collection <span className="text-brand-red italic font-light">Catalog</span>
            </h1>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed border-l-2 border-brand-blue pl-6 py-1">
            Browse our catalog records of active streetwear, rugged uniforms, and corporate apparel designs available for immediate custom fabrication commands.
          </p>
        </div>

        {/* Dynamic Navigation Rails & Searching row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-brand-blue/10 pb-6">
          
          {/* Categories Tab list in Palmer fashion */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto font-mono text-[10px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-2.5 uppercase tracking-widest font-semibold border transition-all ${
                  selectedType === cat 
                    ? 'bg-brand-blue border-brand-blue text-white' 
                    : 'bg-brand-white border-brand-blue/10 text-brand-dark hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Minimal Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-blue/40">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Search specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 font-mono text-xs bg-brand-white border border-brand-blue/10 rounded-none focus:outline-none focus:border-brand-red placeholder:text-gray-400 text-brand-dark"
            />
          </div>

        </div>

        {/* Grid Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 relative z-10">
          {filteredCatalog.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-brand-white border border-brand-blue/10 hover:border-brand-red/30 p-4 transition-all duration-500 group relative flex flex-col justify-between cursor-none lux-shadow"
            >
              {/* Floating ID badge */}
              <div className="flex justify-between items-center mb-6 pb-2 border-b border-brand-blue/5">
                <span className="font-mono text-[10px] text-brand-red font-bold">/{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">{item.type}</span>
              </div>

              {/* Box Image */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#FAF6F0] relative border border-brand-blue/5 mb-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Preview Quick-Click eye cover */}
                <div className="absolute inset-0 bg-brand-blue/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-brand-white border border-brand-blue/20 flex items-center gap-2 font-mono text-[10px] uppercase text-brand-blue tracking-[0.2em] font-medium shadow-xl">
                    <Eye size={12} className="text-brand-red animate-pulse" /> View Blueprints
                  </span>
                </div>
              </div>

              {/* Row description details */}
              <div>
                <h3 className="font-heading text-2xl font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-all">
                  {item.name}
                </h3>
                <p className="font-sans font-light text-gray-400 text-xs line-clamp-2 mt-1 mb-4">
                  {item.description}
                </p>

                <div className="border-t border-brand-blue/5 pt-4 flex justify-between items-center mt-2">
                  <span className="font-mono text-sm font-bold text-brand-blue">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                  </span>
                  <span className="font-mono text-[11px] text-brand-red uppercase tracking-widest font-semibold flex items-center gap-1">
                    Details <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredCatalog.length === 0 && (
          <div className="text-center py-32 border border-brand-blue/10 bg-brand-white/50 lux-shadow">
            <h3 className="font-heading text-xl italic text-gray-500 mb-2">No Matching Patterns Found</h3>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Adjust filters or double check query keywords.</p>
          </div>
        )}

      </div>

      {/* Extreme Slider Panel Drawer (Palmer detail mockup showcase) */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 cursor-none"
            />
            
            {/* Sliding Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-brand-white border-l-2 border-brand-red z-50 shadow-2xl p-6 sm:p-10 overflow-y-auto flex flex-col justify-between cursor-none select-none"
            >
              
              {/* Header inside drawer */}
              <div>
                <div className="flex justify-between items-center border-b border-brand-blue/10 pb-6 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-red" />
                    <span className="font-mono text-[10px] uppercase text-brand-blue tracking-[0.3em] font-bold">SPECIFICATION BLUEPRINT</span>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="p-2 border border-brand-blue/10 text-brand-blue hover:text-brand-red hover:border-brand-red transition-all cursor-none"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Main preview image in drawer */}
                <div className="aspect-[4/3] w-full bg-[#FAF6F0] border border-brand-blue/10 overflow-hidden mb-8">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover filter contrast-125 grayscale hover:grayscale-0 transition-all duration-[1000ms]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Titles */}
                <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark mb-4">
                  {selectedItem.name}
                </h3>
                
                <div className="flex gap-2 mb-6">
                  <span className="font-mono text-[9px] uppercase font-bold tracking-widest bg-brand-blue text-white px-2.5 py-1">
                    {selectedItem.image.includes('t-shirt') || selectedItem.type === 'tshirt' ? 'Combed 24s/30s' : 'Premium Techwear'}
                  </span>
                  <span className="font-mono text-[9px] uppercase font-bold tracking-widest border border-brand-red text-brand-red px-2.5 py-1">
                    MOQ: 12 PCS (1 LUSIN)
                  </span>
                </div>

                <p className="font-sans font-light text-sm text-gray-500 leading-relaxed max-w-md pb-8 border-b border-brand-blue/5">
                  {selectedItem.description}
                  {" "}Rigidly customized blueprint. Fully adaptable details include placement sizing, specific thread colors, inside branding neck tape, label installations, and packaging sets.
                </p>

                {/* Structured Tech Specs Table */}
                <div className="mt-8 space-y-4">
                  <h4 className="font-mono text-xs uppercase text-brand-blue font-bold tracking-widest mb-4">ENGINEERING SPECS</h4>
                  
                  <div className="grid grid-cols-2 py-2 border-b border-brand-blue/5 text-xs font-mono">
                    <span className="text-gray-400">THREAD METHOD</span>
                    <span className="text-brand-dark font-medium text-right uppercase">Double Stitch / Overlock</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b border-brand-blue/5 text-xs font-mono">
                    <span className="text-gray-400">RECOMMENDED INK</span>
                    <span className="text-brand-dark font-medium text-right uppercase">Elastic Plastisol / Discharge</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b border-brand-blue/5 text-xs font-mono">
                    <span className="text-gray-400">COMPOSITION RATE</span>
                    <span className="text-brand-dark font-medium text-right uppercase">100% Cotton Organic Cellulose</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 text-xs font-mono">
                    <span className="text-gray-400">DISPATCH TIMING</span>
                    <span className="text-brand-red font-bold text-right">10-14 WORKING DAYS</span>
                  </div>
                </div>
              </div>

              {/* Action pricing or submit bar at bottom of drawer */}
              <div className="border-t border-brand-blue/10 pt-6 mt-12 bg-brand-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 block uppercase tracking-widest">Base fabrication rate</span>
                    <span className="font-mono text-lg font-bold text-brand-blue">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedItem.price)}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] bg-brand-red/10 text-brand-red font-semibold px-2 py-1 rounded">
                    ESTIMATED PRODUCTION SPOT ACTIVE
                  </span>
                </div>

                {/* Direct Order Prepopulated Whatsapp Link */}
                <a
                  href={`https://wa.me/628123456789?text=Hello%20HCB,%20I'd%20like%20to%20place%20an%20order%20for%20a%20batch%20of%20"%20${selectedItem.name}%20"%20(${selectedItem.price}%20each).%20Please%20verify%20my%20production%20slot.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center block font-mono text-xs tracking-[0.25em] bg-brand-dark text-white hover:bg-brand-red uppercase py-4 transition-all relative overflow-hidden group/drawer-btn"
                >
                  <span className="relative z-10">RESERVE BATCH NOW &rarr;</span>
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
