'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, Video, ArrowRight, UserCheck, ShieldCheck, DollarSign } from 'lucide-react'

export default function ConsultingPage() {
    const experts = [
        {
            name: 'Sarah Jenkins',
            role: 'Tiny Home Architect',
            specialty: 'Space Optimization',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
            rate: '$150/hr'
        },
        {
            name: 'Michael Ross',
            role: 'Construction Manager',
            specialty: 'Off-grid Systems',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
            rate: '$120/hr'
        },
        {
            name: 'Elena Rodriguez',
            role: 'Legal Consultant',
            specialty: 'Zoning & Permits',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
            rate: '$180/hr'
        }
    ]

    return (
        <div className="min-h-screen pt-16">
            {/* Hero */}
            <section className="bg-green-50 py-20 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="inline-block px-4 py-1 bg-green-200 text-green-800 rounded-full text-sm font-semibold mb-6">Expert Guidance</div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Avoid costly mistakes with <span className="text-green-600">Professional Advice</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Connect with vetted industry experts who can help you navigate zoning laws, optimize your floor plan, and choose the right materials.
                            </p>
                            <button className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                                Book a Free Discovery Call
                            </button>
                        </motion.div>
                    </div>
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-green-200 rounded-full opacity-30 blur-3xl"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
                                alt="Consulting Session"
                                width={600}
                                height={400}
                                className="rounded-2xl shadow-xl relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 bg-white px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: Calendar, title: '1. Choose a Time', desc: 'Browse expert schedules and find a slot that works for you.' },
                            { icon: Video, title: '2. Meet Virtually', desc: 'Connect via high-quality video call from the comfort of your home.' },
                            { icon: ShieldCheck, title: '3. Get Actionable Plan', desc: 'Receive a recording and summary of next steps after your call.' }
                        ].map((step, idx) => (
                            <div key={idx} className="p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <step.icon className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experts Section */}
            <section className="py-20 bg-gray-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Experts</h2>
                            <p className="text-gray-600">Top-rated consultants available this week</p>
                        </div>
                        <Link href="/resources/find-builders" className="text-green-600 font-semibold hover:underline hidden md:block">
                            View all experts &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {experts.map((expert, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <Image
                                        src={expert.image}
                                        alt={expert.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{expert.name}</h3>
                                        <p className="text-sm text-green-600 font-medium">{expert.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Specialty</span>
                                        <span className="font-medium text-gray-900">{expert.specialty}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Rate</span>
                                        <span className="font-medium text-gray-900">{expert.rate}</span>
                                    </div>
                                </div>

                                <button className="w-full py-2 border border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                    View Profile
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
