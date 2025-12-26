'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon, Save, X, FileText, Search } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

type Blog = {
    _id: string
    title: string
    category: string
    date: string
    summary: string
    content: string
    image: string
}

export default function AdminBlogPage() {
    const { token } = useAuth()
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Form State
    const initialFormState = {
        title: '',
        category: 'Lifestyle',
        date: new Date().toISOString().split('T')[0],
        summary: '',
        content: '',
        image: ''
    }
    const [formData, setFormData] = useState(initialFormState)

    useEffect(() => {
        fetchBlogs()
    }, [])

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs')
            const data = await res.json()
            setBlogs(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const url = editMode ? `/api/blogs/${editingId}` : '/api/blogs'
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
                fetchBlogs()
                setIsModalOpen(false)
                resetForm()
            } else {
                alert('Failed to save blog')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return
        try {
            await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            setBlogs(prev => prev.filter(b => b._id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = (blog: Blog) => {
        setFormData({
            title: blog.title,
            category: blog.category,
            date: blog.date.split('T')[0],
            summary: blog.summary,
            content: blog.content,
            image: blog.image
        })
        setEditMode(true)
        setEditingId(blog._id)
        setIsModalOpen(true)
    }

    const resetForm = () => {
        setFormData(initialFormState)
        setEditMode(false)
        setEditingId(null)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        const file = e.target.files[0]
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
                setFormData(prev => ({ ...prev, image: json.url }))
            }
        } catch (err) {
            console.error('Upload failed', err)
            alert('Image upload failed')
        }
    }

    if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-sm text-gray-500">Create and curate your architectural stories.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                        />
                    </div>
                    <button
                        onClick={() => { resetForm(); setIsModalOpen(true) }}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" /> New Post
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No blogs found matching your search.</p>
                    </div>
                ) : (
                    filteredBlogs.map(blog => (
                        <div key={blog._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-48 bg-gray-100 relative">
                                {blog.image ? (
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <button onClick={() => handleEdit(blog)} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50"><Edit className="w-4 h-4 text-blue-600" /></button>
                                    <button onClick={() => handleDelete(blog._id)} className="p-1.5 bg-white rounded-full shadow hover:bg-gray-50"><Trash2 className="w-4 h-4 text-red-600" /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{blog.category}</span>
                                <h3 className="font-bold text-lg mt-1 mb-2 line-clamp-1">{blog.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{blog.summary}</p>
                                <div className="mt-4 text-xs text-gray-400 border-t pt-3 flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Published {new Date(blog.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold">{editMode ? 'Edit Blog' : 'New Blog Post'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 overflow-y-auto space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                                        <option>Lifestyle</option>
                                        <option>Tech</option>
                                        <option>Tiny Living</option>
                                        <option>Sustainability</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Cover Image</label>
                                <div className="border border-gray-200 rounded-lg p-2 flex items-center gap-4">
                                    {formData.image && <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded bg-gray-100" />}
                                    <input type="file" onChange={handleImageUpload} className="text-sm" accept="image/*" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Summary</label>
                                <textarea rows={2} value={formData.summary} onChange={e => setFormData({ ...formData, summary: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Short description for the card..." />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Content</label>
                                <textarea required rows={10} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono text-sm" placeholder="Write your article content here..." />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border rounded-lg">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 py-2 bg-black text-white rounded-lg disabled:opacity-50">{submitting ? 'Saving...' : 'Save Post'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
