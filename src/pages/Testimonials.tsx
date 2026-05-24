import React, { useState } from 'react';
import { useData } from '../components/DataProvider';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Check, User, Briefcase, PlusCircle, PenTool, X } from 'lucide-react';

export default function Testimonials() {
  const { data, loading, updateData } = useData();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const testimonies = data?.testimonies || [];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !text.trim() || !data) return;

    setSubmitting(true);
    try {
      const newItem = {
        id: String(Date.now()),
        name: name.trim(),
        role: role.trim(),
        text: text.trim()
      };

      const updatedData = {
        ...data,
        testimonies: [newItem, ...testimonies]
      };

      await updateData(updatedData);
      
      // Reset
      setName('');
      setRole('');
      setRating(5);
      setText('');
      setShowSubmitModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Syncing appreciations...</span>
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
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-2 uppercase font-bold tracking-widest">[04 / PARTNER RECOGNITIONS]</span>
              <span className="font-mono text-xs text-brand-blue font-bold">({testimonies.length} RECOGNITIONS TOTAL)</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-heading text-brand-dark font-bold leading-none tracking-tight">
              Client <span className="text-brand-red italic font-light">Appreciations</span>
            </h1>
          </div>
          <button 
            onClick={() => setShowSubmitModal(true)}
            className="self-start lg:self-auto font-mono text-xs tracking-widest uppercase py-3 px-6 bg-brand-blue hover:bg-brand-red text-white transition-all flex items-center gap-2 border border-transparent hover:border-brand-red"
          >
            Submit Feedback <PenTool size={12} />
          </button>
        </div>

        {/* Dense Grid of Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {testimonies.map((item, idx) => (
            <div
              key={item.id}
              className="bg-brand-white border border-brand-blue/10 p-8 sm:p-12 hover:border-brand-red/30 transition-all duration-500 relative flex flex-col justify-between lux-shadow"
            >
              {/* Giant quote layout background decor */}
              <div className="absolute top-4 right-6 font-heading text-8xl text-brand-blue/5 font-bold select-none select-none pointer-events-none">
                &ldquo;
              </div>

              <div className="mb-8">
                <div className="flex gap-1 mb-6 border-b border-brand-blue/5 pb-3">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={12} className="fill-brand-red stroke-none" />
                  ))}
                </div>
                
                <p className="font-sans font-light text-base sm:text-lg italic text-brand-dark leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-brand-blue/5 pt-6 flex justify-between items-center bg-[#FAF6F0]/40 -mx-8 sm:-mx-12 px-8 sm:px-12 -mb-8 sm:-mb-12 py-5 mt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-brand-blue/20 bg-brand-red text-white rounded-none flex items-center justify-center font-heading text-lg italic">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-brand-blue uppercase">{item.name}</h4>
                    <span className="font-mono text-[9px] text-gray-400">{item.role}</span>
                  </div>
                </div>
                <div className="bg-brand-blue/10 border border-brand-blue/20 px-2 py-0.5 rounded">
                  <span className="text-[8px] font-mono text-brand-blue font-bold uppercase tracking-wider">QC Verify</span>
                </div>
              </div>

            </div>
          ))}

          {testimonies.length === 0 && (
            <div className="col-span-full py-32 border border-brand-blue/10 bg-brand-white/50 text-center lux-shadow">
              <h3 className="font-heading text-xl italic text-gray-500 mb-2">No Verification Reviews Saved</h3>
              <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Be the first to leave custom recognition parameters.</p>
            </div>
          )}
        </div>

      </div>

      {/* Extreme Slider submission Form (Slide-Drawer in Palmer style!) */}
      <AnimatePresence>
        {showSubmitModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubmitModal(false)}
              className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 cursor-none"
            />
            
            {/* Form slide panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-white border-l-2 border-brand-red z-50 shadow-2xl p-6 sm:p-10 overflow-y-auto flex flex-col justify-between cursor-none select-none"
            >
              
              <form onSubmit={handleSubmitReview} className="flex flex-col h-full justify-between">
                <div>
                  
                  {/* Panel Header */}
                  <div className="flex justify-between items-center border-b border-brand-blue/10 pb-6 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                      <span className="font-mono text-[10px] uppercase text-brand-blue tracking-[0.3em] font-bold">SUBMIT APPRECIATION</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="p-2 border border-brand-blue/10 text-brand-blue hover:text-brand-red hover:border-brand-red transition-all cursor-none"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed mb-8">
                    Your recognition is highly valued, fueling our dedication to absolute tailoring excellence.
                  </p>

                  {/* Form fields */}
                  <div className="space-y-6">
                    <div>
                      <label className="font-mono text-[10px] text-brand-blue font-bold tracking-widest uppercase block mb-2">
                        YOUR NAME / BRAND
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-blue/40">
                          <User size={14} />
                        </span>
                        <input 
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Samuel Adityo"
                          className="w-full font-mono text-xs pl-10 pr-4 py-3 bg-brand-white border border-brand-blue/10 rounded-none focus:outline-none focus:border-brand-red text-brand-dark placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-brand-blue font-bold tracking-widest uppercase block mb-2">
                        YOUR CORE ROLE / COMPANY
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-blue/40">
                          <Briefcase size={14} />
                        </span>
                        <input 
                          type="text"
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. CEO, Overcast Apparel"
                          className="w-full font-mono text-xs pl-10 pr-4 py-3 bg-brand-white border border-brand-blue/10 rounded-none focus:outline-none focus:border-brand-red text-brand-dark placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-brand-blue font-bold tracking-widest uppercase block mb-2">
                        VISUAL STAR VALUE
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="p-1 focus:outline-none cursor-none"
                          >
                            <Star 
                              size={20} 
                              className={`${
                                star <= rating 
                                  ? 'fill-brand-red stroke-brand-red' 
                                  : 'stroke-brand-blue/20'
                              } transition-all`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] text-brand-blue font-bold tracking-widest uppercase block mb-2">
                        YOUR CRITIQUE WORDS
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-4 text-brand-blue/40">
                          <MessageSquare size={14} />
                        </span>
                        <textarea 
                          required
                          rows={4}
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Tell us about the stitching comfort, design accuracy, turnaround, or screenprint strength..."
                          className="w-full font-mono text-xs pl-10 pr-4 py-3 bg-brand-white border border-brand-blue/10 rounded-none focus:outline-none focus:border-brand-red text-brand-dark placeholder:text-gray-300 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Confirm submit line */}
                <div className="border-t border-brand-blue/10 pt-6 mt-12 bg-brand-white">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-center font-mono text-xs tracking-[0.25em] bg-brand-dark hover:bg-brand-red text-white uppercase py-4 transition-all disabled:opacity-50 disabled:cursor-none cursor-none"
                  >
                    {submitting ? 'VALIDATING SECURITY GATE...' : 'TRANSMIT RECOGNITION REPORT &rarr;'}
                  </button>
                </div>
              </form>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
