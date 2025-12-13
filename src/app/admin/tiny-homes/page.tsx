'use client'

import { useState } from 'react'
import { Home, Plus, Edit, Trash2 } from 'lucide-react'

// Placeholder for now
const initialHomes = [
    { id: 1, name: 'The Nomad', price: '$45,000', status: 'Active' },
    { id: 2, name: 'EcoHaven', price: '$55,000', status: 'Active' },
    { id: 3, name: 'Urban Pod', price: '$35,000', status: 'Draft' },
]

export default function AdminTinyHomesPage() {
    const [homes, setHomes] = useState(initialHomes)

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
                        {homes.map(home => (
                            <tr key={home.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                <td className="p-4 font-medium text-gray-900">{home.name}</td>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
