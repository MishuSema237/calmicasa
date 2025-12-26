'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Search, X } from 'lucide-react'

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs')
                const data = await res.json()
                setPosts(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) return <div className="min-h-screen pt-32 text-center text-gray-500 font-bold">Loading Articles...</div>

    return (
        <div className="min-h-screen pt-16 bg-gray-50">
            {/* Header */}
            <section className="bg-white py-20 px-4 border-b">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-4">The Tiny Blog</div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">Latest Stories & Guides</h1>
                        <p className="text-xl text-gray-600 mb-8 font-medium">
                            Deep dives into construction, design, and the philosophy of simple living.
                        </p>

                        {/* Search */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-50 group-hover:opacity-100 blur transition duration-500"></div>
                            <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-full shadow-sm px-2">
                                <Search className="w-5 h-5 text-gray-400 ml-4" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search articles, categories, or tags..."
                                    className="w-full py-4 px-4 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 font-medium"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-2 hover:bg-gray-200 rounded-full mr-2 text-gray-400 hover:text-gray-900 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                {filteredPosts.length === 0 ? (
                    <div className="text-center py-20 rounded-[3rem] bg-white border border-gray-100 shadow-sm">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
                            <Search className="w-10 h-10 text-gray-200" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching stories</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find any articles matching your search criteria. Try a different keyword.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="px-8 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Featured Post (First one when no search) */}
                        {!searchQuery && filteredPosts.length > 0 && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group shadow-gray-200">
                                    {filteredPosts[0].image ? (
                                        <img
                                            src={filteredPosts[0].image}
                                            alt={filteredPosts[0].title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                            <Search className="w-12 h-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-900">
                                        Editor's Pick
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center lg:pr-12">
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                                        <span className="text-blue-600">{filteredPosts[0].category || 'Feature'}</span>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center text-gray-400">
                                            <Calendar className="w-3.5 h-3.5 mr-2" />
                                            {new Date(filteredPosts[0].date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <Link href={`/resources/blog/${filteredPosts[0]._id}`}>
                                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 hover:text-blue-600 transition-colors leading-[1.1] tracking-tight">
                                            {filteredPosts[0].title}
                                        </h2>
                                    </Link>
                                    <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium line-clamp-4">
                                        {filteredPosts[0].summary}
                                    </p>
                                    <Link href={`/resources/blog/${filteredPosts[0]._id}`} className="inline-flex items-center text-white bg-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all hover:translate-y-[-2px] shadow-lg shadow-black/10 active:translate-y-0 w-fit">
                                        Read Full Article <ArrowRight className="w-4 h-4 ml-3" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {(searchQuery ? filteredPosts : filteredPosts.slice(1)).map((post, idx) => (
                                <div
                                    key={post._id}
                                    className="group transition-all duration-500 hover:-translate-y-3 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="relative rounded-[2rem] overflow-hidden mb-8 shadow-xl shadow-gray-200 bg-gray-50 aspect-[4/3]">
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <Search className="w-10 h-10 opacity-10" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <Link href={`/resources/blog/${post._id}`} className="w-full py-3 bg-white/95 backdrop-blur rounded-xl font-bold text-gray-900 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl">
                                                Quick Read <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="px-1">
                                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                                            <span className="text-blue-600">{post.category || 'Story'}</span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <Link href={`/resources/blog/${post._id}`}>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-medium italic">
                                            "{post.summary}"
                                        </p>
                                        <Link href={`/resources/blog/${post._id}`} className="flex items-center gap-2 font-black text-gray-900 text-[10px] uppercase tracking-widest hover:text-blue-600 transition-colors">
                                            Full Story <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    )
}
