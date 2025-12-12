'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Star, Phone, Globe, CheckCircle } from 'lucide-react'

export default function FindBuildersPage() {
    const builders = [
        {
            name: 'Tiny Craft Co.',
            location: 'Portland, OR',
            rating: 4.9,
            projects: 45,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            tags: ['Custom', 'Off-grid', 'Certified'],
            description: 'Specializing in sustainable, off-grid tiny homes with a focus on reclaimed materials.'
        },
        {
            name: 'Modern Micro Living',
            location: 'Austin, TX',
            rating: 4.8,
            projects: 112,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
            tags: ['Steel Frame', 'Luxury', 'Fast Delivery'],
            description: 'High-end modern tiny homes built with steel framing for maximum durability.'
        },
        {
            name: 'Nomad Builds',
            location: 'Denver, CO',
            rating: 5.0,
            projects: 28,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
            tags: ['Wood', 'Rustic', 'Budget Friendly'],
            description: 'Affordable, rustic mobile cabins perfect for the adventurous soul.'
        },
        {
            name: 'EcoPod Systems',
            location: 'Seattle, WA',
            rating: 4.7,
            projects: 89,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
            tags: ['Modular', 'Prefab', 'Green Certified'],
            description: 'Prefabricated modular units that can be assembled on-site in less than 2 days.'
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-white py-16 px-4 border-b">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Find a Certified Builder</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Connect with trusted professionals who can bring your tiny home vision to life. All builders in our directory are verified and reviewed.
                        </p>

                        {/* Search Inputs */}
                        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                            <input
                                type="text"
                                placeholder="Location (e.g. Texas)"
                                className="flex-1 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <select className="p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                                <option>All Builder Types</option>
                                <option>Custom Builders</option>
                                <option>Prefab/Modular</option>
                                <option>DIY Support</option>
                            </select>
                            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {builders.map((builder, idx) => (
                        <motion.div
                            key={builder.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col sm:flex-row gap-6"
                        >
                            <div className="flex-shrink-0">
                                <Image
                                    src={builder.image}
                                    alt={builder.name}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{builder.name}</h3>
                                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm text-yellow-700 font-bold">
                                        <Star className="w-4 h-4 mr-1 fill-yellow-500 text-yellow-500" />
                                        {builder.rating}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {builder.location} • {builder.projects} Projects Completed
                                </div>

                                <p className="text-gray-600 mb-4 text-sm">{builder.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {builder.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                        Contact
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
                                        View Portfolio
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}
