'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

type FormData = {
    name: string
    email: string
    subject: string
    message: string
}

export default function ContactPage() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const onSubmit = async (data: FormData) => {
        setStatus('loading')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                setStatus('success')
                reset()
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div className="min-h-screen pt-16 bg-white">
            <section className="bg-gray-900 text-white py-20 px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Have a question about a model? Want to start a custom build? We'd love to hear from you.
                    </p>
                </motion.div>
            </section>

            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-gray-500 text-sm">Mon-Fri 9am-6pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <p className="text-gray-600">hello@calmicasa.com</p>
                                    <p className="text-gray-600">support@calmicasa.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Headquarters</h3>
                                    <p className="text-gray-600">123 Tiny Home Lane</p>
                                    <p className="text-gray-600">Portland, OR 97204</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-lg mb-4">Visit our Showroom</h3>
                            <p className="text-gray-600 mb-6">
                                Come see our models in person. Book a tour to walk through The Classic and The Eco Denizen.
                            </p>
                            <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition-colors w-full sm:w-auto">
                                Book a Tour
                            </button>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                            >
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">
                                    Thanks for reaching out. We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => { setStatus('idle'); reset(); }}
                                    className="text-green-700 font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="Your name"
                                    />
                                    {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input
                                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                        type="email"
                                        className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-sm mt-1">Valid email is required</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                                    <select
                                        {...register('subject', { required: true })}
                                        className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="Model Inquiry">Scientific Model Inquiry</option>
                                        <option value="Custom Build">Custom Build Request</option>
                                        <option value="Financing">Financing Question</option>
                                        <option value="Support">Support / Warranty</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.subject && <span className="text-red-500 text-sm mt-1">Please select a subject</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                    <textarea
                                        {...register('message', { required: true })}
                                        rows={5}
                                        className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                    {errors.message && <span className="text-red-500 text-sm mt-1">Message is required</span>}
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                                        <AlertCircle className="w-5 h-5" />
                                        <span>Something went wrong. Please try again.</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? 'Sending...' : (
                                        <>Send Message <Send className="w-4 h-4" /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
