import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, CatalogItem, GalleryItem, PricelistItem, TestimonyItem } from '../types';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface DataContextType {
  data: AppData | null;
  loading: boolean;
  updateData: (newData: AppData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  const saveToFirebase = async (newData: AppData) => {
    const { catalog, pricelist, gallery, testimonies, portofolio, faqs, contact } = newData;
    
    // We split into multiple documents to avoid large document sizes (e.g. Gallery base64)
    const promises = [
      setDoc(doc(db, 'appData', 'catalog'), { items: catalog || [] }),
      setDoc(doc(db, 'appData', 'pricelist'), { items: pricelist || [] }),
      setDoc(doc(db, 'appData', 'gallery'), { items: gallery || [] }),
      setDoc(doc(db, 'appData', 'testimonies'), { items: testimonies || [] }),
      setDoc(doc(db, 'appData', 'portofolio'), portofolio || {}),
      setDoc(doc(db, 'appData', 'faqs'), { items: faqs || [] }),
      setDoc(doc(db, 'appData', 'contact'), contact || {})
    ];
    await Promise.all(promises);
  };

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const sections = ['catalog', 'pricelist', 'gallery', 'testimonies', 'portofolio', 'faqs', 'contact'];
        let mergedData: any = {};
        let isDbEmpty = true;

        for (const section of sections) {
          const docSnap = await getDoc(doc(db, 'appData', section));
          if (docSnap.exists()) {
            isDbEmpty = false;
            if (section === 'portofolio' || section === 'contact') {
              mergedData[section] = docSnap.data();
            } else {
              mergedData[section] = docSnap.data().items || [];
            }
          } else {
            if (section === 'portofolio' || section === 'contact') {
              mergedData[section] = {};
            } else {
              mergedData[section] = [];
            }
          }
        }

        if (isDbEmpty && active) {
          // Fallback to Express backend if Firebase is empty (first migration)
          try {
            const res = await fetch('/api/data');
            if (res.ok) {
              const defaultData = await res.json();
              mergedData = { ...mergedData, ...defaultData };
              await saveToFirebase(mergedData); // seed it
            }
          } catch(e) { }
        }

        if (active) {
          setData(mergedData as AppData);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.error(err);
          toast.error('Failed to load data. Ensure Firestore is configured.');
          setLoading(false);
        }
      }
    };
    
    loadData();

    return () => { active = false };
  }, []);

  const updateData = async (newData: AppData) => {
    try {
      await saveToFirebase(newData);
      setData(newData);
      toast.success('Data saved permanently to Cloud!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save data. Permission denied or disconnected.');
      throw err;
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
