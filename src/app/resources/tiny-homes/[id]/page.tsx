'use client'

import { useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Check, Lock, CreditCard, Star, MapPin, Ruler, Bed, Bath } from 'lucide-react'
import { useForm } from 'react-hook-form'

// Mock Data (In a real app, you'd fetch this from your API based on the ID)
const tinyHomesData = [
    {
        id: 'eco-denizen',
        name: 'The Eco Denizen',
        price: '$90,000',
        description: 'Packs luxury, style, and sophistication into just 320 square feet. Perfect for those who want to live lightly on the land without sacrificing comfort.',
        features: ['Solar Ready', 'Composting Toilet', 'Loft Bedroom', 'Full Kitchen'],
        specs: { sqft: 320, beds: 1, baths: 1 },
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop'
    },
    {
        id: 'calmicasa-classic',
        name: 'The CalmiCasa Classic',
        price: '$186,000',
        description: 'Our flagship model featuring a master on the main floor with sliding glass doors that open up to nature. A true masterpiece of modern design.',
        features: ['Main Floor Bedroom', 'Wrap-around Deck', 'Smart Home Integration', 'Luxury Bath'],
        specs: { sqft: 450, beds: 1, baths: 1 },
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop'
    },
    {
        id: 'luna-retreat',
        name: 'The Luna Retreat',
        price: '$105,000',
        description: 'Budget-conscious, high design tiny house with floor-to-ceiling glass. Designed for dreamers and star-gazers.',
        features: ['Skylights', 'Convertible Spaces', 'Off-grid Capable', 'Modern Finishes'],
        specs: { sqft: 280, beds: 2, baths: 1 },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop'
    }
]

type OrderForm = {
    name: string
    email: string
    phone: string
    address: string
    paymentMethod: string
    message: string
}

export default function TinyHomeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrapping params: React Router in Next.js 15+ async params
    const { id } = use(params)

    // Find the home based on ID or default to first if not found (or show 404 in real app)
    const home = tinyHomesData.find(h => h.id === id) || tinyHomesData[0]

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OrderForm>()

    const onSubmit = async (data: OrderForm) => {
        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modelName: home.name,
                    price: home.price,
                    form: data
                })
            })

            if (res.ok) {
                setIsSuccess(true)
            } else {
                alert('Something went wrong. Please try again.')
            }
        } catch (error) {
            console.error(error)
            alert('Error submitting form')
        }
    }

    if (!home) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Image */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={home.image}
                    alt={home.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                    <Link href="/resources/tiny-homes" className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full font-bold hover:bg-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Models
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{home.name}</h1>
                            <div className="flex items-center gap-4 text-gray-500 mb-6">
                                <span className="flex items-center gap-1"><Ruler className="w-4 h-4" /> {home.specs.sqft} sqft</span>
                                <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {home.specs.beds} Bed</span>
                                <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {home.specs.baths} Bath</span>
                            </div>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {home.description}
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {home.features.map(feat => (
                                    <div key={feat} className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {feat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Order Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white border border-gray-200 shadow-xl rounded-2xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-500">Starting at</span>
                                <span className="text-3xl font-bold text-blue-600">{home.price}</span>
                            </div>

                            <hr className="border-gray-100 mb-6" />

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500" /> Transparent Pricing
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500" /> Financing Options
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Check className="w-4 h-4 text-green-500" /> Nationwide Shipping
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOrderModalOpen(true)}
                                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-5 h-5" />
                                Order Now
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                No payment required today. Submit an inquiry to start the process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            <AnimatePresence>
                {isOrderModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOrderModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-bold">Complete Your Order</h3>
                                <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {isSuccess ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Check className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Order Received!</h3>
                                        <p className="text-gray-600 mb-6">
                                            We've sent a receipt to your email. Our team will contact you shortly to finalize details.
                                        </p>
                                        <button
                                            onClick={() => { setIsSuccess(false); setIsOrderModalOpen(false) }}
                                            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold"
                                        >
                                            Close
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name</label>
                                            <input {...register('name', { required: true })} className="w-full p-2 border rounded-lg" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Email</label>
                                                <input {...register('email', { required: true })} type="email" className="w-full p-2 border rounded-lg" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Phone</label>
                                                <input {...register('phone', { required: true })} type="tel" className="w-full p-2 border rounded-lg" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Shipping Address</label>
                                            <input {...register('address', { required: true })} className="w-full p-2 border rounded-lg" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Preferred Payment Method</label>
                                            <select {...register('paymentMethod')} className="w-full p-2 border rounded-lg bg-white">
                                                <option value="Bank Transfer">Bank Transfer / Wire</option>
                                                <option value="Crypto">Cryptocurrency (BTC/ETH)</option>
                                                <option value="Financing">Apply for Financing</option>
                                                <option value="Credit Card">Credit Card (3% fee)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Special Requests</label>
                                            <textarea {...register('message')} className="w-full p-2 border rounded-lg" rows={3}></textarea>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                disabled={isSubmitting}
                                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                            >
                                                {isSubmitting ? 'Processing...' : `Place Order • ${home.price}`}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
