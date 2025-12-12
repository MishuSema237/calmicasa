'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Users, Video } from 'lucide-react'

export default function OnlineEventsPage() {
    const events = [
        {
            id: 1,
            title: 'Tiny Home Design Masterclass',
            category: 'Workshop',
            date: 'Oct 15, 2025',
            time: '2:00 PM EST',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
            description: 'Learn the fundamentals of designing efficient, beautiful tiny home spaces from award-winning architects.',
            attendees: 142
        },
        {
            id: 2,
            title: 'Sustainable Materials Webinar',
            category: 'Webinar',
            date: 'Oct 22, 2025',
            time: '1:00 PM EST',
            image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=500&fit=crop',
            description: 'Discover the best eco-friendly materials for your build that save money and the planet.',
            attendees: 89
        },
        {
            id: 3,
            title: 'Weekly Community Q&A',
            category: 'Q&A',
            date: 'Every Friday',
            time: '3:00 PM EST',
            image: 'https://images.unsplash.com/photo-1515169067750-d51a73e3c86d?w=800&h=500&fit=crop',
            description: 'Open floor session to ask our experts anything about tiny home living, building, or legality.',
            attendees: 300
        }
    ]

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Online Events</h1>
                        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
                            Join our virtual gatherings to learn, connect, and get inspired from anywhere in the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events List */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
                        >
                            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-purple-700 font-bold px-3 py-1 rounded-full text-sm">
                                    {event.category}
                                </div>
                            </div>

                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center">
                                        <Video className="w-4 h-4 mr-1" />
                                        Live Stream
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                                <p className="text-gray-600 mb-6">{event.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center text-gray-500">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>{event.attendees} attending</span>
                                    </div>
                                    <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                                        Register
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
