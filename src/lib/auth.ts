import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || 'your-secret-key'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Please add ADMIN_EMAIL and ADMIN_PASSWORD to .env.local')
}

export interface TokenPayload {
    email: string
    isAdmin: boolean
    iat?: number
    exp?: number
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

// Generate JWT token
export function generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    })
}

// Verify JWT token
export function verifyToken(token: string): TokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload
    } catch (error) {
        console.error('Token verification failed:', error)
        return null
    }
}

// Validate admin credentials
export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
    if (email !== ADMIN_EMAIL) {
        return false
    }

    // For simplicity, we're comparing plain text password
    // In production, you should hash the password in .env.local
    return password === ADMIN_PASSWORD
}

// Get admin email
export function getAdminEmail(): string {
    return ADMIN_EMAIL || ''
}
