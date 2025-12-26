'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Home, X, Save, MapPin, Ruler, Cpu, User, Image, Upload, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import toast, { Toaster } from 'react-hot-toast'

type TinyHome = {
    _id: string
    name: string
    price: string
    status: string
    createdAt: string

    // Detailed Fields
    description?: string
    location?: {
        city: string
        state: string
        country: string
    }
    specs?: {
        sqFt: string
        bedrooms: string
        bathrooms: string
        lofts: string
        length: string
        width: string
        height: string
    }
    features?: string[]
    utilities?: {
        heating: string
        water: string
        electric: string
    }
    agent?: {
        name: string
        contact: string
    }
    images?: string[]
}

export default function AdminTinyHomesPage() {
    const { token } = useAuth()
    const [homes, setHomes] = useState<TinyHome[]>([])
    const [searchQuery, setSearchQuery] = useState('')
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
                toast.error('Failed to load listings')
            } finally {
                setLoading(false)
            }
        }
        fetchHomes()
    }, [])

    const filteredHomes = homes.filter(home =>
        home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        home.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        home.location?.state?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // ... (rest of model state logic)

    // Add/Edit Model State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'basic' | 'specs' | 'features' | 'agent' | 'images'>('basic')

    // Pending Uploads State
    const [pendingFiles, setPendingFiles] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)

    // Initial Form State
    const initialFormState: Omit<TinyHome, '_id' | 'createdAt'> = {
        name: '',
        price: '',
        status: 'Active',
        description: '',
        location: { city: '', state: '', country: 'Canada' },
        specs: { sqFt: '', bedrooms: '1', bathrooms: '1', lofts: '0', length: '', width: '', height: '' },
        features: [],
        utilities: { heating: '', water: '', electric: '' },
        agent: { name: '', contact: '' },
        images: []
    }

    const [formData, setFormData] = useState(initialFormState)
    const [newFeature, setNewFeature] = useState('')

    const isFormValid = () => {
        const basicValid = formData.name && formData.price && formData.description
        const locationValid = formData.location?.city && formData.location?.state && formData.location?.country
        const specsValid = formData.specs?.sqFt && formData.specs?.length && formData.specs?.width && formData.specs?.height

        return basicValid && locationValid && specsValid
    }

    const resetForm = () => {
        setFormData(initialFormState)
        setEditMode(false)
        setEditingId(null)
        setActiveTab('basic')
        setPendingFiles([])
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (pendingFiles.length > 0) {
            toast.error('Please upload your pending images first!')
            return
        }

        setSubmitting(true)
        try {
            const url = editMode ? `/api/tiny-homes/${editingId}` : '/api/tiny-homes'
            const method = editMode ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                if (editMode) {
                    setHomes(prev => prev.map(h => h._id === editingId ? { ...h, ...formData } : h))
                } else {
                    const newHome = await res.json()
                    setHomes(prev => [...prev, { ...formData, _id: newHome.id, createdAt: new Date().toISOString() }])
                }
                setIsModalOpen(false)
                resetForm()
                toast.success(`Listing ${editMode ? 'updated' : 'created'} successfully!`)
            } else {
                toast.error(`Failed to ${editMode ? 'update' : 'create'} model`)
            }
        } catch (error) {
            console.error(error)
            toast.error(`Error ${editMode ? 'updating' : 'creating'} model`)
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = (home: TinyHome) => {
        setFormData({
            name: home.name || '',
            price: home.price || '',
            status: home.status || 'Active',
            description: home.description || '',
            location: { city: '', state: '', country: 'Canada', ...home.location },
            specs: { sqFt: '', bedrooms: '1', bathrooms: '1', lofts: '0', length: '', width: '', height: '', ...home.specs },
            features: home.features || [],
            utilities: { heating: '', water: '', electric: '', ...home.utilities },
            agent: { name: '', contact: '', ...home.agent },
            images: home.images || []
        })
        setEditMode(true)
        setEditingId(home._id)
        setIsModalOpen(true)
        setPendingFiles([])
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this model?')) return
        try {
            const res = await fetch(`/api/tiny-homes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                setHomes(prev => prev.filter(h => h._id !== id))
                toast.success('Listing deleted')
            } else {
                toast.error('Failed to delete model')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error deleting model')
        }
    }

    const addFeature = () => {
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...(prev.features || []), newFeature.trim()]
            }))
            setNewFeature('')
        }
    }

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: (prev.features || []).filter((_, i) => i !== index)
        }))
    }

    // New: Handle File Selection (No Upload Yet)
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const files = Array.from(e.target.files)
            setPendingFiles(prev => [...prev, ...files])
        }
    }

    // New: Handle Upload Action
    const handleUploadPendingFiles = async () => {
        if (pendingFiles.length === 0) return

        setUploading(true)
        const toastId = toast.loading('Uploading images...')
        const newImages = [...(formData.images || [])]
        const failed: string[] = []

        for (const file of pendingFiles) {
            const data = new FormData()
            data.append('file', file)

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: data
                })
                const json = await res.json()
                if (json.success) {
                    newImages.push(json.url)
                } else {
                    console.error('Upload fail:', json.error)
                    failed.push(file.name)
                }
            } catch (err) {
                console.error('Upload failed', err)
                failed.push(file.name)
            }
        }

        setFormData({ ...formData, images: newImages })
        setPendingFiles([]) // Clear pending
        setUploading(false)

        if (failed.length > 0) {
            toast.error(`Failed to upload: ${failed.join(', ')}`, { id: toastId })
        } else {
            toast.success('All images uploaded!', { id: toastId })
        }
    }

    const removePendingFile = (index: number) => {
        setPendingFiles(prev => prev.filter((_, i) => i !== index))
    }

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6 relative">
            <Toaster position="top-right" />

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tiny Homes Inventory</h1>
                    <p className="text-sm text-gray-500">Manage your collection of architectural models.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search names or locations..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                        />
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true) }}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" /> Add New Model
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Model Name</th>
                            <th className="p-4 font-semibold text-gray-600">Price</th>
                            <th className="p-4 font-semibold text-gray-600">Location</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHomes.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500 italic">
                                    No tiny homes found matching your search.
                                </td>
                            </tr>
                        ) : (
                            filteredHomes.map(home => (
                                <tr key={home._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                            <Home className="w-4 h-4 text-gray-500" />
                                        </div>
                                        {home.name}
                                    </td>
                                    <td className="p-4 text-gray-600">{home.price}</td>
                                    <td className="p-4 text-gray-600">
                                        {home.location?.city ? `${home.location.city}, ${home.location.state}` : '-'}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${home.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                            {home.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(home)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(home._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Expanded Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{editMode ? 'Edit Listing' : 'New Listing'}</h2>
                                <p className="text-sm text-gray-500">Enter property details below.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 px-6 gap-6 overflow-x-auto">
                            {[
                                { id: 'basic', label: 'Basic Info', icon: Home },
                                { id: 'specs', label: 'Specs & Tech', icon: Ruler },
                                { id: 'features', label: 'Features', icon: Cpu },
                                { id: 'agent', label: 'Agent', icon: User },
                                { id: 'images', label: 'Images', icon: Image },
                            ].map(tab => {
                                const Icon = tab.icon
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id as any)}
                                        className={`flex items-center gap-2 py-4 border-b-2 transition-colors whitespace-nowrap ${isActive ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Form Content - Scrollable */}
                        <form onSubmit={handleCreate} className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* BASIC INFO TAB */}
                            {activeTab === 'basic' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                                            <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" placeholder="e.g. The Escapade" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                            <input required type="text" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" placeholder="$99,999" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all">
                                                <option>Active</option>
                                                <option>Draft</option>
                                                <option>Sold Out</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" placeholder="Describe the tiny home..." />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <input type="text" value={formData.location?.city} onChange={e => setFormData({ ...formData, location: { ...formData.location!, city: e.target.value } })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">State/Prov</label>
                                            <input type="text" value={formData.location?.state} onChange={e => setFormData({ ...formData, location: { ...formData.location!, state: e.target.value } })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                            <input type="text" value={formData.location?.country} onChange={e => setFormData({ ...formData, location: { ...formData.location!, country: e.target.value } })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SPECS & TECH TAB */}
                            {activeTab === 'specs' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    {/* Dimensions */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-1">Dimensions & Size</h3>
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Square Ft</label>
                                                <input type="text" value={formData.specs?.sqFt} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, sqFt: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="204" />
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Length (ft)</label>
                                                <input type="text" value={formData.specs?.length} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, length: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="24" />
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Width (ft)</label>
                                                <input type="text" value={formData.specs?.width} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, width: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="8.5" />
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Height (ft)</label>
                                                <input type="text" value={formData.specs?.height} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, height: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="13" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Layout */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-1">Layout</h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
                                                <select value={formData.specs?.bedrooms} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, bedrooms: e.target.value } })} className="w-full px-3 py-2 border rounded-lg">
                                                    {[0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Bathrooms</label>
                                                <select value={formData.specs?.bathrooms} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, bathrooms: e.target.value } })} className="w-full px-3 py-2 border rounded-lg">
                                                    {[0, 1, 1.5, 2].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Lofts</label>
                                                <select value={formData.specs?.lofts} onChange={e => setFormData({ ...formData, specs: { ...formData.specs!, lofts: e.target.value } })} className="w-full px-3 py-2 border rounded-lg">
                                                    {[0, 1, 2].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Utilities */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-1">Utilities</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Heating & Cooling</label>
                                                <input type="text" value={formData.utilities?.heating} onChange={e => setFormData({ ...formData, utilities: { ...formData.utilities!, heating: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Heat Pump 9000BTU, Propane Oven" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Water System</label>
                                                    <input type="text" value={formData.utilities?.water} onChange={e => setFormData({ ...formData, utilities: { ...formData.utilities!, water: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="Water Heater, RV Connection" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-500 mb-1">Electric</label>
                                                    <input type="text" value={formData.utilities?.electric} onChange={e => setFormData({ ...formData, utilities: { ...formData.utilities!, electric: e.target.value } })} className="w-full px-3 py-2 border rounded-lg" placeholder="RV 50 AMP" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FEATURES TAB */}
                            {activeTab === 'features' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newFeature}
                                            onChange={e => setNewFeature(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                                            placeholder="Add a feature (e.g. Metal Roof, Stairs)..."
                                        />
                                        <button type="button" onClick={addFeature} className="px-4 py-2 bg-gray-100 font-medium rounded-lg hover:bg-gray-200">Add</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 min-h-[100px] border rounded-lg p-4 bg-gray-50 content-start">
                                        {formData.features?.length === 0 && <span className="text-gray-400 text-sm">No features added yet.</span>}
                                        {formData.features?.map((feature, idx) => (
                                            <div key={idx} className="bg-white border rounded-full px-3 py-1 text-sm font-medium flex items-center gap-2 shadow-sm">
                                                {feature}
                                                <button type="button" onClick={() => removeFeature(idx)} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* AGENT TAB */}
                            {activeTab === 'agent' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                                        <input type="text" value={formData.agent?.name} onChange={e => setFormData({ ...formData, agent: { ...formData.agent!, name: e.target.value } })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="e.g. CEDRIK" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Agent Contact Info</label>
                                        <input type="text" value={formData.agent?.contact} onChange={e => setFormData({ ...formData, agent: { ...formData.agent!, contact: e.target.value } })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black outline-none" placeholder="Phone or Email" />
                                    </div>
                                </div>
                            )}

                            {/* IMAGES TAB - REFACTORED */}
                            {activeTab === 'images' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">

                                    {/* Upload Area */}
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileSelect}
                                        />
                                        <div className="flex flex-col items-center gap-2 text-gray-500">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                <Image className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-medium">Click to select images</p>
                                            <p className="text-xs">PNG, JPG up to 5MB</p>
                                        </div>
                                    </div>

                                    {/* Pending Files (To Be Uploaded) */}
                                    {pendingFiles.length > 0 && (
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4" /> Ready to Upload ({pendingFiles.length})
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={handleUploadPendingFiles}
                                                    disabled={uploading}
                                                    className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                                    {uploading ? 'Uploading...' : 'Confirm Upload'}
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-4 gap-2">
                                                {pendingFiles.map((file, idx) => (
                                                    <div key={idx} className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden border border-blue-200">
                                                        <img src={URL.createObjectURL(file)} className="w-full h-full object-cover opacity-75" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removePendingFile(idx)}
                                                            className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:text-red-500"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Already Uploaded Images */}
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Saved Images</h3>
                                        {formData.images?.length === 0 ? (
                                            <p className="text-sm text-gray-400 italic">No images saved yet.</p>
                                        ) : (
                                            <div className="grid grid-cols-3 gap-4">
                                                {formData.images?.map((url, idx) => (
                                                    <div key={idx} className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                        <img src={url} alt={`Home ${idx}`} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, images: formData.images!.filter((_, i) => i !== idx) })}
                                                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Modal Actions */}
                            <div className="pt-6 border-t border-gray-100 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || !isFormValid() || pendingFiles.length > 0}
                                    className="flex-1 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-800 font-medium disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    {editMode ? 'Update Listing' : 'Create Listing'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }
        </div >
    )
}
