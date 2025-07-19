// src/data/Blogs.ts
export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string; 
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Handcrafted Decor",
    date: "May 15, 2024",
    excerpt: "Discover the intricate process behind our handcrafted wall art pieces and how they bring life to your space. Each piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations.",
    image: "8767132_ij9rfa",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Sustainable Materials in Modern Art",
    date: "June 2, 2024",
    excerpt: "Learn about our commitment to sustainability and the eco-friendly materials we use in every piece. We source reclaimed wood, recycled metals, and natural pigments to create art that's both beautiful and environmentally conscious.",
    image: "tablet-which-you-can-read-blog_zu3htv", 
    readTime: "4 min read"
  },
  
];

export default blogPosts;

// https://res.cloudinary.com/dler6e15t/image/upload/v1752431826/8767132_ij9rfa.jpg