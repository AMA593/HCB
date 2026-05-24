import React, { useState, useMemo } from 'react';
import { useData } from '../components/DataProvider';
import { motion } from 'motion/react';
import { Calculator, Star, ArrowUpRight, CheckCircle, Percent, Plus, Minus, Info } from 'lucide-react';

export default function Pricelist() {
  const { data, loading } = { ...useData() };
  
  const pricelist = useMemo(() => data?.pricelist || [], [data]);

  // Bulk calculator hooks
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(36);

  const selectedItem = useMemo(() => pricelist[selectedItemIndex] || null, [pricelist, selectedItemIndex]);

  // Compute bulk pricing logic with friendly scaling rewards (Zero-mock real calculator)
  const calculation = useMemo(() => {
    if (!selectedItem) return { rate: 0, total: 0, discountPercent: 0, savings: 0 };
    
    const basePrice = selectedItem.price;
    let discountPercent = 0;
    
    if (quantity >= 200) {
      discountPercent = 15; // 15% Off
    } else if (quantity >= 100) {
      discountPercent = 10; // 10% Off
    } else if (quantity >= 50) {
      discountPercent = 5;  // 5% Off
    }
    
    const rate = Math.round(basePrice * (1 - discountPercent / 100));
    const total = rate * quantity;
    const savings = (basePrice - rate) * quantity;
    
    return { rate, total, discountPercent, savings };
  }, [selectedItem, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Computing rate files...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-white min-h-screen py-16 grid-blueprint relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with Column Borders */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-12 border-b border-brand-blue/10 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[02 / RATES SHEET]</span>
              <span className="font-mono text-xs text-brand-blue font-bold">(ACTIVE COMMISSION MATRIX)</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
              Production <span className="text-brand-red italic font-light">Rates</span>
            </h1>
          </div>
          <p className="font-mono text-xs text-gray-500 max-w-sm leading-relaxed border-l-2 border-brand-blue pl-6 py-1">
            Transparent baseline estimations for bulk manufacturing. Final costs may adapt based on specific textile selections, ink complexities, and custom sewing detailing.
          </p>
        </div>

        {/* Pricing Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Tiers Visual List Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-mono text-xs font-bold text-brand-blue uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
              <CheckCircle size={14} className="text-brand-red" /> ACTIVE BASE PRICE TIERS
            </h3>
            
            {pricelist.map((item, idx) => {
              const isActive = selectedItemIndex === idx;
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItemIndex(idx)}
                  className={`border p-6 transition-all duration-500 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-none group ${
                    isActive 
                      ? 'bg-[#FAF6F0] border-brand-red shadow-lg scale-[1.01]' 
                      : 'bg-brand-white border-brand-blue/10 hover:border-brand-red/40'
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <span className="font-mono text-xs text-brand-red font-bold mt-1">/{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                      <h4 className="font-heading text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                        {item.item}
                      </h4>
                      <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                        Minimum Volume: {item.minOrder} PCS • INCLUDES STANDARD QA
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-brand-blue/5 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="font-mono text-[10px] text-gray-400 block sm:hidden uppercase tracking-widest">Base Rate</span>
                    <span className="font-mono text-base font-bold text-brand-blue">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                    </span>
                  </div>
                </div>
              );
            })}

            {pricelist.length === 0 && (
              <div className="text-center py-16 text-gray-400 font-mono text-xs uppercase border border-dashed border-gray-300">
                No pricing tiers published yet.
              </div>
            )}
          </div>

          {/* Right Column: Stunning Interactive Batch Simulator Block */}
          {selectedItem && (
            <div className="lg:col-span-5 bg-brand-dark text-brand-white p-8 sm:p-10 border-2 border-brand-blue shadow-2xl relative select-none">
              
              <div className="absolute top-0 right-0 bg-brand-red px-3 py-1 font-mono text-[9px] font-bold text-white tracking-widest uppercase">
                ESTIMATOR PANEL
              </div>

              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Calculator className="text-brand-red" size={20} />
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-brand-blue uppercase">DYNAMIC BATCH CALCULATION</h3>
              </div>

              {/* Active Selected Tier Display */}
              <div className="mb-8">
                <span className="font-mono text-[9px] text-gray-500 block uppercase tracking-widest">Selected Tier</span>
                <span className="font-heading text-2xl font-bold italic text-white mt-1 block">
                  {selectedItem.item}
                </span>
                <span className="font-mono text-[10px] text-brand-blue mt-1 block">
                  Base Unit Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedItem.price)}
                </span>
              </div>

              {/* Custom Range Slider & Button controls */}
              <div className="mb-8 p-4 bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400">DESIRED VOL. (PCS)</span>
                  
                  {/* Plus Minus Buttons */}
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setQuantity(Math.max(selectedItem.minOrder, quantity - 6))}
                      className="w-7 h-7 bg-white/10 hover:bg-brand-red rounded flex items-center justify-center text-xs transition-colors cursor-none"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="font-mono text-sm font-bold w-12 text-center text-brand-blue">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(1000, quantity + 6))}
                      className="w-7 h-7 bg-white/10 hover:bg-brand-red rounded flex items-center justify-center text-xs transition-colors cursor-none"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>

                <input 
                  type="range"
                  min={selectedItem.minOrder}
                  max="500"
                  step="6"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-none accent-brand-red"
                />

                <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                  <span>MOQ: {selectedItem.minOrder} Pcs</span>
                  <span>500 Pcs</span>
                </div>
              </div>

              {/* Reward discounts visual clues */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-white/5">
                  <span className="text-gray-400 flex items-center gap-1"><Percent size={12} className="text-brand-red" /> Bulk Reward</span>
                  <span className={`${calculation.discountPercent > 0 ? 'text-brand-red font-bold' : 'text-gray-500'}`}>
                    {calculation.discountPercent > 0 ? `${calculation.discountPercent}% Off Applied` : 'Add more Pcs for discounts'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-white/5">
                  <span className="text-gray-400">UNIT RATE SPECIAL</span>
                  <span className="text-brand-blue font-bold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculation.rate)}
                  </span>
                </div>
                {calculation.savings > 0 && (
                  <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-white/5">
                    <span className="text-brand-red font-bold">SAVINGS SAVED</span>
                    <span className="text-brand-red font-bold">
                      - {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculation.savings)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Quotation result */}
              <div className="border-t-2 border-dashed border-white/10 pt-6 mb-8 text-center bg-black/10 -mx-8 px-8 py-6">
                <span className="font-mono text-[9px] text-gray-400 block uppercase tracking-widest">BULK QUOTATION ESTIMATE</span>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight block mt-2">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculation.total)}
                </span>
                <span className="text-[9px] text-gray-500 font-mono mt-1 block uppercase">Incurring zero design layout setup premiums</span>
              </div>

              {/* WhatsApp direct order with computed data! */}
              <a
                href={`https://wa.me/628123456789?text=Hello%20HCB,%20I'd%20like%20to%20place%20an%20order%20for%20a%2520batch%2520of%20${quantity}%20pcs%2520of%20"${selectedItem.item}"%2520at%2520the%2520volume%2520discount%2520rate%2520of%20${calculation.rate}%20each.%20Total%20estimate%20is%20${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(calculation.total)}.%20Please%20verify%20my%20production%2520spot.`}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center block font-mono text-xs tracking-widest bg-brand-red text-white hover:bg-white hover:text-brand-dark uppercase py-4 transition-all"
              >
                PRODUCE THIS BATCH QUANTITY &rarr;
              </a>

            </div>
          )}

        </div>

        {/* Footnote notes in Palmer visual blueprint list pattern */}
        <div className="mt-20 border-t border-brand-blue/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-3">
              <Info size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono text-xs font-bold text-brand-blue uppercase mb-2">FABRIC UPGRADES</h5>
                <p className="font-sans font-light text-xs text-gray-500 leading-relaxed">
                  Basic quotes are prepared using combed 30s. Premium upgrades for organic bamboo cotton, heavyweight combed 20s, interlock, or double knit fabrics carry auxiliary margins.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Info size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono text-xs font-bold text-brand-blue uppercase mb-2">INK COMPLEXITY</h5>
                <p className="font-sans font-light text-xs text-gray-500 leading-relaxed">
                  Baselines assume up to three screen colors. Multi-color screen placement, large-format belt prints, or specialty neon, metallic, and foam puff inks will scale setup estimates.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Info size={16} className="text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-mono text-xs font-bold text-brand-blue uppercase mb-2">PACKAGING & FREIGHT</h5>
                <p className="font-sans font-light text-xs text-gray-500 leading-relaxed">
                  Every order includes steam-ironed presentation folding, individual high-density eco bags, and carton box batches. Logistics shipping costs are calculated dynamically at dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
