'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, User } from 'lucide-react'

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname()



    // Define pages that show a dark hero/image at the top, allowing for transparent nav
    const hasDarkHero =
        pathname === '/' ||
        pathname === '/help/about' ||
        pathname === '/resources/gallery' ||
        pathname === '/help' ||
        (pathname.startsWith('/resources/tiny-homes/') && pathname !== '/resources/tiny-homes')

    // Handle scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Shop', href: '/resources/tiny-homes' },
        { name: 'Resources', href: '/resources' },
        { name: 'About', href: '/help/about' },
        { name: 'Help', href: '/help' },
    ]

    // Logic: 
    // If we are on a page with a dark Hero, we act transparent at top, white when scrolled.
    // If we are on a page with a white/light Hero (default), we ALWAYS act "scrolled" (white background).

    const effectiveIsScrolled = isScrolled || !hasDarkHero

    const getNavClasses = () => {
        if (mobileMenuOpen) return 'bg-white text-gray-900'

        return effectiveIsScrolled
            ? 'bg-white/90 backdrop-blur-md text-gray-900 shadow-sm py-4'
            : 'bg-transparent text-white py-6'
    }

    // Logo logic: Blue/Dark when white background, White when transparent background
    const getLogoClasses = () => {
        return effectiveIsScrolled ? 'bg-blue-600 text-white' : 'bg-white text-gray-900'
    }

    // Hide Navigation on all Admin pages (including Login)
    if (pathname?.startsWith('/admin')) return null

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavClasses()}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold tracking-tight">CalmiCasa</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-medium hover:opacity-70 transition-opacity"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-6 w-px bg-current opacity-20 mx-2"></div>

                            {/* Admin Link */}
                            <Link href="/admin/login" className="font-medium hover:opacity-70 transition-opacity flex items-center gap-2" title="Admin Login">
                                <User className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/resources/tiny-homes"
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${effectiveIsScrolled
                                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                                    : 'bg-white text-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                <ShoppingBag className="w-4 h-4" /> Shop
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-bold text-gray-900"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/admin/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-gray-500"
                            >
                                Admin Login
                            </Link>
                            <hr className="border-gray-100" />
                            <Link
                                href="/resources/tiny-homes"
                                className="px-6 py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 mx-4"
                            >
                                <ShoppingBag className="w-5 h-5" /> Shop Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
