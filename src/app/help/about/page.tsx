'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Globe, ShieldCheck, Leaf, ArrowRight } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-16 bg-gray-950 text-white">
            {/* Hero */}
            <section className="relative h-[80vh] flex items-center justify-center px-4 overflow-hidden">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&h=1080&fit=crop"
                        alt="Forest Tiny Home"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Our Philosophy</span>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight">
                            Live Small.<br /><span className="text-gray-400">Dream Infinite.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            We are challenging the status quo of housing. CalmiCasa is a rebellion against excess, designed for those who seek freedom.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Story - Asymmetrical Layout */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            Not just a builder. A movement.
                        </h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Founded in 2020, CalmiCasa emerged from a simple observation: modern housing was failing us. It was too expensive, too wasteful, and too confining.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Our founders, architects with a passion for minimalism, set out to prove that you don't need a mansion to live luxuriously. By combining cutting-edge sustainable materials with smart, modular design, we created homes that are not only affordable but aspirational.
                        </p>

                        <div className="flex gap-12 pt-8">
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">500+</div>
                                <div className="text-gray-500 uppercase tracking-wider text-sm">Homes Built</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">50 States</div>
                                <div className="text-gray-500 uppercase tracking-wider text-sm">Delivered To</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-white mb-2">0%</div>
                                <div className="text-gray-500 uppercase tracking-wider text-sm">Carbon Footprint</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1000&fit=crop"
                            alt="Interior Design"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <p className="text-white font-bold text-lg">Designed in Portland, OR</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values - Dark Cards */}
            <section className="py-32 bg-gray-900 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h2 className="text-4xl font-bold text-white mb-6">Built on Principles</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Every CalmiCasa home is a testament to our core beliefs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: 'Planet First', desc: 'We minimize waste and maximize efficiency. Solar-ready standard.' },
                            { icon: ShieldCheck, title: 'Safety Guaranteed', desc: 'NOAH Certified builds that exceed national building codes.' },
                            { icon: Heart, title: 'Human Centric', desc: 'Designed for how people actually live, with warmth and ergonomics.' },
                            { icon: Globe, title: 'Accessible', desc: 'Democratizing high design for everyone, everywhere.' }
                        ].map((item, idx) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -10 }}
                                className="bg-black/40 border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group"
                            >
                                <item.icon className="w-10 h-10 text-gray-500 group-hover:text-blue-400 mb-6 transition-colors" />
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team CTA */}
            <section className="py-32 px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-10">
                    Ready to verify our quality?
                </h2>
                <Link href="/resources/tiny-homes" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                    Browse Our Models <ArrowRight className="w-5 h-5" />
                </Link>
            </section>
        </div>
    )
}
