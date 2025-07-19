// src/components/ProductDetail.tsx
'use client'

import { useState, useEffect } from 'react';
import { FiShoppingCart, FiStar, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import CloudinaryImage from './CloudinaryImage';
import products from '../data/Product';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct({
        ...foundProduct,
        description: "Handcrafted with precision, this exquisite piece features intricate mirror work and floral patterns. Each element is carefully placed to create a harmonious design that reflects light beautifully. Made with sustainable materials and traditional techniques passed down through generations.",
        details: [
          "Dimensions: 24\" diameter",
          "Material: Recycled glass mirrors, sustainable wood frame",
          "Weight: 3.5 kg",
          "Care: Wipe with dry cloth only",
          "Made in India"
        ]
      });
      
      setRelatedProducts(products.filter(p => 
        p.collection === foundProduct.collection && 
        p.id !== foundProduct.id
      ).slice(0, 4));
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-black font-medium">Loading Product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/shop" className="flex items-center text-black hover:text-gray-700">
          <FiArrowLeft className="mr-2" />
          <span>Back to Shop</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <div className={`aspect-square bg-gray-50 rounded-lg overflow-hidden ${imageLoaded ? 'block' : 'hidden'}`}>
                <CloudinaryImage
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-contain w-full h-full p-6"
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
              </div>
              {!imageLoaded && <div className="aspect-square bg-gray-100 animate-pulse rounded-lg"></div>}
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6 max-w-2xl">
            {product.isNew && (
              <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                New Arrival
              </span>
            )}
            
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.floor(product.rating || 0) ? 'fill-current' : ''}
                    size={18}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="text-red-600 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            
            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                {product.details?.map((detail, i) => (
                  <li key={i} className="flex">
                    <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="p-2 text-gray-600 hover:text-black"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={18} />
                </button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="p-2 text-gray-600 hover:text-black"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={18} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800"
                aria-label={`Add ${quantity} ${product.title} to cart`}
              >
                <FiShoppingCart className="inline mr-2" />
                Add to Cart
              </button>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Collection:</span>
                <span className="text-black">{product.collection}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-12">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative bg-[#F2F2F2] p-4 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1">
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      New
                    </div>
                  )}
                  <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                    <CloudinaryImage
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-700">{product.collection}</p>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-black font-bold">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through ml-2">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button 
                        className="p-2 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <FiShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;