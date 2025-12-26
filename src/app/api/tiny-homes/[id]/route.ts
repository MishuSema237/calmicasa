import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { verifyToken } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { deleteFileFromUrl } from '@/lib/supabase'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const db = await getDatabase()

        // Cleanup: Delete all images associated with this model from Supabase
        const home = await db.collection('tiny_homes').findOne({ _id: new ObjectId(params.id) })
        if (home && home.images && Array.isArray(home.images)) {
            await Promise.all(home.images.map((url: string) => deleteFileFromUrl(url)))
        }

        const result = await db.collection('tiny_homes').deleteOne({ _id: new ObjectId(params.id) })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const data = await request.json()
        const { _id, ...updateData } = data // Exclude _id from update

        const db = await getDatabase()

        // Cleanup: Identify and delete removed images
        if (updateData.images && Array.isArray(updateData.images)) {
            const oldHome = await db.collection('tiny_homes').findOne({ _id: new ObjectId(params.id) })
            if (oldHome && oldHome.images && Array.isArray(oldHome.images)) {
                // Find images that exist in oldHome but NOT in updateData
                const removedImages = oldHome.images.filter((url: string) => !updateData.images.includes(url))
                if (removedImages.length > 0) {
                    await Promise.all(removedImages.map((url: string) => deleteFileFromUrl(url)))
                }
            }
        }

        const result = await db.collection('tiny_homes').updateOne(
            { _id: new ObjectId(params.id) },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
