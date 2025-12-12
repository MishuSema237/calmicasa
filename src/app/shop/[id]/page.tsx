'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock Data (matches your shop main page)
const products = [
    { id: 1, name: 'Eco Kettle', price: '$45', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&h=500&fit=crop', category: 'Kitchen', description: 'Energy efficient boiling for your tiny kitchen.' },
    { id: 2, name: 'Compact Toaster', price: '$35', image: 'https://images.unsplash.com/photo-1583526683838-89c56073103e?w=500&h=500&fit=crop', category: 'Kitchen', description: 'Fits anywhere, toasts perfectly.' },
    { id: 3, name: 'Wall Organizer', price: '$25', image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=500&h=500&fit=crop', category: 'Storage', description: 'Maximize your vertical space.' },
    { id: 4, name: 'Foldable Desk', price: '$120', image: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=500&h=500&fit=crop', category: 'Furniture', description: 'Work hard, then fold it away.' },
]

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const product = products.find(p => p.id === Number(id)) || products[0]

    return (
        <div className="min-h-screen pt-24 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <Link href="/shop" className="text-gray-500 hover:text-gray-900 mb-8 inline-block">← Back to Shop</Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <p className="text-3xl font-bold text-gray-900 mb-6">{product.price}</p>

                        <div className="flex items-center gap-1 text-yellow-400 mb-6">
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <Star className="w-5 h-5 fill-current" />
                            <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {product.description} Designed specifically for compact living spaces, ensuring you make the most of every square inch without sacrificing functionality or style.
                        </p>

                        <div className="flex gap-4 mb-8">
                            <button className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                <ShoppingCart className="w-5 h-5" /> Add to Cart
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Free Shipping</div>
                            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> 2 Year Warranty</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
