'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: '10 Space-Saving Hacks for Tiny Kitchens',
            excerpt: 'Maximize your culinary space with these clever storage solutions and organizational tips used by pro chefs.',
            image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&h=500&fit=crop',
            date: 'Oct 12, 2023',
            author: 'Sarah Jenkins',
            category: 'Design'
        },
        {
            id: 2,
            title: 'The Real Cost of Going Tiny: A Breakdown',
            excerpt: 'We analyze the full financial picture of building, permitting, and maintaining a tiny home versus a traditional mortgage.',
            image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&h=500&fit=crop',
            date: 'Oct 08, 2023',
            author: 'Michael Ross',
            category: 'Finance'
        },
        {
            id: 3,
            title: 'Legality Guide: Where Can You Park?',
            excerpt: 'Navigating the complex world of zoning laws, ADU regulations, and RV parks across different states.',
            image: 'https://images.unsplash.com/photo-1469598614039-cc70dfee9233?w=800&h=500&fit=crop',
            date: 'Oct 01, 2023',
            author: 'Elena Rodriguez',
            category: 'Legal'
        },
        {
            id: 4,
            title: 'Off-Grid Living: Essentials for Beginners',
            excerpt: 'Everything you need to know about solar power, composting toilets, and rainwater harvesting systems.',
            image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&h=500&fit=crop',
            date: 'Sept 28, 2023',
            author: 'David Chen',
            category: 'Lifestyle'
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-white py-20 px-4 border-b">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-4">The Tiny Blog</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Latest Stories & Guides</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Deep dives into construction, design, and the philosophy of simple living.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full py-3 px-6 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Post (First one) */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
                >
                    <div className="relative h-64 lg:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={posts[0].image}
                            alt={posts[0].title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                            Featured
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="text-blue-600 font-bold">{posts[0].category}</span>
                            <span>•</span>
                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {posts[0].date}</div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer">
                            {posts[0].title}
                        </h2>
                        <p className="text-xl text-gray-600 mb-6">
                            {posts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-900">{posts[0].author}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    <span className="text-blue-600 font-bold">{post.category}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <Link href={`/resources/blog/${post.id}`} className="inline-flex items-center text-blue-600 font-semibold text-sm hover:underline">
                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
