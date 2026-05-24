import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomeHero from '../components/HomeHero';
import PortofolioSection from '../components/PortofolioSection';
import CatalogSection from '../components/CatalogSection';
import GallerySection from '../components/GallerySection';
import FaqContactSection from '../components/FaqContactSection';
import { useData } from '../components/DataProvider';

export default function Home() {
  const { loading } = useData();
  const location = useLocation();

  useEffect(() => {
    let targetId = '';
    if (location.pathname === '/catalog') targetId = 'catalog';
    else if (location.pathname === '/portofolio') targetId = 'portofolio';
    else if (location.pathname === '/gallery') targetId = 'gallery';
    else if (location.pathname === '/faq') targetId = 'faq';
    else if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Menghubungkan Node Kontrol...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-brand-white grid-blueprint relative">
      <HomeHero />
      <PortofolioSection />
      <CatalogSection />
      <GallerySection />
      <FaqContactSection />
    </div>
  );
}
