'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Palette, MessageCircle, ShoppingBag, Camera, BookOpen, Calendar, UserPlus, MapPin, Home, Play } from 'lucide-react'
import Modal from '@/components/Modal'
import { useModal } from '@/hooks/useModal'

export default function HomePage() {
  const { isOpen, closeModal } = useModal()

  const services = [
    { name: 'Community', href: '/services/community', icon: Users, description: 'Join our vibrant community of tiny home enthusiasts.', span: 'md:col-span-8' },
    { name: 'Membership', href: '/services/membership', icon: UserPlus, description: 'Exclusive perks & discounts.', span: 'md:col-span-4' },
    { name: 'Online Event', href: '/services/online-event', icon: Calendar, description: 'Virtual workshops.', span: 'md:col-span-4' },
    { name: '3D Designer', href: '/services/3d-designer', icon: Palette, description: 'Visualize your dream home with our custom tool.', span: 'md:col-span-8' },
    { name: 'Consulting', href: '/services/consulting', icon: MessageCircle, description: 'Expert guidance.', span: 'md:col-span-6' },
    { name: 'Shop', href: '/shop', icon: ShoppingBag, description: 'Curated essentials for compact living.', span: 'md:col-span-6' },
  ]

  const featuredHomes = [
    {
      name: 'The CalmiCasa Classic',
      price: '$186,000',
      location: 'California',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      description: 'A master on the main floor with sliding glass doors that open up to nature.'
    },
    {
      name: 'The Eco Denizen',
      price: '$90,000',
      location: 'Arizona',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      description: 'Packs luxury, style, and sophistication into just 320 square feet.'
    },
    {
      name: 'The Luna Retreat',
      price: '$105,000',
      location: 'Tennessee',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      description: 'Budget-conscious, high design tiny house with floor-to-ceiling glass.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop"
            alt="Beautiful tiny home"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              Less Space.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                More Freedom.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Premium tiny homes designed for the modern minimalist. Sustainable, smart, and uniquely yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/resources/tiny-homes"
                  className="group px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  View Models
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => { }} // Placeholder for video modal maybe?
                  className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 bg-black/20 backdrop-blur hover:bg-black/40 transition-all text-white font-semibold"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                    <Play className="w-3 h-3 ml-0.5 fill-black" />
                  </div>
                  Watch Reel
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Homes - Horizontal Scroll */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Signature Series</h2>
            <p className="text-gray-500">Masterfully crafted for life on the go.</p>
          </div>
          <Link href="/resources/tiny-homes" className="hidden md:flex items-center gap-2 text-gray-900 font-bold hover:underline">
            View Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x">
            {featuredHomes.map((home, index) => (
              <motion.div
                key={home.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={home.image}
                    alt={home.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full font-bold text-gray-900 shadow-lg">
                    {home.price}
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-90">
                      <MapPin className="w-4 h-4" /> {home.location}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{home.name}</h3>
                <p className="text-gray-500 leading-relaxed">{home.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Everything You Need</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">Built Around You.</h2>
            <p className="text-xl text-gray-500">
              We don't just build homes; we build ecosystems. From financing to community, we are with you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${service.span} group relative bg-gray-50 rounded-3xl p-8 hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col justify-between`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 scale-150 transition-all duration-500">
                  <service.icon className="w-40 h-40" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-white/20 group-hover:text-white transition-colors">
                    <service.icon className="w-7 h-7 text-gray-900 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-500 group-hover:text-gray-300 font-medium">{service.description}</p>
                </div>

                <div className="relative z-10 pt-8">
                  <Link href={service.href} className="inline-flex items-center font-bold text-sm tracking-wide uppercase border-b border-gray-300 pb-1 group-hover:border-white/50">
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section - Magazine Layout */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">The Knowledge Hub.</h2>
              <p className="text-xl text-gray-400">
                Dive deep into the world of tiny living. Our curated resources are designed to take you from curious beginner to expert builder.
              </p>
            </div>
            <Link href="/resources" className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-200 transition-colors">
              View All Resources
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Large Featured Item */}
            <div className="md:col-span-2 md:row-span-2 relative group rounded-2xl overflow-hidden bg-gray-800">
              <Image
                src="https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=1200&h=800&fit=crop"
                alt="Tiny Homes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase tracking-wider text-sm">
                  <Home className="w-4 h-4" /> Signature Collection
                </div>
                <h3 className="text-4xl font-bold mb-4">Explore Our Tiny Homes</h3>
                <p className="text-gray-300 max-w-md mb-8">
                  Discover our award-winning designs that blend functionality with breathtaking aesthetics.
                </p>
                <Link href="/resources/tiny-homes" className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg hover:bg-white hover:text-black transition-all w-fit font-bold">
                  View Models <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Secondary Item 1 */}
            <div className="relative group rounded-2xl overflow-hidden bg-gray-800 min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
                alt="Plans"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <BookOpen className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold">Build Plans</h3>
                <Link href="/resources/plans" className="text-gray-300 text-sm mt-2 hover:text-white flex items-center gap-1">
                  Start Building <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Secondary Item 2 */}
            <div className="relative group rounded-2xl overflow-hidden bg-gray-800 min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <Camera className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold">Inspiration Gallery</h3>
                <Link href="/resources/gallery" className="text-gray-300 text-sm mt-2 hover:text-white flex items-center gap-1">
                  Browse Photos <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Row Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[
              { name: 'Find Builders', icon: Users, href: '/resources/find-builders' },
              { name: 'Latest News', icon: BookOpen, href: '/resources/blog' },
              { name: 'Events', icon: Calendar, href: '/resources/event' },
              { name: 'Help Center', icon: MessageCircle, href: '/help' },
            ].map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 mb-8">
            Ready to go Tiny?
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            CalmiCasa is more than a builder. We're a movement. Join us today and redefine what it means to be home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/members/signup" className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-xl hover:shadow-2xl">
              Become a Member
            </Link>
            <Link href="/help/contact" className="px-10 py-5 bg-white text-black border-2 border-gray-100 rounded-full font-bold text-lg hover:border-gray-300 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}
