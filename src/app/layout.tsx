import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'


export const metadata: Metadata = {
  title: 'Artistic Gallery | Timeless Masterpieces',
  description: 'Discover our exclusive Crystal Collection featuring iconic artworks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}