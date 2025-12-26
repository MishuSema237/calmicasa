import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { ArrowLeft, Check, Bed, Bath, Move, Ruler, MapPin, Calendar, Phone, Mail, Image as ImageIcon, Send, Activity, Settings, Info, Layers, Maximize, ExternalLink } from 'lucide-react'

async function getTinyHome(id: string) {
    try {
        const db = await getDatabase()
        const home = await db.collection('tiny_homes').findOne({ _id: new ObjectId(id) })
        if (!home) return null
        return {
            ...home,
            _id: home._id.toString(),
            createdAt: home.createdAt?.toString() || ''
        }
    } catch (e) {
        return null
    }
}

export default async function TinyHomeDetailPage({ params }: { params: { id: string } }) {
    const home: any = await getTinyHome(params.id)

    if (!home) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-24">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Tiny Home Not Found</h1>
                    <Link href="/resources/tiny-homes" className="text-blue-600 hover:underline">Back to models</Link>
                </div>
            </div>
        )
    }

    const mainImage = home.images && home.images.length > 0 ? home.images[0] : null
    const galleryImages = home.images && home.images.length > 1 ? home.images.slice(1) : []

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Hero Section - Using Dark background for contrast with white nav text */}
            <div className="bg-[#1a1c1e] text-white min-h-[75vh] flex flex-col pt-32 overflow-hidden relative">

                {/* Back Button */}
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mb-12 z-20">
                    <Link href="/resources/tiny-homes" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Model Gallery
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 flex-grow">
                    {/* Left: Content */}
                    <div className="py-12 md:py-20 px-4 md:px-8 flex flex-col justify-start z-10">
                        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                            <div className="flex items-center gap-3 mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${home.status === 'Sold Out' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                                    {home.status || 'Active'}
                                </span>
                                <span className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em]">Listing ID: {home._id.slice(-6).toUpperCase()}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">{home.name}</h1>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="text-xl font-medium text-gray-300">
                                        {home.location?.city ? `${home.location.city}, ${home.location.state}` : 'Available for Worldwide Shipping'}
                                        {home.location?.country && <span className="text-gray-500 ml-2">({home.location.country})</span>}
                                    </div>
                                </div>
                                <div className="text-4xl md:text-6xl font-light text-white tracking-tight">
                                    {home.price}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Primary Visual */}
                    <div className="relative h-[500px] lg:h-auto overflow-hidden">
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt={home.name}
                                className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in duration-1000 scale-100 hover:scale-105 transition-transform duration-[2s]"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center text-gray-600 border-l border-white/10">
                                <ImageIcon className="w-20 h-20 mb-6 opacity-5" />
                                <span className="font-bold tracking-widest uppercase text-xs text-gray-500">Visuals Processing</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1e] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1a1c1e] lg:to-transparent" />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-3 gap-24">

                {/* Left Column: Comprehensive Details */}
                <div className="lg:col-span-2 space-y-24">

                    {/* Description Section */}
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-block px-4 py-1 bg-gray-100 rounded-md text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-gray-500">
                            The Design Philosophy
                        </div>
                        <div className="prose prose-2xl max-w-none text-gray-700 leading-relaxed font-medium">
                            <p className="whitespace-pre-wrap">{home.description || 'This model represents the pinnacle of our design ethos, blending high-end architectural finishes with practical, sustainable living solutions.'}</p>
                        </div>
                    </section>

                    {/* Specifications Grid - Unified showing ALL data */}
                    <section>
                        <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                            <Ruler className="w-8 h-8 text-blue-600" />
                            Architectural Metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Living Space', value: home.specs?.sqFt, unit: 'SQ FT', icon: Maximize },
                                { label: 'Length', value: home.specs?.length, unit: 'FEET', icon: Ruler },
                                { label: 'Width', value: home.specs?.width, unit: 'FEET', icon: Ruler },
                                { label: 'Height', value: home.specs?.height, unit: 'FEET', icon: Ruler },
                                { label: 'Bedrooms', value: home.specs?.bedrooms, unit: 'ROOMS', icon: Bed },
                                { label: 'Bathrooms', value: home.specs?.bathrooms, unit: 'FULL', icon: Bath },
                                { label: 'Lofts', value: home.specs?.lofts, unit: 'LEVELS', icon: Layers },
                            ].filter(s => s.value).map((spec, i) => (
                                <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
                                    <spec.icon className="w-6 h-6 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{spec.label}</div>
                                    <div className="flex items-baseline gap-2">
                                        <div className="font-bold text-3xl text-gray-900 tracking-tighter">{spec.value}</div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase">{spec.unit}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Utilities Section - Restored and updated */}
                    <section>
                        <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                            <Settings className="w-8 h-8 text-blue-600" />
                            Critical Systems
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Heating & Cooling', value: home.utilities?.heating, icon: Activity },
                                { label: 'Electric System', value: home.utilities?.electric, icon: Activity },
                                { label: 'Water & Plumbing', value: home.utilities?.water, icon: Activity },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2rem] bg-white border border-gray-100 hover:border-blue-100 transition-all">
                                    <div className="flex items-center gap-4 mb-4 md:mb-0 text-gray-400">
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-bold uppercase tracking-widest text-[11px]">{item.label}</span>
                                    </div>
                                    <span className="text-gray-900 font-bold text-lg md:text-right">{item.value || 'Custom configuration available'}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Features Grid */}
                    {home.features && home.features.length > 0 && (
                        <section>
                            <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                                <Info className="w-8 h-8 text-blue-600" />
                                Premium Inclusions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {home.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-4 p-6 rounded-[1.5rem] bg-gray-50 border border-transparent hover:border-gray-200 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-gray-900 font-bold text-sm tracking-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Secondary Gallery */}
                    {galleryImages.length > 0 && (
                        <section>
                            <h3 className="text-3xl font-bold mb-12">Detail Gallery</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {galleryImages.map((img: string, idx: number) => (
                                    <div key={idx} className="aspect-video bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm group">
                                        <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Right Column: Reverted White Sidebar Design */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-12">

                        {/* Agent/Contact Card - REVERTED TO WHITE DESIGN */}
                        <div className="bg-white border border-gray-200 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                            <h3 className="font-bold text-2xl mb-10 text-gray-900">Interested in this model?</h3>

                            <div className="flex items-center gap-6 mb-12 rounded-[2rem] bg-gray-50 p-6 border border-gray-100">
                                <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/20">
                                    {home.agent?.name?.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <div className="font-black text-xl text-gray-900 tracking-tight">{home.agent?.name || 'CalmiCasa Sales'}</div>
                                    <div className="text-xs text-blue-600 font-black uppercase tracking-widest mt-1">Verified Property Expert</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href="/help/contact"
                                    className="w-full py-5 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-800 transition-all hover:translate-y-[-2px] shadow-lg shadow-black/10 active:translate-y-0"
                                >
                                    <Phone className="w-5 h-5" /> Call Agent
                                </Link>
                                <Link
                                    href="/help/contact"
                                    className="w-full py-5 bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white hover:border-gray-400 transition-all"
                                >
                                    <Mail className="w-5 h-5" /> Inquire Online
                                </Link>
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-3 text-xs font-bold text-gray-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Fast Response: Typically within 1 hour
                            </div>
                        </div>

                        {/* NOAH Certification - REVERTED TO ORIGINAL LOOK */}
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-200 shadow-sm relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                                    <Check className="w-8 h-8 text-blue-600" />
                                </div>
                                <h4 className="font-black text-gray-900 uppercase tracking-[0.2em] text-sm mb-4">NOAH Certified</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                    Every model we build is safety-inspected and certified to exceed standards for housing and mobility.
                                </p>
                            </div>
                            <ExternalLink className="absolute top-8 right-8 w-5 h-5 text-gray-300 opacity-50 group-hover:text-blue-600 transition-colors" />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
