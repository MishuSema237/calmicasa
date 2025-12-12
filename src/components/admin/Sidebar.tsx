'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    Image as ImageIcon,
    Calendar,
    MessageSquare,
    LogOut,
    Menu,
    X,
    Home,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const { logout } = useAuth()

    const menuItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/blog', icon: FileText, label: 'Blog Posts' },
        { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
        { href: '/admin/events', icon: Calendar, label: 'Events' },
        { href: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    ]

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (window.innerWidth < 768) {
            onClose()
        }
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : -280,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="fixed left-0 top-0 h-full w-70 bg-gray-900 text-white z-50 md:translate-x-0 flex flex-col"
                style={{ width: '280px' }}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                            <Home className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">CalmiCasa</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href
                            const Icon = item.icon

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </motion.aside>
        </>
    )
}
