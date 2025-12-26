import Link from 'next/link'
import { getDatabase } from '@/lib/mongodb'
import { ArrowRight, Calendar, User } from 'lucide-react'

// Fetch data directly for Server Component
async function getBlogs() {
    try {
        const db = await getDatabase()
        const blogs = await db.collection('blogs').find({}).sort({ date: -1 }).toArray()
        return blogs.map(blog => ({
            ...blog,
            _id: blog._id.toString()
        }))
    } catch (e) {
        return []
    }
}

export default async function BlogListingPage() {
    const blogs = await getBlogs()

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-black text-white py-20 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Tiny Living Blog</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Inspiration, tips, and stories from the world of tiny homes and sustainable living.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-6xl mx-auto px-6 -mt-10">
                {blogs.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <p className="text-gray-500">No articles published yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog: any) => (
                            <div key={blog._id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                                {/* Image */}
                                <div className="h-64 bg-gray-200 relative overflow-hidden">
                                    {blog.image ? (
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide text-blue-600">
                                        {blog.category}
                                    </div>
                                </div>

                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.date).toLocaleDateString()}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{blog.title}</h2>

                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {blog.summary}
                                    </p>

                                    <Link href={`/blog/${blog._id}`} className="flex items-center font-bold text-black group-hover:gap-2 transition-all mt-auto pt-6 border-t border-gray-50 text-sm">
                                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
