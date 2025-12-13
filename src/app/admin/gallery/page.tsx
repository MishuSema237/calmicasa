'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Plus, Trash2, Loader2, Image as ImageIcon, Copy } from 'lucide-react'
import Image from 'next/image'

type GalleryItem = {
    _id: string
    src: string
    category: string
    createdAt: string
}

export default function AdminGalleryPage() {
    const { token } = useAuth()
    const [images, setImages] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [newImage, setNewImage] = useState({ src: '', category: 'Exterior' })

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/gallery')
            const data = await res.json()
            if (Array.isArray(data)) {
                setImages(data)
            } else {
                console.error("Expected array but got:", data)
                setImages([])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newImage.src) return

        try {
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newImage)
            })
            if (res.ok) {
                setNewImage({ src: '', category: 'Exterior' })
                fetchImages()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this image?')) return
        try {
            const res = await fetch(`/api/gallery?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setImages(images.filter(i => i._id !== id))
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Gallery Management</h1>

            {/* Add New */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h2 className="font-bold text-lg mb-4">Add New Image</h2>
                <form onSubmit={handleAdd} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            value={newImage.src}
                            onChange={e => setNewImage({ ...newImage, src: e.target.value })}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="w-48">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            value={newImage.category}
                            onChange={e => setNewImage({ ...newImage, category: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-white"
                        >
                            <option>Exterior</option>
                            <option>Interior</option>
                            <option>Kitchen</option>
                            <option>Design</option>
                        </select>
                    </div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </form>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map(img => (
                        <div key={img._id} className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square border border-gray-200">
                            <Image
                                src={img.src}
                                alt="Gallery"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <span className="text-white text-xs font-bold px-2 py-1 bg-white/20 rounded-full backdrop-blur">
                                    {img.category}
                                </span>
                                <button
                                    onClick={() => handleDelete(img._id)}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
