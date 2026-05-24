import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from './DataProvider';

export default function Layout() {
  const { data } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const location = useLocation();

  const contact = data?.contact || {
    whatsapp: '628123456789',
    instagram: '@hcb_convection'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll Spy Logic
      if (location.pathname !== '/admin') {
        const sections = [
          { id: 'faq', path: '/faq' },
          { id: 'gallery', path: '/gallery' },
          { id: 'catalog', path: '/catalog' },
          { id: 'portofolio', path: '/portofolio' }
        ];

        let found = false;
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the section's top is visible or we've scrolled past it but haven't reached the end
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section.path);
              found = true;
              break;
            }
          }
        }
        
        if (!found && window.scrollY < 300) {
          setActiveSection('/');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const links = [
    { name: 'Home', path: '/', label: '00' },
    { name: 'Portofolio', path: '/portofolio', label: '01' },
    { name: 'Katalog', path: '/catalog', label: '02' },
    { name: 'Gallery', path: '/gallery', label: '03' },
    { name: 'FAQ & Kontak', path: '/faq', label: '04' }
  ];

  const getIsActive = (path: string) => {
    if (location.pathname === '/admin') return false;
    // When clicking a link, the scroll might take time, so we might want to temporarily trust location.pathname
    // but the scroll spy will naturally take over.
    return activeSection === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-white text-brand-dark selection:bg-brand-red selection:text-white relative font-sans">
      
      {/* Top Bar Scrolling Announcement - Retro Luxury feel */}
      <div className="bg-brand-red text-brand-white text-[10px] font-mono tracking-[0.3em] py-2.5 px-4 overflow-hidden border-b border-brand-red/10 select-none z-50">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array(6).fill("HISTORY COUNTRY BOY™ • HARGA BERSAHABAT • SABLON DAN KONVEKSI • PREMIUM DAN ELEGAN • KUALITAS TINGGI • ").map((text, i) => (
            <span key={i} className="mr-8 uppercase font-medium">{text}</span>
          ))}
        </div>
      </div>

      {/* Main Structural Sticky Header */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-500 bg-brand-white/90 backdrop-blur-md ${
        scrolled ? 'py-4 border-b border-brand-blue/10 lux-shadow' : 'py-6 border-b border-brand-blue/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center relative">
            
            {/* Logo and Brand block - Column divider style */}
            <Link to="/" className="flex items-center gap-4 group py-1 pr-6 border-r border-brand-blue/10">
              <div className="w-9 h-9 border border-brand-blue/30 flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-700 bg-brand-red">
                <span className="font-heading font-bold text-lg text-brand-white transform group-hover:-rotate-90 transition-transform duration-700 italic">H</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-base font-bold tracking-[0.2em] text-brand-blue leading-none">HCB</span>
                <span className="text-[9px] font-mono tracking-[0.3em] text-brand-red uppercase leading-none mt-1">Stitch.lab</span>
              </div>
            </Link>

            {/* Middle Nav Links - Framer style minimalist layout */}
            <nav className="hidden md:flex flex-grow justify-center gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-mono text-xs tracking-[0.2em] uppercase py-3 px-6 relative group flex items-center gap-2 ${
                    getIsActive(link.path) ? 'text-brand-red font-semibold' : 'text-brand-dark hover:text-brand-blue'
                  }`}
                >
                  <span className="text-[9px] text-brand-blue/40 font-mono scale-75 block">{link.label}.</span>
                  <span>{link.name}</span>
                  
                  {/* Sliding Underlines */}
                  <div className={`absolute bottom-0 left-0 h-[1.5px] bg-brand-red transition-all duration-500 ease-[0.16,1,0.3,1] ${
                    getIsActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Right Widget cell */}
            <div className="hidden lg:flex items-center gap-6 pl-6 border-l border-brand-blue/10 font-mono text-[11px] text-brand-blue/80">
              <a 
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20HCB,%20I'd%20like%20to%20discuss%20a%20custom%20convection%20order.`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2 border border-brand-blue/20 bg-brand-blue hover:bg-brand-red text-white transition-all text-[10px] tracking-widest uppercase font-medium hover:border-brand-red"
              >
                WhatsApp <ArrowUpRight size={10} />
              </a>
            </div>

            {/* Mobile menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <a 
                href={`https://wa.me/${contact.whatsapp}?text=Hello%20HCB...`} 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] font-mono tracking-widest border border-brand-blue/20 px-3 py-1.5 uppercase hover:bg-brand-red hover:text-white hover:border-brand-red"
              >
                Hubungi
              </a>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-brand-dark p-2 hover:text-brand-red transition-all focus:outline-none"
              >
                {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.95 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full bg-brand-white border-b border-brand-blue/10 z-50 flex flex-col p-6 shadow-2xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-mono text-sm tracking-[0.2em] uppercase py-4 border-b border-brand-blue/5 flex items-center justify-between ${
                      getIsActive(link.path) ? 'text-brand-red font-bold pl-2' : 'text-brand-dark hover:text-brand-blue'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[10px] text-brand-blue/40">{link.label}</span>
                  </Link>
                ))}
              </div>
              <div className="pt-6 flex flex-col gap-4">
                <a 
                  href={`https://wa.me/${contact.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full text-center bg-brand-dark text-white font-mono text-xs tracking-widest uppercase py-4 hover:bg-brand-red"
                >
                  Kirim Pertanyaan Langsung
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container - Rounded bottom visual transition */}
      <main className="flex-grow relative z-10 transition-colors duration-500">
        <Outlet />
      </main>

      {/* Footer Area - Luxury Grid Layout reminiscent of Palmer */}
      <footer className="bg-brand-dark text-brand-white pt-24 pb-12 border-t-2 border-brand-red relative overflow-hidden z-0 select-none">
        
        {/* Subtle grid layout lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,252,251,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,252,251,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-20">
          
          {/* Logo & Manifesto column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-1 mb-8">
                <span className="font-heading text-4xl font-bold tracking-[0.15em] text-brand-white">HISTORY</span>
                <span className="font-heading text-4xl font-light tracking-[0.2em] text-brand-red italic">COUNTRY</span>
                <span className="font-heading text-4xl font-bold tracking-[0.15em] text-brand-blue">BOY®</span>
              </div>
              <p className="font-sans font-light text-sm text-gray-400 leading-relaxed max-w-sm">
                Konveksi dirancang dengan usaha keras dan disiplin kreatif tanpa henti. Kaos kustom kelas tinggi, jaket, dan seragam korporat dibuat di bawah protokol standar yang ketat.
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-3 bg-[#0d121f] p-4 border border-white/5 max-w-sm rounded">
               <ShieldAlert size={20} className="text-brand-yellow flex-shrink-0" />
              <div className="text-[10px] font-mono text-gray-400">
                Semua pakaian melewati 3 tahap verifikasi QA yang ketat sebelum paket batch dirilis.
              </div>
            </div>
          </div>

          {/* Social connections column */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-mono text-xs text-brand-red tracking-[0.3em] uppercase mb-8 font-semibold">Hubungan Kami</h4>
            <ul className="space-y-4 font-mono text-[11px] text-gray-400">
              <li>
                <a 
                  href={`https://wa.me/${contact.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 hover:text-brand-white transition group relative overflow-hidden py-1 w-max"
                >
                  <span className="text-[9px] text-brand-blue group-hover:text-brand-red">[01]</span>
                  <span>+{contact.whatsapp}</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
              <li>
                <a 
                  href={`https://instagram.com/${contact.instagram.replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 hover:text-brand-white transition group relative overflow-hidden py-1 w-max"
                >
                  <span className="text-[9px] text-brand-blue group-hover:text-brand-red">[02]</span>
                  <span>{contact.instagram}</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 hover:text-brand-white transition group relative overflow-hidden py-1 w-max"
                >
                  <span className="text-[9px] text-brand-blue group-hover:text-brand-red">[03]</span>
                  <span>History Country Boy</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
            </ul>
          </div>

          {/* Site flow column */}
          <div className="md:col-span-2 md:col-start-11">
            <h4 className="font-mono text-xs text-brand-blue tracking-[0.3em] uppercase mb-8 font-semibold">Direktori Indeks</h4>
            <ul className="space-y-3 font-mono text-[11px] text-gray-400">
              <li><Link to="/portofolio" className="hover:text-brand-red hover:pl-2 transition-all">01. Portofolio</Link></li>
              <li><Link to="/catalog" className="hover:text-brand-red hover:pl-2 transition-all">02. Katalog</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-red hover:pl-2 transition-all">03. Arsip Visual</Link></li>
              <li><Link to="/faq" className="hover:text-brand-red hover:pl-2 transition-all">04. FAQ & Kontak</Link></li>
              <li className="pt-6">
                <Link to="/admin" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-red transition-all text-[10px] tracking-[0.22em] uppercase px-4 py-2 border border-brand-blue/30 hover:border-brand-red/50">
                  PANEL UTAMA SISTEM &rarr;
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-gray-500 font-mono tracking-[0.25em] uppercase text-center md:text-left w-full">
            &copy; {new Date().getFullYear()} HCB CONVECTION INC. BERDIRI SEJAK 2017. SELURUH HAK CIPTA DILINDUNGI.
          </div>
        </div>

      </footer>

    </div>
  );
}
