// src/app/signup/page.tsx
'use client'

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, name, password);
      window.location.href = '/';
    } catch (err) {
      setError(`Registration failed, ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-[#F2F2F2] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>
        
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}