'use client'

import { motion } from 'framer-motion'
import { Rocket, PenTool, Layout, Globe } from 'lucide-react'

export default function FuturePage() {
    const roadmap = [
        {
            quarter: 'Q4 2025',
            title: 'AR Home Preview',
            description: 'View life-size tiny home models in your own backyard using Augmented Reality.',
            icon: Rocket
        },
        {
            quarter: 'Q1 2026',
            title: 'Community Land Trust',
            description: 'Launching our first co-owned land project for tiny home parking in the Pacific Northwest.',
            icon: Globe
        },
        {
            quarter: 'Q2 2026',
            title: 'AI Design Assistant',
            description: 'Generative AI tools to instantly create floor plans based on your lifestyle needs.',
            icon: PenTool
        },
        {
            quarter: 'Q3 2026',
            title: 'Smart Home Hub',
            description: 'Integrated app to monitor your tiny home\'s energy, water, and security systems remotely.',
            icon: Layout
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-900 text-white">
            <section className="py-20 px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        The Future of Living
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We're not just building homes; we're building the future of sustainable, flexible housing. Here is what's on our horizon.
                    </p>
                </motion.div>
            </section>

            <section className="py-20 px-4 max-w-5xl mx-auto relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 hidden md:block"></div>

                <div className="space-y-12">
                    {roadmap.map((item, idx) => {
                        const isEven = idx % 2 === 0
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full"></div>

                                {/* Icon Dot */}
                                <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-purple-500 flex items-center justify-center z-10 shrink-0">
                                    <Icon className="w-6 h-6 text-purple-500" />
                                </div>

                                <div className="flex-1 w-full">
                                    <div className={`p-6 rounded-2xl bg-gray-800 border border-gray-700 hover:border-purple-500 transition-colors ${isEven ? 'text-right' : 'text-left'}`}>
                                        <div className="text-purple-400 font-bold mb-2">{item.quarter}</div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}
