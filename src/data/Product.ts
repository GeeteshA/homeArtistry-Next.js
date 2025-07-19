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
    description: "Handcrafted with precision, this exquisite piece features intricate mirror work and floral patterns.",
    details: ["Dimensions: 24\" diameter", "Material: Recycled glass mirrors", "Weight: 3.5 kg"]
  },
  {
    id: 2,
    title: "Festival Bloom Set",
    collection: "Home Artistry Collection",
    price: 2000.00,
    originalPrice: 2800.00,
    image: "2_jbqiwa",
    isNew: true,
    rating: 4.8,
    description: "Beautiful festival-themed decorative set with vibrant colors.",
    details: ["Set of 3 pieces", "Material: Sustainable wood", "Weight: 2.8 kg"]
  },
  {
    id: 3,
    title: "Mushroom Mosaic Plate",
    collection: "Lighting & Decor",
    price: 2500.00,
    originalPrice: 3600.00,
    image: "4_oq4d1k",
    isNew: false,
    rating: 4.2,
    description: "Unique mosaic design featuring mushroom patterns.",
    details: ["Diameter: 18\"", "Material: Ceramic mosaic", "Weight: 1.5 kg"]
  },
  {
    id: 4,
    title: "Tribal Weave Wall",
    collection: "New Arrivals",
    price: 1999.00,
    originalPrice: 2250.00,
    image: "4_oq4d1k",
    isNew: true,
    rating: 4.7,
    description: "Traditional tribal weaving patterns in modern design.",
    details: ["Size: 36\" x 24\"", "Material: Natural fibers", "Weight: 2.2 kg"]
  },
  {
    id: 5,
    title: "Starlit Round Panel",
    collection: "Wall Mirror Collection",
    price: 1250.50,
    originalPrice: 1500.00,
    image: "5_lfbfut",
    isNew: false,
    rating: 4.3,
    description: "Elegant round panel with starlit design elements.",
    details: ["Diameter: 30\"", "Material: Mirror and metal", "Weight: 4.0 kg"]
  },
  {
    id: 6,
    title: "Radiant Mirror Plate",
    collection: "Handcrafted Decor",
    price: 1100.00,
    originalPrice: 1350.00,
    image: "6_yf9ib5",
    isNew: false,
    rating: 4.4,
    description: "Handcrafted mirror plate with radiant design.",
    details: ["Diameter: 22\"", "Material: Premium mirror", "Weight: 3.2 kg"]
  },
  {
    id: 7,
    title: "Lotus Wall Medallion",
    collection: "Home Artistry Collection",
    price: 2800.75,
    originalPrice: 3200.00,
    image: "7_oivtn4",
    isNew: true,
    rating: 4.9,
    description: "Exquisite lotus-themed wall medallion with intricate details.",
    details: ["Size: 28\" x 28\"", "Material: Brass and mirror", "Weight: 5.5 kg"]
  }
];

export default products;
