import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useData } from './DataProvider';
import { Search, ArrowUpRight, Eye } from 'lucide-react';
import { CatalogItem } from '../types';

export default function CatalogSection() {
  const { data } = useData();
  const catalog = data?.catalog || [];
  
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const types = new Set(catalog.map(item => item.type.toUpperCase()));
    return ['ALL', ...Array.from(types)];
  }, [catalog]);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) => {
      const matchesType = selectedType === 'ALL' || item.type.toUpperCase() === selectedType;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [catalog, selectedType, searchQuery]);

  return (
    <section id="catalog" className="py-24 border-b border-brand-blue/15 px-4 sm:px-6 lg:px-8 bg-brand-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-brand-blue/10 gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[02 / PRICELIST & KATALOG]</span>
              <span className="font-mono text-xs text-brand-blue font-bold">({catalog.length} PRODUK AKTIF)</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
              Katalog <span className="text-brand-red italic font-light">Eksklusif</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed border-l-2 border-brand-blue pl-6 py-1">
            Lihat daftar harga dan katalog produk konveksi kami. Pilih kategori untuk menyaring daftar.
          </p>
        </motion.div>

        {/* Dynamic Navigation Rails & Searching row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-brand-blue/10 pb-6">
          
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto font-mono text-[10px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-2.5 uppercase tracking-widest font-semibold border transition-all cursor-none ${
                  selectedType === cat 
                    ? 'bg-brand-blue border-brand-blue text-white' 
                    : 'bg-brand-white border-brand-blue/10 text-brand-dark hover:border-brand-red hover:text-brand-red'
                }`}
              >
                {cat === 'ALL' ? 'SEMUA KATEGORI' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-blue/40">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 font-mono text-xs bg-[#FAF6F0] border border-brand-blue/10 rounded-none focus:outline-none focus:border-brand-red placeholder:text-gray-400 text-brand-dark"
            />
          </div>

        </div>

        {/* Grid Catalog */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {filteredCatalog.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="bg-brand-white border border-brand-blue/10 hover:border-brand-red/30 p-4 transition-all duration-300 group relative flex flex-col justify-between cursor-none lux-shadow"
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-brand-blue/5">
                <span className="font-mono text-[10px] text-brand-red font-bold">/{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[9px] text-brand-blue uppercase tracking-widest bg-brand-blue/5 px-2 py-0.5">{item.type}</span>
              </div>

              <div className="aspect-square w-full overflow-hidden bg-[#FAF6F0] relative border border-brand-blue/5 mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter transition-all duration-700 group-hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold tracking-tight text-brand-dark group-hover:text-brand-red transition-all">
                  {item.name}
                </h3>
                <p className="font-sans font-light text-gray-500 text-[11px] line-clamp-2 mt-1 mb-3">
                  {item.description}
                </p>

                <div className="border-t border-brand-blue/5 pt-3 flex justify-between items-center mt-auto">
                  <span className="font-mono text-sm font-bold text-brand-blue">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                  </span>
                  <a href={`https://wa.me/${data?.contact?.whatsapp || '628123456789'}?text=Halo%20saya%20tertarik%20dengan%20${item.name}`} target="_blank" rel="noreferrer" className="text-[10px] uppercase font-mono font-bold text-white bg-brand-red hover:bg-brand-dark px-3 py-1.5 transition-colors">
                    PESAN
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {filteredCatalog.length === 0 && (
          <div className="text-center py-20 border border-brand-blue/10 bg-[#FAF6F0] lux-shadow">
            <h3 className="font-heading text-xl italic text-gray-500 mb-2">Produk Tidak Ditemukan</h3>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Gunakan kata kunci pencarian yang lain.</p>
          </div>
        )}

      </div>
    </section>
  );
}
