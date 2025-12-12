import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        const isValid = await validateAdminCredentials(email, password)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        const token = generateToken({
            email,
            isAdmin: true,
        })

        return NextResponse.json({
            success: true,
            token,
            user: {
                email,
                isAdmin: true,
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
