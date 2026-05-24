import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, CatalogItem, GalleryItem, PricelistItem, TestimonyItem } from '../types';
import toast from 'react-hot-toast';

interface DataContextType {
  data: AppData | null;
  loading: boolean;
  updateData: (newData: AppData) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load data from server');
        setLoading(false);
      });
  }, []);

  const updateData = async (newData: AppData) => {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!res.ok) throw new Error('Failed to update');
      setData(newData);
      toast.success('Data saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save data');
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
