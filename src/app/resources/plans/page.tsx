'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, FileText, Check } from 'lucide-react'

export default function PlansPage() {
    const plans = [
        {
            name: 'The Studio',
            sqft: 200,
            price: '$199',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
            includes: ['Architectural drawings', 'Material list', 'Electrical layout']
        },
        {
            name: 'The Loft',
            sqft: 350,
            price: '$299',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
            includes: ['Architectural drawings', 'Material list', 'Electrical layout', 'Plumbing schematic']
        },
        {
            name: 'The Family',
            sqft: 450,
            price: '$399',
            image: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=600&fit=crop',
            includes: ['Architectural drawings', 'Material list', 'Full MEP plans', '3D SketchUp model']
        }
    ]

    return (
        <div className="min-h-screen pt-16">
            {/* Header */}
            <section className="bg-blue-600 text-white py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Instructional Floor Plans</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Build it yourself with our professional-grade architectural plans. Instant digital download.
                    </p>
                </motion.div>
            </section>

            {/* Plans Grid */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
                        >
                            <div className="h-48 relative bg-gray-200">
                                <Image
                                    src={plan.image}
                                    alt={plan.name}
                                    fill
                                    className="object-cover opacity-80"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FileText className="w-12 h-12 text-white drop-shadow-lg" />
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-gray-500">{plan.sqft} sq ft</span>
                                    <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.includes.map(inc => (
                                        <li key={inc} className="flex items-center text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            {inc}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold flex items-center justify-center hover:bg-gray-800 transition-colors">
                                    <Download className="w-4 h-4 mr-2" />
                                    Buy & Download
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
