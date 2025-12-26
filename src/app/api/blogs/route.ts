import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/lib/auth'

export async function GET() {
    try {
        const db = await getDatabase()
        const blogs = await db.collection('blogs').find({}).sort({ date: -1 }).toArray()

        // Serialize ObjectId
        const serializedBlogs = blogs.map(blog => ({
            ...blog,
            _id: blog._id.toString()
        }))

        return NextResponse.json(serializedBlogs)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.substring(7)
        const user = verifyToken(token)
        if (!user || !user.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, category, date, summary, content, image } = body

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and Content are required' }, { status: 400 })
        }

        const db = await getDatabase()
        const newBlog = {
            title,
            category: category || 'General',
            date: date || new Date().toISOString(),
            summary: summary || '',
            content,
            image: image || '',
            createdAt: new Date(),
        }

        const result = await db.collection('blogs').insertOne(newBlog)

        return NextResponse.json({ ...newBlog, _id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
    }
}
