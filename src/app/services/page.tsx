'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Calendar, Palette, MessageCircle, ShoppingBag, ArrowRight, Star } from 'lucide-react'

export default function ServicesPage() {
    const services = [
        {
            title: 'Community Access',
            description: 'Join our vibrant community of tiny home enthusiasts. Share experiences, get advice, and make lifelong friends.',
            icon: Users,
            href: '/services/community',
            color: 'bg-blue-100 text-blue-600',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=500&fit=crop'
        },
        {
            title: 'Premium Membership',
            description: 'Unlock exclusive content, early access to designs, and special discounts on products and consulting.',
            icon: Star,
            href: '/services/membership',
            color: 'bg-yellow-100 text-yellow-600',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=500&fit=crop'
        },
        {
            title: 'Online Events',
            description: 'Participate in virtual workshops, webinars, and Q&A sessions with industry experts.',
            icon: Calendar,
            href: '/services/online-event',
            color: 'bg-purple-100 text-purple-600',
            image: 'https://images.unsplash.com/photo-1543353071-087f9daac2bf?w=800&h=500&fit=crop'
        },
        {
            title: '3D Home Designer',
            description: 'Work with our expert designers to create the perfect 3D model of your dream tiny home.',
            icon: Palette,
            href: '/services/3d-designer',
            color: 'bg-pink-100 text-pink-600',
            image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop'
        },
        {
            title: 'Expert Consulting',
            description: 'One-on-one sessions with tiny home builders and legal experts to guide your journey.',
            icon: MessageCircle,
            href: '/services/consulting',
            color: 'bg-green-100 text-green-600',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop'
        },
        {
            title: 'Tiny Home Shop',
            description: 'Browse our curated collection of furniture, appliances, and accessories designed for compact living.',
            icon: ShoppingBag,
            href: '/services/shop',
            color: 'bg-orange-100 text-orange-600',
            image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&h=500&fit=crop'
        }
    ]

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <Image
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop"
                        alt="Services Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                            Everything you need to plan, build, and live your tiny home dream.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className={`p-3 rounded-xl ${service.color}`}>
                                            <service.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.href}
                                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                                    >
                                        Learn More
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Need Custom Solutions?</h2>
                            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                We understand that every tiny home journey is unique. Contact us to discuss your specific requirements.
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link
                                    href="/help/contact"
                                    className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                                >
                                    Contact Us Today
                                </Link>
                            </motion.div>
                        </div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}
