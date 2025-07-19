// src/components/ProductGrid.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CloudinaryImage from './CloudinaryImage';
import products from '../data/Product';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

const ProductGrid = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [visibleProducts, setVisibleProducts] = useState(6); // Changed to multiple of 2 and 3
  const [loading, setLoading] = useState(false);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { addToCart } = useCart();

  const validProducts = products.filter((product): product is Product & { price: number } => 
    product.price !== undefined
  );

  const handleScroll = useCallback(() => {
    if (throttleTimeoutRef.current || loading) return;
    
    throttleTimeoutRef.current = setTimeout(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        setLoading(true);
        setVisibleProducts(prev => {
          const newValue = Math.min(prev + 6, validProducts.length); // Load 6 at a time (multiple of 2 and 3)
          setLoading(newValue === prev);
          return newValue;
        });
      }
      throttleTimeoutRef.current = null;
    }, 200);
  }, [loading, validProducts.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const handleImageLoad = useCallback((id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 6, validProducts.length)); // Load 6 at a time
      setLoading(false);
    }, 300);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Changed grid layout to show 2 on mobile (sm) and 3 on desktop (lg) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {validProducts.slice(0, visibleProducts).map((product) => (
            <div 
              key={product.id} 
              className="relative group bg-[#F2F2F2] p-3 sm:p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {!imagesLoaded[product.id] && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg z-10"></div>
              )}
              
              <div className="relative">
                {product.isNew && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
                    New
                  </div>
                )}
                
                <Link 
                  href={`/product/${product.id}`} 
                  className="block"
                  aria-label={`View ${product.title} details`}
                >
                  <div className="aspect-square mb-3 sm:mb-4 bg-gray-100 relative overflow-hidden rounded-lg">
                    <CloudinaryImage
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      onLoad={() => handleImageLoad(product.id)}
                      loading="lazy"
                    />
                  </div>
                </Link>

                {/* QUICK ADD button - positioned between image and title */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image
                    });
                  }}
                  className="
                    w-full py-1 sm:py-2 mb-2 sm:mb-3 rounded-l-sm bg-black text-white border border-black
                    hover:bg-white hover:text-black transition-all duration-300
                    lg:absolute lg:left-1/2 lg:bottom-32 lg:w-4/5 lg:-translate-x-1/2
                    lg:opacity-0 lg:translate-y-2
                    lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                    flex items-center justify-center text-sm sm:text-base
                  "
                  aria-label={`Add ${product.title} to cart`}
                >
                  <FiShoppingCart className="mr-1 sm:mr-2" />
                  QUICK ADD
                </button>

                {/* Product Info */}
                <Link 
                  href={`/product/${product.id}`} 
                  className="block"
                  aria-label={`View ${product.title} details`}
                >
                  <div className="transition-all duration-300 group-hover:px-2">
                    <h3 className="text-sm sm:text-lg text-gray-900 font-medium mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1 sm:mb-2 line-clamp-1">
                      {product.collection}
                    </p>
                  </div>
                </Link>
                
                <div className="flex justify-between items-center mt-1 sm:mt-2">
                  <div>
                    <span className="text-sm sm:text-base font-bold text-black">
                      ₹{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-400 line-through ml-1 sm:ml-2">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {visibleProducts < validProducts.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-70"
              aria-label="Load more products"
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;