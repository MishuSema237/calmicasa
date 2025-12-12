'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Ruler, Users, ArrowRight } from 'lucide-react'

// Helper to normalize the ID from the name
const slugify = (text: string) =>
    text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text

export default function TinyHomesPage() {
    const homes = [
        {
            name: 'The CalmiCasa Classic',
            price: '$186,000',
            size: '320 sq ft',
            sleeps: '2-4',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
            features: ['Main floor master', 'Sliding glass walls', 'Full kitchen']
        },
        {
            name: 'The Eco Denizen',
            price: '$90,000',
            size: '220 sq ft',
            sleeps: '1-2',
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
            features: ['Solar ready', 'Compost toilet', 'Rainwater collection']
        },
        {
            name: 'The Luna Retreat',
            price: '$105,000',
            size: '280 sq ft',
            sleeps: '2-3',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
            features: ['Luxury finishes', 'Loft bedroom', 'Skylights']
        },
        {
            name: 'The Nomad',
            price: '$75,000',
            size: '180 sq ft',
            sleeps: '1-2',
            image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&h=600&fit=crop',
            features: ['Tow-ready', 'Transformer furniture', 'Off-grid capable']
        },
        {
            name: 'The Family Haven',
            price: '$145,000',
            size: '400 sq ft',
            sleeps: '4-6',
            image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
            features: ['Two bedrooms', 'Full bath', 'Large living area']
        },
        {
            name: 'The Modernist',
            price: '$115,000',
            size: '300 sq ft',
            sleeps: '2',
            image: 'https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?w=800&h=600&fit=crop',
            features: ['Minimalist design', 'Smart home tech', 'Hidden storage']
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-white">
            {/* Header */}
            <section className="py-20 px-4 bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Tiny Home Models</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Hand-crafted, sustainable, and built to last. Browse our signature models or contact us for a custom build.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">All Models</button>
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">On Wheels</button>
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">Foundation</button>
                            <button className="px-6 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">Container</button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {homes.map((home, idx) => (
                        <motion.div
                            key={home.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group"
                        >
                            <div className="relative rounded-2xl overflow-hidden mb-6 shadow-lg">
                                <Image
                                    src={home.image}
                                    alt={home.name}
                                    width={800}
                                    height={600}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                                    <span className="font-bold text-gray-900">{home.price}</span>
                                </div>
                            </div>

                            <Link href={`/resources/tiny-homes/${slugify(home.name)}`}>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors cursor-pointer">{home.name}</h3>
                            </Link>

                            <div className="flex gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center">
                                    <Ruler className="w-4 h-4 mr-1" />
                                    {home.size}
                                </div>
                                <div className="flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    Sleeps {home.sleeps}
                                </div>
                            </div>

                            <ul className="mb-6 space-y-2">
                                {home.features.map(f => (
                                    <li key={f} className="text-gray-600 flex items-center text-sm">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/resources/tiny-homes/${slugify(home.name)}`}
                                className="inline-flex items-center font-bold text-gray-900 border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                            >
                                View Details <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
