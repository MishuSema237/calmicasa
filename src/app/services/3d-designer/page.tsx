'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Monitor, Layers, Box, PenTool, CheckCircle } from 'lucide-react'

export default function DesignerPage() {
    const features = [
        {
            icon: Monitor,
            title: 'Real-time 3D Visualization',
            description: 'See your design come to life instantly in photorealistic 3D.'
        },
        {
            icon: Layers,
            title: 'Floor Plan Editor',
            description: 'Easily drag and drop walls, windows, and doors to create your layout.'
        },
        {
            icon: Box,
            title: 'Catalog of 1000+ Items',
            description: 'Furnish your tiny home with real products from our database.'
        },
        {
            icon: PenTool,
            title: 'Custom Materials',
            description: 'Experiment with different wood types, sidings, and finishes.'
        }
    ]

    return (
        <div className="min-h-screen pt-16">
            {/* Hero */}
            <section className="bg-gray-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=1080&fit=crop"
                        alt="3D Design"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Design Your Dream <br />
                            <span className="text-pink-500">Tiny Home in 3D</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            No technical skills required. Our intuitive 3D designer tool lets you visualize every detail of your future home before building.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-pink-600 rounded-lg font-bold hover:bg-pink-700 transition-colors">
                                Start Designing Free
                            </button>
                            <button className="px-8 py-4 border border-white/30 bg-white/10 backdrop-blur rounded-lg font-bold hover:bg-white/20 transition-colors">
                                Watch Demo
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 w-full"
                    >
                        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-800 relative">
                            {/* Placeholder for tool screenshot */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                <span className="text-lg">Interactive 3D Preview</span>
                            </div>
                            <Image
                                src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&h=600&fit=crop"
                                alt="Editor UI"
                                fill
                                className="object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />

                            {/* Floating UI Elements Mockup */}
                            <div className="absolute top-4 right-4 w-48 bg-gray-900/90 backdrop-blur p-4 rounded-lg border border-gray-700">
                                <div className="h-2 bg-gray-700 rounded mb-2 w-3/4"></div>
                                <div className="h-2 bg-gray-700 rounded mb-4 w-1/2"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="h-12 bg-gray-700 rounded"></div>
                                    <div className="h-12 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Tools made Simple</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We've packed architectural-grade capability into an interface that anyone can use.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 text-pink-600">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hire an Expert CTA */}
            <section className="py-20 bg-pink-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Need expert help?</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Get matched with one of our certified tiny home architects who can take your rough sketch and turn it into construction-ready blueprints.
                    </p>
                    <Link href="/services/consulting" className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                        Hire a Designer
                    </Link>
                </div>
            </section>
        </div>
    )
}
