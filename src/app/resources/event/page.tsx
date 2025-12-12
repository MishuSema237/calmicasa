'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function EventsPage() {
    const events = [
        {
            title: 'Tiny Home Festival 2025',
            date: 'Aug 15-17, 2025',
            time: '10:00 AM - 6:00 PM',
            location: 'Austin Convention Center, TX',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
            description: 'The largest gathering of tiny home enthusiasts in the country. Tour 50+ models.',
            price: '$25'
        },
        {
            title: 'Open House: Mountain Retreat',
            date: 'Sept 05, 2025',
            time: '1:00 PM - 4:00 PM',
            location: 'Boulder, CO',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop',
            description: 'Exclusive tour of our newest luxury off-grid model located in the Rockies.',
            price: 'Free'
        },
        {
            title: 'Sustainable Living Expo',
            date: 'Oct 12, 2025',
            time: '9:00 AM - 5:00 PM',
            location: 'Portland, OR',
            image: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?w=800&h=500&fit=crop',
            description: 'Workshops on solar, permaculture, and minimalism.',
            price: '$15'
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-indigo-900 text-white py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-block px-3 py-1 bg-indigo-800 rounded-full text-sm font-semibold mb-4 mx-auto">
                            Community Gatherings
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Events</h1>
                        <p className="text-xl text-indigo-200 mb-8">
                            Connect with the community in person. Tours, festivals, and workshops happening near you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events List */}
            <section className="py-20 px-4 max-w-5xl mx-auto">
                <div className="space-y-6">
                    {events.map((event, idx) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow group"
                        >
                            <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-sm font-bold text-gray-900 shadow-sm md:hidden">
                                    {event.date}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                                    <span className="hidden md:block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold text-sm">
                                        {event.price}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                        <span className="font-semibold">{event.date}</span>
                                        <span className="mx-2">•</span>
                                        <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                                        {event.location}
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 flex-1">{event.description}</p>

                                <div className="flex justify-between items-center">
                                    <span className="md:hidden font-bold text-indigo-600">{event.price}</span>
                                    <button className="flex items-center text-indigo-600 font-bold hover:gap-2 transition-all">
                                        Get Tickets <ArrowRight className="w-4 h-4 ml-1" />
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
