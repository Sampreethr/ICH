import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { OrderProvider } from '../contexts/OrderContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Indian Coffee House | Authentic Coffee Experience in Australia',
  description: 'Experience the rich tradition of Indian Coffee House in Australia. Premium coffee, authentic flavors, and warm hospitality since our establishment.',
  keywords: 'Indian Coffee House, Australia, coffee, authentic, premium, cafe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-cream-50">
        <AuthProvider>
          <OrderProvider>
            {children}
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  )
}