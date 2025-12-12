'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { Plus, Trash2, Loader2, FileText, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

type BlogPost = {
    _id: string
    title: string
    excerpt: string
    content: string
    author: string
    category: string
    image: string
    createdAt: string
}

export default function AdminBlogPage() {
    const { token } = useAuth()
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [isCreating, setIsCreating] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogPost>()

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/blog')
            const data = await res.json()
            setPosts(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return
        try {
            const res = await fetch(`/api/blog?id=${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                setPosts(posts.filter(p => p._id !== id))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const onSubmit = async (data: BlogPost) => {
        try {
            const res = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                setIsCreating(false)
                reset()
                fetchPosts()
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> {isCreating ? 'Cancel' : 'New Post'}
                </button>
            </div>

            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
                >
                    <h2 className="font-bold text-lg mb-4">Create New Article</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input {...register('title', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <input {...register('category', { required: true })} className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Image URL</label>
                            <input {...register('image')} className="w-full p-2 border rounded-lg" placeholder="https://..." />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Excerpt</label>
                            <textarea {...register('excerpt', { required: true })} className="w-full p-2 border rounded-lg" rows={2} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea {...register('content', { required: true })} className="w-full p-2 border rounded-lg font-mono text-sm" rows={10} />
                        </div>

                        <div className="flex justify-end">
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold">
                                Publish Post
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-4">
                {posts.map(post => (
                    <div key={post._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{post.title}</h3>
                            <div className="flex gap-2 text-sm text-gray-500 mt-1">
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{post.category}</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-600 mt-2 line-clamp-1 text-sm">{post.excerpt}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(post._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            {posts.length === 0 && !loading && (
                <div className="text-center py-12 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>No posts yet.</p>
                </div>
            )}
        </div>
    )
}
