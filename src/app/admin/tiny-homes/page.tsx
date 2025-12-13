'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Home } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

type TinyHome = {
    _id: string
    name: string
    price: string
    status: string
    createdAt: string
}

export default function AdminTinyHomesPage() {
    const { token } = useAuth()
    const [homes, setHomes] = useState<TinyHome[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const res = await fetch('/api/tiny-homes')
                const data = await res.json()
                if (Array.isArray(data)) {
                    setHomes(data)
                } else {
                    setHomes([])
                }
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchHomes()
    }, [])

    // Todo: Add Create/Edit functionality (Not requested yet, but groundwork laid)

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tiny Homes</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add New Model
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Model Name</th>
                            <th className="p-4 font-semibold text-gray-600">Price</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homes.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No tiny homes found.
                                </td>
                            </tr>
                        ) : (
                            homes.map(home => (
                                <tr key={home._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                            <Home className="w-4 h-4 text-gray-500" />
                                        </div>
                                        {home.name}
                                    </td>
                                    <td className="p-4 text-gray-600">{home.price}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${home.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {home.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
