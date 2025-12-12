'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Loader2, Mail, User, Clock, MessageSquare, AlertCircle } from 'lucide-react'

type ContactMessage = {
    _id: string
    name: string
    email: string
    subject: string
    message: string
    createdAt: string
    read: boolean
}

export default function AdminContactsPage() {
    const { token } = useAuth()
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setMessages(data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) fetchMessages()
    }, [token])

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Inbox / Messages</h1>

            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg uppercase">
                                    {msg.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{msg.subject}</h3>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <span className="font-medium text-gray-700">{msg.name}</span>
                                        <span>&lt;{msg.email}&gt;</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center text-xs text-gray-400">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(msg.createdAt).toLocaleString()}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg text-gray-700 text-sm leading-relaxed border border-gray-100">
                            {msg.message}
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <a
                                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" /> Reply via Email
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {messages.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>No messages yet.</p>
                </div>
            )}
        </div>
    )
}
