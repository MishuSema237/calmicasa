import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'

// Middleware helper to check auth
const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase()
        const posts = await db.collection('posts').find({}).sort({ createdAt: -1 }).toArray()
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const data = await request.json()
        const db = await getDatabase()

        // Simple validation
        if (!data.title || !data.content) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const newPost = {
            ...data,
            createdAt: new Date(),
            author: user.email
        }

        const result = await db.collection('posts').insertOne(newPost)
        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

        const db = await getDatabase()
        await db.collection('posts').deleteOne({ _id: new ObjectId(id) })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
