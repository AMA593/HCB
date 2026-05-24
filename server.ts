import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data.json");

// Middleware
app.use(express.json({ limit: "50mb" })); // Increased limit for base64 images

// Init data file
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
    catalog: [
      { id: "1", type: "tshirt", name: "HCB Gundam RX-78 Edition", price: 150000, description: "Premium Combed 30s", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?width=800&q=80" },
      { id: "2", type: "jacket", name: "HCB Zeon Bomber", price: 350000, description: "Waterproof Taslan", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?width=800&q=80" }
    ],
    pricelist: [
      { id: "1", item: "T-Shirt Reguler", minOrder: 12, price: 55000 },
      { id: "2", item: "T-Shirt Premium", minOrder: 12, price: 75000 },
      { id: "3", item: "Jacket Bomber/Varsity", minOrder: 12, price: 180000 },
      { id: "4", item: "Kemeja PDH/PDL", minOrder: 12, price: 150000 }
    ],
    gallery: [
      { id: "1", title: "Project: University Event", image: "https://images.unsplash.com/photo-1529336953128-a85760f58cb5?width=800&q=80" },
      { id: "2", title: "Project: Corporate Gathering", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?width=800&q=80" }
    ],
    testimonies: [
      { id: "1", name: "Budi Santoso", text: "Sablonnya awet dan jahitannya rapi! HCB the best.", role: "Ketua Panitia Event" },
      { id: "2", name: "Ahmad", text: "Pengerjaan tepat waktu, rekomendasi banget buat konveksi.", role: "CEO Startup" }
    ],
    portofolio: {
      aboutUs: "Kami adalah fabrikasi garmen presisi yang berfokus pada kualitas jahitan tanpa kompromi. Memadukan teknik jahit tangan tradisional dengan standar manufaktur modern.",
      vision: "Menjadi referensi utama dalam industri pakaian kustom dengan standar build quality tertinggi dan pengerjaan paling detail.",
      mission: "Mengutamakan kualitas material pilihan, memberdayakan pengrajin jahit lokal berpengalaman, dan menghadirkan produk dengan ketahanan pakai maksimal.",
      services: [
        { id: "1", title: "Produksi Kemeja Kustom", desc: "Dari pola hingga jahitan akhir, dibuat untuk kesesuaian dan durabilitas tertinggi." },
        { id: "2", title: "Screen Printing Presisi", desc: "Sablon dengan tinta premium, color matching yang akurat dan hasil yang tahan lama." },
        { id: "3", title: "Penyediaan Seragam Partai Besar", desc: "Manufaktur seragam organisasi dan institusi berstandar iso untuk kuantitas masif." }
      ],
      advantages: [
        { id: "1", title: "Jahitan Triple Deck", desc: "Standar ketahanan operasional tinggi, dirancang untuk pakaian kerja lapangan." },
        { id: "2", title: "Quality Control 3 Tahap", desc: "Setiap batch melewati screening ketat sebelum dikirim." },
        { id: "3", title: "Material Tersertifikasi", desc: "Hanya menggunakan kain dan benang dari supplier berlisensi dan terpercaya." }
      ]
    },
    faqs: [
      { id: "1", question: "Berapa lama estimasi pengerjaan pesanan kustom?", answer: "Untuk order standar 2-3 minggu tergantung antrian produksi berjalan. Tim kami akan memberikan timeline persis sebelum project dimulai." },
      { id: "2", question: "Apakah ada minimum order quantity (MOQ)?", answer: "Ya, MOQ kami adalah 12 pcs per desain/artikel, untuk menjaga efisiensi mesin cutting dan setup sablon." },
      { id: "3", question: "Apakah saya bisa request sample bahan sebelum produksi massal?", answer: "Tentu, kami menyediakan proto-sample sebelum eksekusi partai besar. Biaya pembuatan sample akan diakumulasikan ke dalam total invoice." }
    ],
    contact: {
      whatsapp: "6281234567890",
      email: "inquiry@hcb.studio",
      address: "Warehouse & Workshop:\nJl. Industrialis Tekstil No. 44\nKawasan Terpadu, Jawa Barat 40222",
      instagram: "@hcb_convection"
    }
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

// API Routes
app.get("/api/data", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

app.post("/api/data", (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to write data" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
