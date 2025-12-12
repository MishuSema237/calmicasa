'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowRight, Ruler, Users } from 'lucide-react'

// Using the Tiny Home models data as the "Shop" content
const products = [
    {
        id: 'calmicasa-classic',
        name: 'The CalmiCasa Classic',
        price: '$186,000',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        description: 'Our flagship model. A masterpiece of modern design with main floor master.',
        specs: '320 sq ft • Sleeps 4'
    },
    {
        id: 'eco-denizen',
        name: 'The Eco Denizen',
        price: '$90,000',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
        description: 'Sustainable luxury using 100% recycled materials and solar integration.',
        specs: '220 sq ft • Sleeps 2'
    },
    {
        id: 'luna-retreat',
        name: 'The Luna Retreat',
        price: '$105,000',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        description: 'Budget-conscious high design with floor-to-ceiling glass walls.',
        specs: '280 sq ft • Sleeps 3'
    },
    {
        id: 'nomad',
        name: 'The Nomad',
        price: '$75,000',
        image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&h=600&fit=crop',
        description: 'Built for the road. Aerodynamic, lightweight, and rugged.',
        specs: '180 sq ft • Sleeps 2'
    },
    {
        id: 'family-haven',
        name: 'The Family Haven',
        price: '$145,000',
        image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
        description: 'Spacious two-bedroom design perfect for growing families.',
        specs: '400 sq ft • Sleeps 6'
    },
    {
        id: 'modernist',
        name: 'The Modernist',
        price: '$115,000',
        image: 'https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?w=800&h=600&fit=crop',
        description: 'Sleek, black, and bold. For those who want to make a statement.',
        specs: '300 sq ft • Sleeps 2'
    }
]

export default function ShopPage() {
    return (
        <div className="min-h-screen pt-16 bg-white">
            {/* Hero */}
            <section className="bg-gray-50 py-16 px-4 border-b">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Tiny Homes</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Purchase your dream home directly from us. Customizable, delivered to your land, and ready for living.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Shop Content */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-sm font-bold text-gray-900">
                                    {product.price}
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 font-medium flex items-center gap-2">
                                    <Ruler className="w-4 h-4" /> {product.specs}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {product.description}
                                </p>

                                <Link
                                    href={`/resources/tiny-homes/${product.id}`}
                                    className="block w-full py-4 bg-gray-900 text-white text-center font-bold rounded-xl hover:bg-gray-800 transition-colors"
                                >
                                    View Options & Order
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
