import Link from 'next/link'
import { getDatabase } from '@/lib/mongodb'
import { Ruler, Users, ArrowRight, Bed, Bath, Move, MapPin, Layers, Image as ImageIcon } from 'lucide-react'

// Fetch data directly from DB for Server Component
async function getTinyHomes() {
    try {
        const db = await getDatabase()
        // Get all active listings
        const homes = await db.collection('tiny_homes').find({ status: { $ne: 'Draft' } }).toArray()
        // Serialize ObjectId
        return homes.map(home => ({
            ...home,
            _id: home._id.toString(),
            createdAt: home.createdAt?.toString() || ''
        }))
    } catch (e) {
        console.error('Fetch error:', e)
        return []
    }
}

export default async function TinyHomesListingPage() {
    const homes = await getTinyHomes()

    return (
        <div className="min-h-screen pt-16 bg-white">
            {/* Header - matching user specification */}
            <section className="py-24 px-4 bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-block px-4 py-1 bg-blue-100 rounded-md text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-blue-600">
                            Available Inventory
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">Signature Tiny Home Models</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                            Architecturally designed, sustainably built, and ready for your next adventure.
                        </p>

                        {/* Filters (Visual UI as requested) */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all font-bold text-sm shadow-lg shadow-gray-200">All Models</button>
                            {['On Wheels', 'Foundation', 'Container', 'Custom Build'].map((filter) => (
                                <button key={filter} className="px-8 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all text-gray-600 font-bold text-sm">
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section - using dynamic data */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                {homes.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <p className="text-xl text-gray-400 font-bold tracking-tight">No active listings found. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {homes.map((home: any, idx) => {
                            // Robust image handling
                            let displayImages = [];
                            if (Array.isArray(home.images)) {
                                displayImages = home.images;
                            } else if (typeof home.images === 'string') {
                                displayImages = [home.images];
                            }
                            const mainImage = displayImages.length > 0 ? displayImages[0] : null;

                            return (
                                <div
                                    key={home._id}
                                    className="group transition-all duration-500 hover:-translate-y-3 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {/* Image Area with Price Badge */}
                                    <div className="relative rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-gray-200 bg-gray-50 aspect-[4/3]">
                                        {mainImage ? (
                                            <img
                                                src={mainImage}
                                                alt={home.name}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">No Visuals</span>
                                            </div>
                                        )}
                                        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl shadow-xl border border-white/50">
                                            <span className="font-black text-gray-900 text-lg tracking-tight">{home.price || 'Inquire'}</span>
                                        </div>
                                        {home.status && home.status !== 'Active' && (
                                            <div className="absolute top-6 left-6 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg uppercase tracking-widest">
                                                {home.status}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="px-2">
                                        <div className="flex items-center gap-2 text-blue-600 mb-3">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-[11px] font-black uppercase tracking-widest">
                                                {home.location?.city ? `${home.location.city}, ${home.location.state}` : 'Worldwide Delivery'}
                                            </span>
                                        </div>

                                        <Link href={`/resources/tiny-homes/${home._id}`}>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">{home.name}</h3>
                                        </Link>

                                        {/* Specs Row - Expanded */}
                                        <div className="grid grid-cols-3 gap-4 mb-6 border-y border-gray-100 py-6">
                                            {home.specs?.sqFt && (
                                                <div className="text-center border-r border-gray-100 px-2 lg:px-4">
                                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Area</div>
                                                    <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{home.specs.sqFt} SQFT</div>
                                                </div>
                                            )}
                                            {home.specs?.bedrooms && (
                                                <div className="text-center border-r border-gray-100 px-2 lg:px-4">
                                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Sleeps</div>
                                                    <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{home.specs.bedrooms} BEDS</div>
                                                </div>
                                            )}
                                            {home.specs?.lofts && home.specs?.lofts !== '0' && (
                                                <div className="text-center px-2 lg:px-4">
                                                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Lofts</div>
                                                    <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{home.specs.lofts} LEVELS</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Link */}
                                        <Link
                                            href={`/resources/tiny-homes/${home._id}`}
                                            className="inline-flex items-center gap-3 font-black text-gray-900 hover:text-blue-600 transition-all text-xs uppercase tracking-widest group-hover:gap-5"
                                        >
                                            View Architectural Specs <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    )
}
