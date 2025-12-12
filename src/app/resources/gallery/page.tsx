'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { X } from 'lucide-react'

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    // Duplicate images to have enough content to show masonry effect
    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1200&fit=crop', category: 'Exterior', height: 'h-96' },
        { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', category: 'Exterior', height: 'h-64' },
        { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop', category: 'Interior', height: 'h-80' },
        { src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=800&fit=crop', category: 'Interior', height: 'h-72' },
        { src: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8eff5?w=800&h=500&fit=crop', category: 'Kitchen', height: 'h-48' },
        { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=1100&fit=crop', category: 'Design', height: 'h-[400px]' },
        { src: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&h=600&fit=crop', category: 'Design', height: 'h-64' },
        { src: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&h=900&fit=crop', category: 'Exterior', height: 'h-80' },
        { src: 'https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?w=800&h=1000&fit=crop', category: 'Interior', height: 'h-96' },
        { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&h=600&fit=crop', category: 'Interior', height: 'h-64' }
    ]

    const categories = ['All', 'Exterior', 'Interior', 'Kitchen', 'Design']
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredImages = galleryImages.filter(img => activeCategory === 'All' || img.category === activeCategory)

    return (
        <div className="min-h-screen pt-16 bg-black text-white">
            {/* Header */}
            <section className="py-20 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                        Visual Inspiration
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        A curated collection of the finest tiny home aesthetics.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full transition-colors font-medium ${activeCategory === cat
                                        ? 'bg-white text-black'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Masonry Grid */}
            <section className="pb-20 px-4 max-w-7xl mx-auto">
                {/* CSS Columns Approach for "Pinterest Style" */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filteredImages.map((img, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer group relative overflow-hidden rounded-xl bg-gray-800 break-inside-avoid"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <img
                                src={img.src}
                                alt="Gallery item"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur">
                                    View
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-4 right-4 text-white hover:text-gray-300">
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative w-full max-w-5xl h-[80vh] rounded-lg overflow-hidden">
                        <Image
                            src={selectedImage}
                            alt="Full size"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
