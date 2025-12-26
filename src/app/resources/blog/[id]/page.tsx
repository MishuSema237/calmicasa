import Link from 'next/link'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'

// Fetch data for Server Component
async function getBlog(id: string) {
    try {
        const db = await getDatabase()
        const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) })
        if (!blog) return null
        return { ...blog, _id: blog._id.toString() }
    } catch (e) {
        return null
    }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    const blog: any = await getBlog(params.id)

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Link href="/resources/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pb-20 pt-20">
            {/* Hero Image */}
            <div className="h-[40vh] md:h-[60vh] relative bg-gray-900">
                {blog.image && (
                    <>
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </>
                )}

                <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-24 px-6">
                    <div className="max-w-3xl mx-auto w-full text-white">
                        <Link href="/resources/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium">
                            <ArrowLeft className="w-4 h-4" /> Back to Articles
                        </Link>

                        <div className="flex items-center gap-4 mb-4 text-sm font-medium">
                            <span className="bg-blue-600 px-3 py-1 rounded-full">{blog.category}</span>
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(blog.date).toLocaleDateString()}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{blog.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="prose prose-lg max-w-none text-gray-600 leading-loose">
                    {/* Summary Block */}
                    {blog.summary && (
                        <div className="text-xl md:text-2xl text-gray-900 font-medium leading-relaxed mb-12 border-l-4 border-black pl-6 italic">
                            {blog.summary}
                        </div>
                    )}

                    {/* Main Content - Preserving whitespace for now */}
                    <div className="whitespace-pre-wrap font-serif">
                        {blog.content}
                    </div>
                </div>

                {/* Footer / Share */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>© Calmicasa Blog</span>
                    <div className="flex gap-4">
                        <span className="font-bold text-black cursor-pointer hover:underline">Share Article</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
