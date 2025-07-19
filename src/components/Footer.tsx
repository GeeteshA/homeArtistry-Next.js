'use client'
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Top Section - Split layout for mobile */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 mb-8">
          {/* Left side - Brand & Socials (mobile) */}
          <div className="md:hidden flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">Home Artistry</h3>
              <p className="text-gray-400 mb-4">
                Handcrafted wall art to inspire your space
              </p>
            </div>
            <div className="flex space-x-4 mt-1">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* Desktop Brand Info (hidden on mobile) */}
          <div className="hidden md:block">
            <h3 className="text-xl font-bold mb-2">Home Artistry</h3>
            <p className="text-gray-400 mb-4">
              Handcrafted wall art to inspire your space
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter size={20} />
              </Link>
            </div>
          </div>
          
          {/* Contact Info - Right side on mobile */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 flex-shrink-0 text-white" />
                <span>123 Andheri, Mumbai 00000</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 flex-shrink-0" />
                <span>(+91) 99076-7890</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 flex-shrink-0" />
                <span>contact@homeartistry.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter - Centered below on mobile, right on desktop */}
          <div className="md:col-span-1 mx-auto md:mx-0 w-full md:w-auto">
            <h4 className="text-lg font-medium mb-4 text-center md:text-left">Stay Updated</h4>
            <p className="text-gray-400 mb-3 text-center md:text-left">
              Subscribe for new collections and offers
            </p>
            <div className="flex max-w-md mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-900 text-white px-4 py-2 w-full rounded-l focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Home Artistry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer