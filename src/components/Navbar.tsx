// src/components/Navbar.tsx
'use client'

import { FiShoppingCart, FiUser, FiX, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import CloudinaryImage from './CloudinaryImage';

const Navbar = () => {
  const { cart, cartCount, removeFromCart, cartTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const prevCartCountRef = useRef(cartCount);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setIsCartOpen(true);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-700">
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <div className="text-xl font-bold tracking-wider">Home Artistry</div>
            </div>
          </Link>

          <div className="flex items-center space-x-5">
            {/* Cart Dropdown */}
            <div className="relative" ref={cartDropdownRef}>
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative text-gray-300 hover:text-white transition-colors"
                aria-label="Cart"
              >
                <FiShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold">Your Cart ({cartCount})</h3>
                    <button onClick={() => setIsCartOpen(false)}>
                      <FiX size={18} />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {cart.length === 0 ? (
                      <p className="p-4 text-center">Your cart is empty</p>
                    ) : (
                      cart.map(item => (
                        <div key={item.id} className="p-4 border-b flex items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                            {/* Using CloudinaryImage component */}
                            <CloudinaryImage
                              src={item.image}
                              alt={item.title}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-gray-600">₹{item.price.toFixed(2)} × {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex justify-between mb-4">
                      <span className="font-bold">Subtotal:</span>
                      <span className="font-bold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <Link 
                      href="/cart" 
                      className="block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <FiUser size={18} className="mr-1" />
                    <span className="text-sm">{user.name}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-50">
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
                  <FiUser size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>

        <nav className="flex justify-center py-3">
          <div className="flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-gray-300 transition-colors text-sm tracking-wider">
              Home
            </Link>
            <Link href="/shop" className="font-medium hover:text-gray-300 transition-colors text-sm tracking-wider">
              Shop
            </Link>
            <Link href="/blog" className="font-medium hover:text-gray-300 transition-colors text-sm tracking-wider">
              Blog
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;