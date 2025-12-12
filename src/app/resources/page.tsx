'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Home, BookOpen, Users, Camera, FileText, Calendar, ArrowRight, LayoutGrid } from 'lucide-react'

export default function ResourcesPage() {
    const resources = [
        { name: 'Tiny Home Models', href: '/resources/tiny-homes', icon: Home, description: 'Explore our catalog of pre-designed tiny homes available for order.', span: 'md:col-span-8' },
        { name: 'Floor Plans', href: '/resources/plans', icon: LayoutGrid, description: 'Download detailed architectural plans.', span: 'md:col-span-4' },
        { name: 'Find Builders', href: '/resources/find-builders', icon: Users, description: 'Locate certified tiny home builders and contractors.', span: 'md:col-span-4' },
        { name: 'Project Gallery', href: '/resources/gallery', icon: Camera, description: 'Get inspired by our collection of finished customer projects.', span: 'md:col-span-8' },
        { name: 'Blog & News', href: '/resources/blog', icon: FileText, description: 'Latest tips, trends, and guides on sustainable living.', span: 'md:col-span-6' },
        { name: 'Events Calendar', href: '/resources/event', icon: Calendar, description: 'Stay updated on workshops, open houses, and community meets.', span: 'md:col-span-6' },
    ]

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Cinematic Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black z-0"></div>
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-900/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium mb-8 text-gray-300">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            Knowledge Base
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                            Resource Center
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your complete knowledge base for the tiny home lifestyle. From inspiration to technical plans, we have it all.
                        </p>

                        {/* Search Interaction */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl opacity-30 group-hover:opacity-50 blur transition duration-500"></div>
                            <div className="relative flex items-center bg-gray-900 border border-gray-800 rounded-xl p-2 shadow-2xl">
                                <Search className="w-5 h-5 text-gray-500 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search for plans, guides, or topics..."
                                    className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Layout */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {resources.map((item, idx) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className={`${item.span} group relative bg-gray-900 border border-white/5 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300 overflow-hidden min-h-[260px] flex flex-col justify-between`}
                        >
                            {/* Decorative Icon Blob */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                                    {item.description}
                                </p>
                            </div>

                            <div className="relative z-10 pt-6">
                                <Link href={item.href} className="inline-flex items-center text-sm font-bold text-white/70 hover:text-white transition-colors group-hover:translate-x-2 duration-300">
                                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
