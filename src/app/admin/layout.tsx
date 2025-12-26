'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        if (!loading && !isAuthenticated && !isLoginPage) {
            router.push('/admin/login')
        }
    }, [loading, isAuthenticated, isLoginPage, router])

    // If we are on the login page, just render the children (the login form).
    // Do NOT render the Sidebar or additional admin layout structure.
    if (isLoginPage) {
        return <>{children}</>
    }

    // Determine if we should show the dashboard content
    // If loading, show a loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    // If not authenticated and not on login page, we returning null (redirecting in useEffect)
    // But to avoid flashing, we can return null here too
    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <div className={`hidden md:block transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 relative`}>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>

            {/* Sidebar - Mobile */}
            <div className={`md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
                <div className="relative w-64 h-full bg-white shadow-xl">
                    <Sidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} mobile />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <span className="font-semibold text-gray-900">Admin Panel</span>
                    <div className="w-8"></div> {/* Spacer for alignment */}
                </div>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

