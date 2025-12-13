'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    email: string
    isAdmin: boolean
}

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            if (!storedToken) {
                setLoading(false)
                return
            }
            // Optimistically set token
            setToken(storedToken)

            const response = await fetch('/api/auth/verify', {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
            } else {
                localStorage.removeItem('authToken')
                setUser(null)
                setToken(null)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            localStorage.removeItem('authToken')
            setUser(null)
            setToken(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('authToken', data.token)
                setUser(data.user)
                setToken(data.token)
                return { success: true }
            } else {
                return { success: false, error: data.error || 'Login failed' }
            }
        } catch (error) {
            return { success: false, error: 'Network error' }
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            })
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            localStorage.removeItem('authToken')
            setUser(null)
            setToken(null)
            router.push('/admin/login')
        }
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
