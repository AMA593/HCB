/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DataProvider } from './components/DataProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Cursor from './components/Cursor';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Cursor />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              borderRadius: '0',
              background: '#070a13',
              color: '#FFFCFB',
              border: '1px solid #093FB4',
              fontFamily: '"JetBrains Mono", monospace',
              letterSpacing: '0.15em',
              fontSize: '11px',
              textTransform: 'uppercase'
            }
          }} 
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="portofolio" element={<Home />} />
            <Route path="catalog" element={<Home />} />
            <Route path="gallery" element={<Home />} />
            <Route path="faq" element={<Home />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

