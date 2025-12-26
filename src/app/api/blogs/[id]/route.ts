import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/lib/auth'
import { deleteFileFromUrl } from '@/lib/supabase'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    const user = verifyToken(authHeader.substring(7))
    if (!user || !user.isAdmin) return null
    return user
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { id } = params
        const body = await request.json()
        const { _id, ...updateData } = body // Remove _id from update data

        const db = await getDatabase()

        // Cleanup: Check if image is being replaced
        if (updateData.image) {
            const oldBlog = await db.collection('blogs').findOne({ _id: new ObjectId(id) })
            if (oldBlog && oldBlog.image && oldBlog.image !== updateData.image) {
                await deleteFileFromUrl(oldBlog.image)
            }
        }

        const result = await db.collection('blogs').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    if (!checkAuth(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { id } = params
        const db = await getDatabase()

        // Cleanup: Delete image from Supabase
        const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) })
        if (blog && blog.image) {
            await deleteFileFromUrl(blog.image)
        }

        const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
    }
}
