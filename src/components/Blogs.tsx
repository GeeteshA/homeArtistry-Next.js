// src/components/Blogs.tsx
'use client'

import { useState } from 'react';
import Image from 'next/image';
import blogPosts from '@/data/Blogs';

const Blogs = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const getCloudinaryImageUrl = (imageId: string) => {
    return `https://res.cloudinary.com/dler6e15t/image/upload/c_fill,w_800,h_600/${imageId}`;

  };

  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Artistry Journal</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and inspiration from our creative journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative">
              {/* Skeleton loader */}
              {!imagesLoaded[post.id] && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse z-10"></div>
              )}
              
              <div className="h-64 w-full relative">
                <Image
                  src={getCloudinaryImageUrl(post.image)} 
                  alt={post.title} 
                  fill
                  className="object-cover"
                  onLoad={() => handleImageLoad(post.id)}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 text-gray-900">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <button className="text-black font-medium flex items-center group">
                  Read full article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs;
