import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function GET(request: NextRequest) {
    try {
        const db = await getDatabase()
        const homes = await db.collection('tiny_homes').find({}).toArray()
        return NextResponse.json(homes)
    } catch (error: any) {
        console.error('Error fetching tiny homes:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const data = await request.json()
        if (!data.name || !data.price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const db = await getDatabase()
        const result = await db.collection('tiny_homes').insertOne({
            ...data,
            createdAt: new Date(),
            status: data.status || 'Active'
        })

        return NextResponse.json({ success: true, id: result.insertedId })
    } catch (error: any) {
        console.error('Error creating tiny home:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
