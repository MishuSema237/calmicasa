import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
//import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CalmiCasa - Premium Tiny Homes & Container Living',
  description: 'Discover sustainable, modern tiny homes made from containers and eco-friendly materials. Join our community of tiny home enthusiasts and find your perfect compact living solution.',
  keywords: 'tiny homes, container homes, sustainable living, eco-friendly homes, compact living, modular homes',
  authors: [{ name: 'CalmiCasa' }],
  openGraph: {
    title: 'CalmiCasa - Premium Tiny Homes & Container Living',
    description: 'Discover sustainable, modern tiny homes made from containers and eco-friendly materials.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalmiCasa - Premium Tiny Homes & Container Living',
    description: 'Discover sustainable, modern tiny homes made from containers and eco-friendly materials.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
