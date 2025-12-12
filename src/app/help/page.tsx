'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HelpCircle, Mail, FileQuestion, Rocket, Info, MessageSquare, ArrowRight, Search, ChevronRight } from 'lucide-react'

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white selection:bg-blue-500 selection:text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Abstract Backgrounds */}
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            Support Center
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500">
                            How can we assist you?
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Browse our guides, check the roadmap, or get in touch with our expert team. We are here to make your tiny living journey smooth.
                        </p>

                        {/* Search Bar Visual */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-50 blur group-hover:opacity-75 transition duration-1000"></div>
                            <div className="relative flex items-center bg-gray-900 rounded-xl p-2">
                                <Search className="w-6 h-6 text-gray-500 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Type your question here (e.g. 'Permits', 'Financing')..."
                                    className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 px-4 py-3 text-lg"
                                />
                                <button className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Grid Navigation */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">

                    {/* Contact Card - Large */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 group relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 overflow-hidden shadow-2xl transition-transform hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                            <Mail className="w-64 h-64 rotate-12 translate-x-12 -translate-y-12" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Contact Support</h3>
                                <p className="text-blue-100 max-w-md text-lg">
                                    Need personalized help? Our team is ready to answer your questions about models, pricing, and custom builds.
                                </p>
                            </div>
                            <Link href="/help/contact" className="inline-flex items-center gap-2 text-white font-bold text-lg group-hover:gap-4 transition-all">
                                Get in Touch <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* FAQs Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="group relative bg-gray-800 rounded-3xl p-8 overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-400">
                                    <FileQuestion className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">FAQs</h3>
                                <p className="text-gray-400">
                                    Quick answers to the most common questions.
                                </p>
                            </div>
                            <Link href="/help/faqs" className="flex items-center justify-between bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors mt-8">
                                <span className="font-semibold">View Questions</span>
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Roadmap Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="group relative bg-gray-800 rounded-3xl p-8 overflow-hidden border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent"></div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Future Roadmap</h3>
                                <p className="text-gray-400">
                                    See what's next for CalmiCasa.
                                </p>
                            </div>
                            <Link href="/help/future" className="flex items-center justify-between bg-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors mt-8">
                                <span className="font-semibold">See Timeline</span>
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* About Us - Image Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 group relative rounded-3xl overflow-hidden min-h-[300px]"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&h=600&fit=crop"
                            alt="Our Team"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                    <Info className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold">About Us</h3>
                            </div>
                            <p className="text-gray-200 max-w-lg text-lg mb-6">
                                We believe in building more than just homes. We build freedom, sustainability, and community. Learn about our story.
                            </p>
                            <Link href="/help/about" className="text-white font-bold hover:underline flex items-center gap-2 w-fit">
                                Read Our Story <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Instant Help CTA */}
            <section className="py-20 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-6">Still can't find what you're looking for?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                            Chat with Sales
                        </button>
                        <button className="px-8 py-3 bg-transparent border border-gray-600 text-white rounded-lg font-bold hover:border-white transition-colors">
                            Email Support
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
