'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Loader2, Image as ImageIcon, Upload, X, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

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
    const [uploading, setUploading] = useState(false)
    const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
    const [externalUrl, setExternalUrl] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Exterior')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/gallery')
            const data = await res.json()
            if (Array.isArray(data)) {
                setImages(data)
            } else {
                setImages([])
            }
        } catch (err) {
            console.error(err)
            toast.error('Failed to load gallery')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchImages()
    }, [])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            setSelectedFile(file)
            setUploadMode('file')
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUrlChange = (url: string) => {
        setExternalUrl(url)
        if (url.startsWith('http')) {
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }
    }

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()

        const toastId = toast.loading(uploadMode === 'file' ? 'Uploading image...' : 'Saving link...')
        setUploading(true)

        try {
            let finalSrc = ''

            if (uploadMode === 'file') {
                if (!selectedFile) {
                    toast.error('Please select a file', { id: toastId })
                    setUploading(false)
                    return
                }

                const formData = new FormData()
                formData.append('file', selectedFile)

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                })

                const uploadData = await uploadRes.json()
                if (!uploadData.success) throw new Error(uploadData.error || 'Upload failed')
                finalSrc = uploadData.url
            } else {
                if (!externalUrl) {
                    toast.error('Please enter a URL', { id: toastId })
                    setUploading(false)
                    return
                }
                finalSrc = externalUrl
            }

            // Save to Database
            const res = await fetch('/api/gallery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    src: finalSrc,
                    category: selectedCategory
                })
            })

            if (res.ok) {
                toast.success('Gallery updated!', { id: toastId })
                setSelectedFile(null)
                setExternalUrl('')
                setPreviewUrl(null)
                fetchImages()
            } else {
                throw new Error('Failed to save to gallery')
            }
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || 'Something went wrong', { id: toastId })
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string, src: string) => {
        if (!confirm('Are you sure you want to remove this image?')) return
        const toastId = toast.loading('Removing...')
        try {
            const res = await fetch(`/api/gallery?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setImages(images.filter(i => i._id !== id))
                toast.success('Image removed', { id: toastId })
            } else {
                toast.error('Failed to delete', { id: toastId })
            }
        } catch (err) {
            console.error(err)
            toast.error('Error deleting image', { id: toastId })
        }
    }

    return (
        <div className="p-6">
            <Toaster position="bottom-right" />

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
                    <p className="text-sm text-gray-500">Curate the visual experience of Calmicasa.</p>
                </div>
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-blue-600" /> Add to Collection
                        </h2>
                        <div className="flex gap-1 p-1 bg-gray-50 border border-gray-100 rounded-xl">
                            <button
                                type="button"
                                onClick={() => setUploadMode('file')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${uploadMode === 'file' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Device
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMode('url')}
                                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${uploadMode === 'url' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                URL
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Select Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                >
                                    <option>Exterior</option>
                                    <option>Interior</option>
                                    <option>Kitchen</option>
                                    <option>Design</option>
                                </select>
                            </div>

                            {uploadMode === 'file' ? (
                                <div className="relative group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Device Import</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="w-full p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl group-hover:border-blue-400 group-hover:bg-blue-50/30 transition-all flex items-center justify-center gap-3">
                                            <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                            <span className="text-gray-500 group-hover:text-blue-600 font-medium truncate max-w-[150px]">
                                                {selectedFile ? selectedFile.name : 'Choose from device'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">External URL</label>
                                    <input
                                        type="text"
                                        value={externalUrl}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={uploading || (uploadMode === 'file' ? !selectedFile : !externalUrl)}
                                className="px-8 py-4 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-all shadow-lg flex items-center gap-3"
                            >
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                {uploading ? 'Processing...' : 'Add to Collection'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                    {previewUrl ? (
                        <div className="w-full h-full relative group">
                            <img src={previewUrl} className="w-full h-full object-cover rounded-xl shadow-2xl" alt="Preview" />
                            <button
                                onClick={() => { setSelectedFile(null); setPreviewUrl(null) }}
                                className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="absolute inset-x-0 bottom-4 flex justify-center">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase text-gray-900 shadow-xl">
                                    Preview: {selectedCategory}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4 text-gray-400">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                <ImageIcon className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-sm font-medium tracking-tight">No image selected<br /><span className="text-xs opacity-60">Preview will appear here</span></p>
                        </div>
                    )}
                </div>
            </div>

            {/* Collection Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Current Collection ({images.length})</h2>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sort by Date</div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <Loader2 className="animate-spin text-gray-300" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium italic">Your gallery is empty. Start by uploading your first inspiration.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        <AnimatePresence>
                            {images.map((img, idx) => (
                                <motion.div
                                    key={img._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative group bg-white rounded-2xl overflow-hidden aspect-square border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                                >
                                    <Image
                                        src={img.src}
                                        alt="Gallery"
                                        fill
                                        className="object-cover transition-transform duration-[1s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-up from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-white text-[9px] font-black uppercase tracking-tighter bg-blue-600 px-2 py-0.5 rounded">
                                                {img.category}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(img._id, img.src)}
                                                className="p-2 bg-red-500/80 backdrop-blur text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}
