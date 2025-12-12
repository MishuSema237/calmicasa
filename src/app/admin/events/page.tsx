'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Plus, Trash2, Loader2, Calendar, MapPin, DollarSign, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'

type TinyEvent = {
    _id: string
    title: string
    date: string
    time: string
    location: string
    price: string
    description: string
    image: string
}

export default function AdminEventsPage() {
    const { token } = useAuth()
    const [events, setEvents] = useState<TinyEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const { register, handleSubmit, reset } = useForm<TinyEvent>()

    const fetchEvents = async () => {
        try {
            const res = await fetch('/api/events')
            const data = await res.json()
            setEvents(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return
        try {
            const res = await fetch(`/api/events?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setEvents(events.filter(e => e._id !== id))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const onSubmit = async (data: TinyEvent) => {
        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setIsCreating(false)
                reset()
                fetchEvents()
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> {isCreating ? 'Cancel' : 'New Event'}
                </button>
            </div>

            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="font-bold text-lg mb-4">Create New Event</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Event Title</label>
                                <input {...register('title', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date (e.g., Aug 15-17, 2025)</label>
                                <input {...register('date', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Time</label>
                                <input {...register('time', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Price</label>
                                <input {...register('price', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input {...register('location', { required: true })} className="w-full p-2 border rounded-lg" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input {...register('image')} className="w-full p-2 border rounded-lg" placeholder="https://..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea {...register('description', { required: true })} className="w-full p-2 border rounded-lg" rows={3} />
                        </div>

                        <div className="flex justify-end">
                            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold">
                                Publish Event
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {events.map(event => (
                    <div key={event._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                                <div className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-blue-500" /> {event.date}</div>
                                <div className="flex items-center"><Clock className="w-4 h-4 mr-1 text-blue-500" /> {event.time}</div>
                                <div className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-blue-500" /> {event.location}</div>
                                <div className="flex items-center font-bold text-green-600"><DollarSign className="w-4 h-4" /> {event.price}</div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(event._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {events.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>No events scheduled.</p>
                </div>
            )}
        </div>
    )
}
