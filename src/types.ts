export interface CatalogItem {
  id: string;
  type: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface PricelistItem {
  id: string;
  item: string;
  minOrder: number;
  price: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'konveksi' | 'sablon';
}

export interface TestimonyItem {
  id: string;
  name: string;
  text: string;
  role: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  desc: string;
}

export interface PortofolioData {
  aboutUs: string;
  vision: string;
  mission: string;
  services: ServiceItem[];
  advantages: AdvantageItem[];
}

export interface ContactData {
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
}

export interface AppData {
  catalog: CatalogItem[];
  pricelist: PricelistItem[];
  gallery: GalleryItem[];
  testimonies: TestimonyItem[];
  portofolio?: PortofolioData;
  faqs?: FaqItem[];
  contact?: ContactData;
}
