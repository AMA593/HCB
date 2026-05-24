import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from './DataProvider';
import { Plus, Minus, MessageSquare, Briefcase, MapPin, Instagram, Mail } from 'lucide-react';

export default function FaqContactSection() {
  const { data } = useData();
  const faqs = data?.faqs || [];
  const contact = data?.contact || {
    whatsapp: '628123456789',
    email: 'hello@hcb.com',
    address: 'Jl. Contoh Alamat No.123, Bandung, Jawa Barat',
    instagram: '@hcb_works'
  };

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 border-b border-brand-blue/15 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* FAQ Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <span className="font-mono text-[9px] bg-brand-red text-white py-1 px-3 uppercase font-bold tracking-widest leading-none inline-block mb-3">
                [INFORMASI UMUM]
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-dark mb-4 break-words">
                Frequently Clarified <span className="italic font-light text-brand-red">Resolutions</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isActive = activeFaq === idx;
                return (
                  <div key={faq.id || idx} className="bg-brand-white border border-brand-blue/10 lux-shadow overflow-hidden">
                    <button 
                      onClick={() => setActiveFaq(isActive ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left cursor-none group"
                    >
                      <h4 className="font-heading text-lg font-bold text-brand-dark group-hover:text-brand-red transition-colors pr-8">
                        {faq.question}
                      </h4>
                      <span className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border transition-all ${isActive ? 'bg-brand-red border-brand-red text-white' : 'border-brand-blue/20 text-brand-blue'}`}>
                        {isActive ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 font-sans font-light text-sm text-gray-500 leading-relaxed border-t border-brand-blue/5">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              
              {faqs.length === 0 && (
                <div className="p-6 border border-brand-blue/10 bg-brand-white text-center italic text-gray-400 text-sm">
                  Belum ada Frequently Asked Questions.
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="mb-12">
              <span className="font-mono text-[9px] bg-brand-blue text-white py-1 px-3 uppercase font-bold tracking-widest leading-none inline-block mb-3">
                [JALUR KOMUNIKASI]
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-dark mb-4 break-words">
                Hubungi <span className="italic font-light text-brand-blue">Kami</span>
              </h2>
            </div>

            <div className="bg-brand-white p-8 sm:p-12 border-2 border-brand-blue flex-grow lux-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] z-10">
                Pusat Kontak
              </div>
              
              <div className="space-y-8 relative z-10 mt-6">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-brand-blue/5 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/10">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Pusat Produksi</h5>
                    <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">{contact.address}</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-brand-blue/5 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/10">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Penawaran & B2B</h5>
                    <a href={`mailto:${contact.email}`} className="font-sans font-medium text-brand-red hover:underline text-sm">{contact.email}</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-brand-blue/5 text-brand-blue flex items-center justify-center shrink-0 border border-brand-blue/10">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Sosial Media</h5>
                    <a href={`https://instagram.com/${contact.instagram?.replace('@', '')}`} target="_blank" rel="noreferrer" className="font-sans font-medium text-brand-red hover:underline text-sm">{contact.instagram}</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-brand-blue/10 relative z-10">
                <a 
                  href={`https://wa.me/${contact.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full bg-brand-dark hover:bg-brand-red transition-all cursor-none text-white py-5 flex items-center justify-center gap-3"
                >
                  <MessageSquare size={20} />
                  <span className="font-mono text-sm uppercase tracking-widest font-bold">Konsultasi via WhatsApp</span>
                </a>
              </div>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
