// src/app/shop/page.tsx
'use client'

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import products from '../data/Product';
import { useCart } from '@/context/CartContext';

type SortOption = 'featured' | 'priceLow' | 'priceHigh' | 'ratingHigh';

export default function ShopPage() {
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'ratingHigh') return (b.rating || 0) - (a.rating || 0);
      return a.id - b.id; // featured - sort by ID as default
    });
  }, [sortBy]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 4, sortedProducts.length));
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Wall Art Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique handmade pieces crafted with passion
          </p>
        </div>

        <div className="flex text-black justify-end mb-6">
          <div className="w-full md:w-1/4">
            <label htmlFor="sort" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-gray-700">
              Sort By
            </label>
            <select
              id="sort"
              className="w-full p-3 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-black focus:border-transparent"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="featured">Featured</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="ratingHigh">Rating: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })}
            />
          ))}
        </div>
        
        {visibleProducts < sortedProducts.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-70"
            >
              {loading ? 'Loading...' : 'Load More Products'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}