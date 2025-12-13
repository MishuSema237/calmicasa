'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Loader2, Mail, Phone, Calendar, DollarSign, Package, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

type Order = {
    _id: string
    modelName: string
    price: string
    customerName: string
    email: string
    phone: string
    paymentMethod: string
    message: string
    status: string
    createdAt: string
}

export default function AdminOrdersPage() {
    const { token } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/order', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                const data = await res.json()
                if (Array.isArray(data)) {
                    setOrders(data)
                } else {
                    console.error('Expected array of orders', data)
                    setOrders([])
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (token) fetchOrders()
    }, [token])

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Inquiries</h1>

            {orders.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center border border-gray-100">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No orders found yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 border-b border-gray-50 pb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{order.modelName}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-full text-sm">
                                    {order.status || 'Pending'}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Customer</h4>
                                    <p className="font-bold text-gray-900">{order.customerName}</p>
                                    <a href={`mailto:${order.email}`} className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 mt-1">
                                        <Mail className="w-3 h-3" /> {order.email}
                                    </a>
                                    <a href={`tel:${order.phone}`} className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-2 mt-1">
                                        <Phone className="w-3 h-3" /> {order.phone}
                                    </a>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Order Details</h4>
                                    <p className="text-gray-900 flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        {order.price}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Method: {order.paymentMethod}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Message</h4>
                                    <p className="text-gray-600 text-sm italic bg-gray-50 p-3 rounded-lg">
                                        "{order.message || 'No additional message'}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
