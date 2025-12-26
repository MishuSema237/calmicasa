'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Palette, MessageCircle, ShoppingBag, Camera, BookOpen, Calendar, UserPlus, MapPin, Home, Play, BadgeDollarSign, Map, PencilRuler, Truck, ShieldCheck } from 'lucide-react'
import Modal from '@/components/Modal'
import { useModal } from '@/hooks/useModal'

export default function HomePage() {
  const { isOpen, closeModal } = useModal()

  const ecosystemFeatures = [
    {
      name: 'Smart Financing',
      icon: BadgeDollarSign,
      description: 'Flexible payment plans and partnerships with top tiny-home lenders.',
      span: 'md:col-span-4'
    },
    {
      name: 'Land Assistance',
      icon: Map,
      description: 'We help you navigate zoning laws and find the perfect spot.',
      span: 'md:col-span-4'
    },
    {
      name: 'Custom Design',
      icon: PencilRuler,
      description: 'Collaborate with our architects to tailor every inch of your space.',
      span: 'md:col-span-4'
    },
    {
      name: 'Professional Delivery',
      icon: Truck,
      description: 'White-glove shipping and professional on-site setup at your location.',
      span: 'md:col-span-6'
    },
    {
      name: '10-Year Warranty',
      icon: ShieldCheck,
      description: 'Structural warranty and a dedicated support team for life.',
      span: 'md:col-span-6'
    },
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
              More <span className="relative inline-block mt-2">
                <span className="relative z-10 text-black">Freedom.</span>
                {/* Custom Brush Stroke */}
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%]  -z-0 text-blue-600 opacity-90"
                  viewBox="0 0 500 500"
                  preserveAspectRatio="none"
                >
                  <g transform="matrix(1, 0, 0, 1, 209.8228, 182.775528)">
                    <path
                      d="M 266.104 36.352 C 307.627 31.725 228.584 24.012 192.565 21.313 C 156.544 18.613 131.032 13.6 206.07 15.529 C 281.112 17.071 273.607 8.973 159.546 1.647 C 44.985 -6.066 -143.12 0.104 -143.12 0.104 C -223.66 -0.281 -189.14 56.018 -195.14 72.599 C -201.15 89.181 -192.65 102.292 -184.64 112.704 C -176.64 122.73 -186.64 125.043 -156.12 133.912 C -125.62 142.781 -64.074 127.743 119.526 125.043 C 294.118 122.344 212.074 111.547 172.054 108.461 C 132.03 105.377 149.542 102.678 216.576 99.978 C 283.613 97.664 207.571 91.88 214.074 85.711 C 221.079 79.54 303.623 79.54 240.589 72.213 C 228.584 70.671 266.605 61.803 236.588 60.26 C 206.572 58.718 216.576 55.247 255.099 54.091 C 293.117 52.933 267.603 45.22 246.092 44.064 C 225.081 43.292 224.582 40.979 266.104 36.352 Z"
                      fill="white"
                    />
                  </g>
                </svg>
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
                <Link
                  href="/help/contact"
                  className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 bg-black/20 backdrop-blur hover:bg-black/40 transition-all text-white font-semibold"
                >

                  Talk to an Expert
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Homes - Horizontal Scroll */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Signature Series</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">Masterfully crafted for life on the go.</p>
          <Link href="/resources/tiny-homes" className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-blue-600 transition-colors border-b-2 border-gray-900 hover:border-blue-600 pb-1">
            View Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {featuredHomes.map((home, index) => (
              <motion.div
                key={home.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer mx-auto w-full max-w-md"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 shadow-md hover:shadow-xl transition-all duration-300">
                  <Image
                    src={home.image}
                    alt={home.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full font-bold text-gray-900 shadow-lg z-10">
                    {home.price}
                  </div>
                  <div className="absolute bottom-6 left-6 text-white z-10 text-left">
                    <div className="flex items-center gap-2 text-sm font-bold text-blue-300 mb-2 uppercase tracking-wide">
                      <MapPin className="w-4 h-4" /> {home.location}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{home.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{home.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section - Bento Grid */}
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
            {ecosystemFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${feature.span} group relative bg-white border border-gray-100 rounded-3xl p-8 md:hover:bg-gray-900 md:hover:text-white transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col justify-between shadow-sm`}
              >
                {/* Large Background Icon (Gray) - Static on mobile, interactive on desktop if desired, but user asked for "background", so keeping it visible */}
                <div className="absolute -bottom-8 -right-8 opacity-10 md:group-hover:opacity-20 scale-150 transition-all duration-500">
                  <feature.icon className="w-48 h-48 text-gray-400" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm md:group-hover:bg-white/20 md:group-hover:text-white transition-colors">
                    <feature.icon className="w-7 h-7 text-gray-500 md:group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 md:group-hover:text-white">{feature.name}</h3>
                  <p className="text-gray-500 md:group-hover:text-gray-300 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section - Magazine Layout */}
      <section className="py-14 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">The Knowledge Hub.</h2>
              <p className="text-xl text-gray-400">
                Dive deep into the world of tiny living. Our curated resources are designed to take you from curious beginner to expert builder.
              </p>
            </div>
            <Link href="/resources" className="px-8 py-4 bg-white text-gray-900 hidden sm:block rounded-full font-bold hover:bg-gray-200 transition-colors">
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
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase tracking-wider text-sm">
                  <Home className="w-4 h-4" /> Signature Collection
                </div>
                <h3 className="text-4xl font-bold mb-4">Explore Our Tiny Homes</h3>
                <p className="text-gray-300 max-w-md mb-8 hidden sm:block">
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
          <Link href="/resources" className="text-center mt-8 px-8 py-4 bg-white text-gray-900 block sm:hidden rounded-full font-bold hover:bg-gray-200 transition-colors">
            View All Resources
          </Link>
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
            <Link href="/resources/tiny-homes" className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-xl hover:shadow-2xl">
              Explore Models
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
