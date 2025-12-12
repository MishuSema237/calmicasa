import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase()
        const images = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray()
        return NextResponse.json(images)
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

        if (!data.src || !data.category) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        const newImage = {
            ...data,
            createdAt: new Date()
        }

        const result = await db.collection('gallery').insertOne(newImage)
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
        await db.collection('gallery').deleteOne({ _id: new ObjectId(id) })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
