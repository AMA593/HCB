import React, { useState } from 'react';
import { useData } from '../components/DataProvider';
import { resizeImage } from '../utils/image';
import { Trash2, Image as ImageIcon, Lock, Plus, FileText, LayoutList, DollarSign, LogOut, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Admin() {
  const { data, loading, updateData } = useData();
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'catalog' | 'portofolio' | 'contact' | 'faqs'>('catalog');

  // Form states with structured types
  const [catForm, setCatForm] = useState({ name: '', type: 'tshirt', price: '', desc: '', image: '' });
  const [galleryCategory, setGalleryCategory] = useState<'konveksi' | 'sablon'>('konveksi');
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  
  // Portofolio states
  const [portoAbout, setPortoAbout] = useState('');
  const [portoVision, setPortoVision] = useState('');
  const [portoMission, setPortoMission] = useState('');
  const [serviceForm, setServiceForm] = useState({ title: '', desc: '' });
  const [advantageForm, setAdvantageForm] = useState({ title: '', desc: '' });
  
  // Faq states
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });

  // Contact States
  const [contactForm, setContactForm] = useState({ whatsapp: '', email: '', address: '', instagram: '' });

  // Synchronize on load
  React.useEffect(() => {
    if(data?.portofolio) {
      setPortoAbout(data.portofolio.aboutUs || '');
      setPortoVision(data.portofolio.vision || '');
      setPortoMission(data.portofolio.mission || '');
    }
    if(data?.contact) {
      setContactForm({
        whatsapp: data.contact.whatsapp || '',
        email: data.contact.email || '',
        address: data.contact.address || '',
        instagram: data.contact.instagram || ''
      });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-white flex flex-col justify-center items-center py-32 grid-blueprint">
        <div className="w-12 h-12 border-2 border-brand-red border-t-transparent rounded-full animate-rotate" />
        <span className="font-mono text-xs tracking-[0.3em] uppercase text-brand-blue mt-6 animate-pulse">Menghubungkan Node Kontrol...</span>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
      toast.success('Akses Sistem Diberikan');
    } else {
      toast.error('Gerbang Kredensial Tidak Valid');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-[90vh] bg-brand-white grid-blueprint flex items-center justify-center p-4">
        <form 
          onSubmit={handleLogin} 
          className="bg-brand-white p-8 sm:p-12 max-w-md w-full border-2 border-brand-red lux-shadow relative overflow-hidden select-none"
        >
          {/* Accent blueprint decors */}
          <div className="absolute top-0 right-0 bg-brand-red text-white py-1 px-3 font-mono text-[8px] tracking-widest uppercase font-bold">
            AKSES AMAN
          </div>

          <div className="flex justify-center mb-6 text-brand-blue">
            <Lock size={36} strokeWidth={1.5} className="animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-center text-brand-dark mb-4">
            System <span className="italic font-light text-brand-red">Portal</span>
          </h2>
          <p className="font-mono text-[9px] text-gray-400 text-center uppercase tracking-widest mb-8 leading-relaxed">
            Diperlukan verifikasi kredensial administratif yang berwenang.
          </p>

          <div className="mb-8">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-brand-blue/10 py-3.5 px-4 font-mono text-xs tracking-[0.3em] text-center focus:border-brand-red focus:outline-none transition-colors bg-brand-white text-brand-dark placeholder:text-gray-300"
              placeholder="KATA SANDI"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-dark text-white font-mono text-xs tracking-[0.25em] uppercase py-4 hover:bg-brand-red transition-all cursor-none"
          >
            VERIFIKASI KUNCI &rarr;
          </button>
        </form>
      </div>
    );
  }

  const removeItemFromSubarray = async (type: keyof typeof data, subType: 'services' | 'advantages', id: string) => {
    if (!data || !data[type]) return;
    try {
      const parent = data[type] as any;
      const updatedArray = parent[subType].filter((i: any) => i.id !== id);
      await updateData({ ...data, [type]: { ...parent, [subType]: updatedArray } });
      toast.success('Item berhasil dihapus');
    } catch(err) {
      toast.error('Gagal memperbarui database');
    }
  };

  const savePortofolioText = async () => {
    if (!data) return;
    const porto = data.portofolio || { aboutUs: '', vision: '', mission: '', services: [], advantages: [] };
    await updateData({
      ...data, 
      portofolio: { ...porto, aboutUs: portoAbout, vision: portoVision, mission: portoMission }
    });
    toast.success('Data portofolio teks disimpan');
  };

  const submitService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !serviceForm.title || !serviceForm.desc) return;
    const porto = data.portofolio || { aboutUs: '', vision: '', mission: '', services: [], advantages: [] };
    await updateData({
      ...data,
      portofolio: {
        ...porto,
        services: [...(porto.services || []), { id: Date.now().toString(), title: serviceForm.title, desc: serviceForm.desc }]
      }
    });
    setServiceForm({ title: '', desc: '' });
  };

  const submitAdvantage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !advantageForm.title || !advantageForm.desc) return;
    const porto = data.portofolio || { aboutUs: '', vision: '', mission: '', services: [], advantages: [] };
    await updateData({
      ...data,
      portofolio: {
        ...porto,
        advantages: [...(porto.advantages || []), { id: Date.now().toString(), title: advantageForm.title, desc: advantageForm.desc }]
      }
    });
    setAdvantageForm({ title: '', desc: '' });
  };

  const submitFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !faqForm.question || !faqForm.answer) return;
    await updateData({
      ...data,
      faqs: [...(data.faqs || []), { id: Date.now().toString(), question: faqForm.question, answer: faqForm.answer }]
    });
    setFaqForm({ question: '', answer: '' });
  };

  const saveContact = async () => {
    if (!data) return;
    await updateData({ ...data, contact: contactForm });
    toast.success('Kontak berhasil disimpan');
  };

  // Gallery Handlers
  const handleGalleryFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setGalleryFile(e.target.files[0]);
    }
  };

  const addGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryFile || !data) return;
    try {
      toast.loading('Mengodekan dan mengubah ukuran arsip...', { id: 'upload' });
      const base64 = await resizeImage(galleryFile, 1000);
      const newItem = {
        id: Date.now().toString(),
        title: galleryTitle || galleryFile.name.split('.')[0] || 'Image',
        image: base64,
        category: galleryCategory
      };
      await updateData({ ...data, gallery: [...(data.gallery || []), newItem as any] });
      toast.success('Rekam visual berhasil dikirimkan', { id: 'upload' });
      setGalleryTitle('');
      setGalleryFile(null);
    } catch (err) {
      toast.error('Pengodean file gagal', { id: 'upload' });
    }
  };

  const removeItem = async (type: keyof typeof data, id: string) => {
    if (!data) return;
    try {
      const updatedArray = (data[type] as any[]).filter(i => i.id !== id);
      await updateData({ ...data, [type]: updatedArray });
      toast.success('Item berhasil dihapus');
    } catch (err) {
      toast.error('Gagal memperbarui database');
    }
  };

  // Catalog Handlers
  const handleCatImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
       const base64 = await resizeImage(e.target.files[0], 800);
       setCatForm(f => ({ ...f, image: base64 }));
       toast.success('Gambar sampul siap untuk publikasi');
    } catch(e) {
      toast.error('Gagal mengompres file gambar');
    }
  };
  
  const submitCat = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!data || !catForm.name || !catForm.price || !catForm.image) {
      return toast.error("Lengkapi bidang wajib (Nama, Harga, Gambar sampul)");
    }
    await updateData({ ...data, catalog: [...data.catalog, {
      id: Date.now().toString(),
      name: catForm.name,
      type: catForm.type || 'tshirt',
      price: parseInt(catForm.price),
      description: catForm.desc,
      image: catForm.image
    }]});
    setCatForm({ name: '', type: 'tshirt', price: '', desc: '', image: '' });
  };

  return (
    <div className="w-full bg-brand-white min-h-screen py-16 grid-blueprint relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header layout row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 pb-12 border-b border-brand-blue/10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 bg-brand-red rounded-full animate-pulse" />
              <span className="font-mono text-xs text-brand-red font-bold uppercase tracking-widest">KONSOL PERINTAH SISTEM</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-bold text-brand-dark leading-none tracking-tight">
              Control <span className="italic font-light text-brand-blue">Dashboard</span>
            </h1>
          </div>
          <button 
            onClick={() => setAuthenticated(false)} 
            className="font-mono text-xs tracking-widest uppercase border border-brand-blue/25 sm:px-6 py-3 px-4 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all cursor-none flex items-center gap-2"
          >
            Sesi Keluar <LogOut size={12} />
          </button>
        </div>

        {/* Dashboard grid panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Sidebar Tabs control */}
          <div className="lg:col-span-3 flex flex-col gap-1.5 font-mono text-[10px] w-full">
            {[
              { id: 'catalog', label: '01 / MATRIKS KATALOG', icon: LayoutList },
              { id: 'gallery', label: '02 / ARSIP GAMBAR', icon: ImageIcon },
              { id: 'portofolio', label: '03 / PORTOFOLIO', icon: FileText },
              { id: 'faqs', label: '04 / FAQ', icon: LayoutList },
              { id: 'contact', label: '05 / KONTAK', icon: DollarSign }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-5 py-4 transition-all uppercase tracking-widest font-semibold text-left border cursor-none ${
                    isActive 
                      ? 'bg-brand-blue text-white border-brand-blue shadow-md font-bold' 
                      : 'bg-brand-white border-brand-blue/10 text-brand-dark hover:border-brand-red hover:text-brand-red'
                  }`}
                >
                  <tab.icon size={14} className={isActive ? 'text-brand-red' : 'text-brand-blue/40'} />
                  {tab.label}
                </button>
              );
            })}

            <div className="mt-8 border border-brand-blue/10 p-5 bg-[#FAF6F0] flex items-start gap-3 rounded-none">
              <ShieldAlert className="text-brand-red flex-shrink-0" size={18} />
              <div className="text-[9px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Semua perubahan yang dibuat pada terminal ini langsung berdampak fisik pada tampilan pelanggan langsung.
              </div>
            </div>
          </div>

          {/* Core Content Form and list tables */}
          <div className="lg:col-span-9 bg-brand-white border border-brand-blue/10 p-6 sm:p-10 shadow-2xl relative">
            
            {/* 1. CATALOG TAB */}
            {activeTab === 'catalog' && (
              <div className="space-y-12">
                
                {/* Append Form */}
                <form onSubmit={submitCat} className="bg-[#FAF6F0] p-6 sm:p-8 border border-brand-blue/5">
                  <div className="flex items-center gap-2.5 mb-6 border-b border-brand-blue/5 pb-4">
                    <Plus className="text-brand-red" size={18} />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue">TAMBAH REKAMAN PAKAIAN KATALOG</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Nama Pakaian</label>
                      <input 
                        required 
                        value={catForm.name} 
                        onChange={e => setCatForm({...catForm, name: e.target.value})}
                        placeholder="misal: Kaos Raglan Heavyweight HCB" 
                        className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:border-brand-red focus:outline-none placeholder:text-gray-300 text-brand-dark" 
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Kategori Pakaian</label>
                      <select
                        value={catForm.type}
                        onChange={e => setCatForm({...catForm, type: e.target.value})}
                        className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:border-brand-red focus:outline-none text-brand-dark"
                      >
                        <option value="tshirt">tshirt / Kaos</option>
                        <option value="jacket">jacket / Jaket / Pakaian Luar</option>
                        <option value="polo">polo / Polo Toko</option>
                        <option value="uniform">uniform / Seragam Korporat</option>
                        <option value="other">other / Kustom Lainnya</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Harga Satuan Dasar (IDR)</label>
                      <input 
                        required 
                        type="number" 
                        value={catForm.price} 
                        onChange={e => setCatForm({...catForm, price: e.target.value})}
                        placeholder="misal: 150000" 
                        className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:border-brand-red focus:outline-none placeholder:text-gray-300 text-brand-dark" 
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Lampirkan Foto Referensi</label>
                      <div className="relative h-[46px]">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleCatImage} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-none z-10" 
                        />
                        <div className="border border-dashed border-brand-blue/20 p-3 text-center text-xs text-brand-blue hover:text-brand-red hover:border-brand-red/40 bg-brand-white flex items-center justify-center gap-2 h-full uppercase tracking-widest font-mono text-[10px]">
                          <ImageIcon size={14} className="text-brand-red" /> 
                          {catForm.image ? 'Sampul Siap ✓' : 'Lampirkan Gambar Sampul'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Detail Tata Letak Bahan</label>
                    <textarea 
                      required 
                      rows={3} 
                      value={catForm.desc} 
                      onChange={e => setCatForm({...catForm, desc: e.target.value})}
                      placeholder="misal: Katun Terry loopback berat 235GSM, sablon discharge 3 warna..." 
                      className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:border-brand-red focus:outline-none placeholder:text-gray-300 text-brand-dark resize-none" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="bg-brand-dark hover:bg-brand-red text-white py-3.5 px-8 font-mono text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-none"
                  >
                    <Plus size={14} /> PUBLIKASIKAN SPESIFIKASI
                  </button>
                </form>

                {/* Listing Section */}
                <div>
                  <h4 className="font-mono text-xs font-bold text-brand-blue uppercase tracking-[0.2em] mb-4">DAFTAR KATALOG AKTIF</h4>
                  <div className="flex flex-col border border-brand-blue/10 divide-y divide-brand-blue/5">
                    {data?.catalog.map((item) => (
                      <div key={item.id} className="p-4 flex items-center justify-between group bg-brand-white hover:bg-[#FAF6F0] transition-colors gap-4">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="w-12 h-12 object-cover border border-brand-blue/10" referrerPolicy="no-referrer" />
                          <div>
                            <span className="font-heading font-bold text-base text-brand-dark block">{item.name}</span>
                            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                              {item.type} • {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.price)}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItem('catalog', item.id)}
                          className="text-gray-300 hover:text-brand-red transition-colors p-2.5 hover:bg-brand-red/5 rounded cursor-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setGalleryCategory('konveksi')} 
                    className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest border ${galleryCategory === 'konveksi' ? 'bg-brand-blue text-white border-brand-blue' : 'bg-brand-white text-brand-dark border-brand-blue/20 hover:border-brand-red'}`}
                  >
                    Konveksi
                  </button>
                  <button 
                    onClick={() => setGalleryCategory('sablon')} 
                    className={`flex-1 py-3 text-xs font-mono uppercase tracking-widest border ${galleryCategory === 'sablon' ? 'bg-brand-blue text-white border-brand-blue' : 'bg-brand-white text-brand-dark border-brand-blue/20 hover:border-brand-red'}`}
                  >
                    Sablon
                  </button>
                </div>
                
                {/* Gallery form upload */}
                <form onSubmit={addGalleryItem} className="bg-[#FAF6F0] p-6 border border-brand-blue/5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">TAMBAH GAMBAR ARSIP</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Judul / Deskripsi</label>
                      <input 
                        required 
                        value={galleryTitle} 
                        onChange={e => setGalleryTitle(e.target.value)} 
                        placeholder="Deskripsi karya" 
                        className="w-full border border-brand-blue/10 p-3 text-xs font-mono" 
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Pilih Gambar</label>
                      <div className="border border-dashed border-brand-blue/20 p-6 text-center relative hover:bg-white hover:border-brand-red/40 transition-colors w-full bg-brand-white">
                        <input 
                          type="file" 
                          accept="image/*" 
                          required
                          onChange={handleGalleryFile} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-none z-10" 
                        />
                        <ImageIcon className="mx-auto text-brand-blue/45 mb-2" size={24} strokeWidth={1} />
                        <p className="font-mono text-[10px] text-brand-dark">{galleryFile ? galleryFile.name : 'PILIH FILE'}</p>
                      </div>
                    </div>
                    <button type="submit" className="bg-brand-dark hover:bg-brand-red text-white py-3.5 px-8 font-mono text-xs tracking-widest uppercase transition-all">UNGGAH</button>
                  </div>
                </form>

                {/* Listing Section */}
                <div>
                  <h4 className="font-mono text-xs font-bold text-brand-blue uppercase tracking-[0.2em] mb-4">GALERI ARSIP VISUAL AKTIF</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {data?.gallery.map((item) => (
                      <div key={item.id} className="relative aspect-square group border border-brand-blue/10 bg-brand-white select-none">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 bg-brand-blue text-white font-mono text-[8px] uppercase tracking-widest px-2 py-0.5">
                          {item.category || 'konveksi'}
                        </span>
                        <button 
                          onClick={() => removeItem('gallery', item.id)}
                          className="absolute top-2 right-2 bg-brand-red hover:bg-brand-blue text-white p-2 border border-transparent hover:border-brand-blue opacity-0 group-hover:opacity-100 transition-all cursor-none z-20"
                        >
                          <Trash2 size={12} />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-brand-dark/90 backdrop-blur-[1px] p-2 text-[8px] text-white font-mono uppercase truncate text-center">
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'portofolio' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="bg-[#FAF6F0] p-6 sm:p-8 border border-brand-blue/5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-6 border-b border-brand-blue/5 pb-4">INFO PORTOFOLIO UTAMA</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Tentang Kami</label>
                      <textarea value={portoAbout} onChange={e => setPortoAbout(e.target.value)} rows={3} className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Visi</label>
                      <textarea value={portoVision} onChange={e => setPortoVision(e.target.value)} rows={2} className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Misi</label>
                      <textarea value={portoMission} onChange={e => setPortoMission(e.target.value)} rows={2} className="w-full bg-brand-white border border-brand-blue/10 p-3 font-mono text-xs focus:ring-1 focus:ring-brand-red focus:outline-none" />
                    </div>
                    <button onClick={savePortofolioText} className="bg-brand-dark hover:bg-brand-red text-white py-3.5 px-8 font-mono text-xs tracking-widest uppercase transition-all">SIMPAN TEKS</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Layanan Kami */}
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">LAYANAN KAMI</h3>
                    <form onSubmit={submitService} className="bg-brand-white p-4 border border-brand-blue/10 mb-4 space-y-3">
                      <input required value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} placeholder="Judul Layanan" className="w-full border border-brand-blue/10 p-2 text-xs font-mono" />
                      <textarea required value={serviceForm.desc} onChange={e => setServiceForm({...serviceForm, desc: e.target.value})} placeholder="Deskripsi" rows={2} className="w-full border border-brand-blue/10 p-2 text-xs font-mono resize-none" />
                      <button type="submit" className="bg-brand-blue text-white w-full py-2 text-xs font-mono">TAMBAH LAYANAN</button>
                    </form>
                    <div className="space-y-2">
                       {data?.portofolio?.services?.map(s => (
                         <div key={s.id} className="p-3 border border-brand-blue/10 flex justify-between items-start bg-gray-50">
                           <div>
                             <p className="font-bold text-xs">{s.title}</p>
                             <p className="text-[10px] text-gray-500">{s.desc}</p>
                           </div>
                           <button onClick={() => removeItemFromSubarray('portofolio', 'services', s.id)} className="text-red-500"><Trash2 size={14}/></button>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Keunggulan Kami */}
                  <div>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">KEUNGGULAN KAMI</h3>
                    <form onSubmit={submitAdvantage} className="bg-brand-white p-4 border border-brand-blue/10 mb-4 space-y-3">
                      <input required value={advantageForm.title} onChange={e => setAdvantageForm({...advantageForm, title: e.target.value})} placeholder="Judul Keunggulan" className="w-full border border-brand-blue/10 p-2 text-xs font-mono" />
                      <textarea required value={advantageForm.desc} onChange={e => setAdvantageForm({...advantageForm, desc: e.target.value})} placeholder="Deskripsi" rows={2} className="w-full border border-brand-blue/10 p-2 text-xs font-mono resize-none" />
                      <button type="submit" className="bg-brand-blue text-white w-full py-2 text-xs font-mono">TAMBAH KEUNGGULAN</button>
                    </form>
                    <div className="space-y-2">
                       {data?.portofolio?.advantages?.map(a => (
                         <div key={a.id} className="p-3 border border-brand-blue/10 flex justify-between items-start bg-gray-50">
                           <div>
                             <p className="font-bold text-xs">{a.title}</p>
                             <p className="text-[10px] text-gray-500">{a.desc}</p>
                           </div>
                           <button onClick={() => removeItemFromSubarray('portofolio', 'advantages', a.id)} className="text-red-500"><Trash2 size={14}/></button>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <form onSubmit={submitFaq} className="bg-[#FAF6F0] p-6 border border-brand-blue/5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-4">TAMBAH FAQ</h3>
                  <div className="space-y-4">
                    <input required value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} placeholder="Pertanyaan" className="w-full border border-brand-blue/10 p-3 text-xs font-mono" />
                    <textarea required value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} placeholder="Jawaban" rows={3} className="w-full border border-brand-blue/10 p-3 text-xs font-mono resize-none" />
                    <button type="submit" className="bg-brand-dark hover:bg-brand-red text-white py-3.5 px-8 font-mono text-xs tracking-widest uppercase transition-all">TAMBAH FAQ</button>
                  </div>
                </form>
                <div>
                  <h4 className="font-mono text-xs font-bold text-brand-blue uppercase tracking-[0.2em] mb-4">DAFTAR FAQ AKTIF</h4>
                  <div className="space-y-3">
                    {data?.faqs?.map(faq => (
                      <div key={faq.id} className="p-4 border border-brand-blue/10 bg-brand-white flex justify-between items-start">
                        <div>
                           <p className="font-bold text-sm text-brand-blue">{faq.question}</p>
                           <p className="text-xs text-gray-600 mt-1">{faq.answer}</p>
                        </div>
                        <button onClick={() => removeItem('faqs', faq.id)} className="text-red-500 p-2 hover:bg-red-50"><Trash2 size={16}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="bg-[#FAF6F0] p-6 sm:p-8 border border-brand-blue/5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue mb-6">PENGATURAN KONTAK & LOKASI</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">No. WhatsApp</label>
                      <input value={contactForm.whatsapp} onChange={e => setContactForm({...contactForm, whatsapp: e.target.value})} placeholder="misal: 628123456789" className="w-full border border-brand-blue/10 p-3 text-xs font-mono focus:border-brand-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Email</label>
                      <input value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} placeholder="misal: hello@hcb.com" className="w-full border border-brand-blue/10 p-3 text-xs font-mono focus:border-brand-red focus:outline-none" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Instagram Handler</label>
                      <input value={contactForm.instagram} onChange={e => setContactForm({...contactForm, instagram: e.target.value})} placeholder="misal: @hcb_works" className="w-full border border-brand-blue/10 p-3 text-xs font-mono focus:border-brand-red focus:outline-none" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="font-mono text-[9px] uppercase tracking-widest text-brand-blue font-bold mb-2 block">Alamat Lengkap</label>
                       <textarea value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})} rows={3} placeholder="Alamat lengkap bengkel / kantor..." className="w-full border border-brand-blue/10 p-3 text-xs font-mono focus:border-brand-red focus:outline-none resize-none" />
                    </div>
                  </div>
                  <button onClick={saveContact} className="bg-brand-dark hover:bg-brand-red text-white py-3.5 px-8 font-mono text-xs tracking-widest uppercase transition-all">SIMPAN KONTAK</button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
