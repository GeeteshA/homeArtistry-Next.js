// src/data/Product.ts
import { Product } from '@/types';

const products: Product[] = [
  {
    id: 1,
    title: "Floral Harmony Mandala",
    collection: "Home Artistry Collection",
    price: 1500.00,
    originalPrice: 2500.00,
    image: "1_cyixfu",
    isNew: false,
    rating: 4.5,

  },
  {
    id: 2,
    title: "Festival Bloom Set",
    collection: "Home Artistry Collection",
    price: 2000.00,
    originalPrice: 2800.00,
    image: "2_jbqiwa",
    isNew: true,
    rating: 4.8
  },
  {
    id: 3,
    title: "Mushroom Mosaic Plate",
    collection: "Lighting & Decor",
    price: 2500.00,
    originalPrice: 3600.00,
    image: "4_oq4d1k",
    isNew: false,
    rating: 4.2
  },
  {
    id: 4,
    title: "Tribal Weave Wall",
    collection: "New Arrivals",
    price: 1999.00,
    originalPrice: 2250.00,
    image: "4_oq4d1k",
    isNew: true,
    rating: 4.7
  },
  {
    id: 5,
    title: "Starlit Round Panel",
    collection: "Wall Mirror Collection",
    price: 1250.50,
    originalPrice: 1500.00,
    image: "5_lfbfut",
    isNew: false,
    rating: 4.3
  },
  {
    id: 6,
    title: "Radiant Mirror Plate",
    collection: "Handcrafted Decor",
    price: 1100.00,
    originalPrice: 1350.00,
    image: "6_yf9ib5",
    isNew: false,
    rating: 4.4
  },
  {
    id: 7,
    title: "Lotus Wall Medallion",
    collection: "Home Artistry Collection",
    price: 2800.75,
    originalPrice: 3200.00,
    image: "7_oivtn4",
    isNew: true,
    rating: 4.9
  }
];

export default products;
