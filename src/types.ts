// src/types.ts
export interface Product {
  id: number;
  title: string;
  collection: string;
  price: number;
  originalPrice: number;
  image: string;
  isNew?: boolean;
  rating?: number;
  description?: string;
  details?: string[];
  // quantity: number;
}
export interface CartItem extends Product {
  quantity: number;
}