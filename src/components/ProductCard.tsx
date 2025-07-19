// src/components/ProductCard.tsx
'use client'

import { FiShoppingCart } from 'react-icons/fi'
import CloudinaryImage from './CloudinaryImage'
import Link from 'next/link'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="relative group bg-[#F2F2F2] p-3 sm:p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10">
          New
        </div>
      )}
      
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square mb-3 sm:mb-4 bg-gray-100 relative overflow-hidden rounded-lg">
          <CloudinaryImage
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </Link>
      <button 
          onClick={(e) => {
            e.preventDefault()
            onAddToCart()
          }}
          className="w-full py-1 sm:py-2 mb-2 sm:mb-3 rounded-l-sm bg-black text-white border border-black
                    hover:bg-white hover:text-black transition-all duration-300
                    lg:absolute lg:left-1/2 lg:bottom-32 lg:w-4/5 lg:-translate-x-1/2
                    lg:opacity-0 lg:translate-y-2
                    lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                    flex items-center justify-center text-sm sm:text-base"
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
      
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-black font-bold">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
      </div>
    </div>
  )
}

export default ProductCard