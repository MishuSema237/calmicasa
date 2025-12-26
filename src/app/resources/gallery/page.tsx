'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { X, Loader2, Camera } from 'lucide-react'

type GalleryItem = {
    _id: string
    src: string
    category: string
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [activeCategory, setActiveCategory] = useState('All')

    const categories = ['All', 'Exterior', 'Interior', 'Kitchen', 'Design']

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/gallery')
                const data = await res.json()
                setImages(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    const filteredImages = images.filter(img =>
        activeCategory === 'All' || img.category === activeCategory
    )

    return (
        <div className="min-h-screen pt-16 bg-black text-white">
            {/* Header */}
            <section className="py-24 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-6">Gallery</div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
                        Visual <span className="text-gray-500">Inspiration</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                        A curated collection of the finest tiny home aesthetics, captured to inspire your next living space.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-2xl transition-all duration-500 font-black text-[10px] uppercase tracking-widest border ${activeCategory === cat
                                    ? 'bg-white text-black border-white'
                                    : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Masonry Grid */}
            <section className="pb-32 px-4 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">Loading Collection</span>
                    </div>
                ) : filteredImages.length === 0 ? (
                    <div className="text-center py-32 bg-white/5 rounded-[3rem] border border-white/10">
                        <Camera className="w-12 h-12 text-gray-800 mx-auto mb-6 opacity-20" />
                        <h3 className="text-2xl font-bold text-gray-400 mb-2 tracking-tight">Empty Collection</h3>
                        <p className="text-gray-600 font-medium">No inspirations found in this category yet.</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((img, idx) => (
                                <motion.div
                                    key={img._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                    className="cursor-pointer group relative overflow-hidden rounded-[2rem] bg-gray-900 break-inside-avoid border border-white/5"
                                    onClick={() => setSelectedImage(img.src)}
                                >
                                    <img
                                        src={img.src}
                                        alt="Gallery item"
                                        className="w-full h-auto object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                        <span className="text-blue-500 font-black text-[8px] uppercase tracking-[0.3em] mb-2">{img.category}</span>
                                        <span className="text-white font-bold text-lg tracking-tight">Expand View</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={selectedImage}
                                alt="Full size"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
