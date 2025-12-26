'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Home, BookOpen, Users, Camera, FileText, Calendar, ArrowRight, LayoutGrid, X } from 'lucide-react'

export default function ResourcesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const resources = [
        { name: 'Tiny Home Models', href: '/resources/tiny-homes', icon: Home, description: 'Explore our catalog of pre-designed tiny homes available for order.', span: 'md:col-span-8' },
        { name: 'Floor Plans', href: '/resources/plans', icon: LayoutGrid, description: 'Download detailed architectural plans.', span: 'md:col-span-4' },
        { name: 'Find Builders', href: '/resources/find-builders', icon: Users, description: 'Locate certified tiny home builders and contractors.', span: 'md:col-span-4' },
        { name: 'Project Gallery', href: '/resources/gallery', icon: Camera, description: 'Get inspired by our collection of finished customer projects.', span: 'md:col-span-8' },
        { name: 'Blog & News', href: '/resources/blog', icon: FileText, description: 'Latest tips, trends, and guides on sustainable living.', span: 'md:col-span-6' },
        { name: 'Events Calendar', href: '/resources/event', icon: Calendar, description: 'Stay updated on workshops, open houses, and community meets.', span: 'md:col-span-6' },
    ]

    const filteredResources = resources.filter(res =>
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 text-gray-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Cinematic Background Gradients - Warm & Welcoming */}
                <div className="absolute top-0 left-0 w-full h-full bg-white/50 z-0"></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md text-sm font-medium mb-8 text-gray-600">
                            <BookOpen className="w-4 h-4 text-gray-900" />
                            Knowledge Base
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">
                            Resource Center
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your complete knowledge base for the tiny home lifestyle. From inspiration to technical plans, we have it all.
                        </p>

                        {/* Search Interaction */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl opacity-50 group-hover:opacity-100 blur transition duration-500"></div>
                            <div className="relative flex items-center bg-white border border-gray-200 rounded-xl p-2 shadow-xl">
                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for plans, guides, or topics..."
                                    className="w-full bg-transparent border-none text-gray-900 placeholder-gray-400 focus:ring-0 px-4 py-3"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-2 hover:bg-gray-100 rounded-lg mr-2 text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Layout */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                {filteredResources.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500">We couldn't find anything matching "{searchQuery}"</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-6 font-bold text-blue-600 hover:text-blue-700"
                        >
                            Clear all filters
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {filteredResources.map((item, idx) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className={`${item.span} group relative bg-white border border-gray-100 rounded-3xl p-8 hover:bg-gray-900 transition-all duration-500 overflow-hidden min-h-[260px] flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2`}
                            >
                                {/* Decorative Background Icon - Appears Gray on Hover */}
                                <item.icon className="absolute -bottom-12 -right-12 w-48 h-48 text-gray-50 group-hover:text-gray-800 transition-all duration-500 opacity-50 group-hover:opacity-100 pointer-events-none rotate-12" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-white/10 rounded-xl flex items-center justify-center mb-6 text-gray-900 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">{item.name}</h3>
                                    <p className="text-gray-500 group-hover:text-gray-400 text-sm leading-relaxed max-w-sm transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="relative z-10 pt-6">
                                    <Link href={item.href} className="inline-flex items-center text-sm font-bold text-gray-900/70 group-hover:text-white transition-all duration-300 group-hover:translate-x-2">
                                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}
