// src/app/cart/page.tsx
'use client'

import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CloudinaryImage from '@/components/CloudinaryImage';

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    cartCount 
  } = useCart();

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything to your cart yet
          </p>
          <Link href="/shop" className="inline-block bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 text-black gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 text-gray-600 text-sm font-medium px-4 py-3">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-1 text-right">Total</div>
              </div>
              
              {cart.map(item => (
                <div key={item.id} className="grid grid-cols-12 items-center px-4 py-6 border-b border-gray-200">
                  <div className="col-span-12 md:col-span-6 flex items-center">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 mr-4"
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                        <CloudinaryImage
                          src={item.image}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-2 mt-4 md:mt-0 text-center">
                    <span className="md:hidden text-gray-600 mr-2">Price:</span>
                    <span className="font-medium">₹{item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="col-span-4 md:col-span-3 mt-4 md:mt-0">
                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-1 mt-4 md:mt-0 text-right">
                    <span className="md:hidden text-gray-600 mr-2">Total:</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center px-4 py-4">
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 flex items-center"
                  aria-label="Clear cart"
                >
                  <FiTrash2 className="mr-2" />
                  Clear Cart
                </button>
                <Link href="/shop" className="text-gray-600 hover:text-black flex items-center">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full bg-black text-white py-3 px-6 rounded-full mt-8 hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}