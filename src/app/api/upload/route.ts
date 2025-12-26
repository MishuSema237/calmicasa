import { NextRequest, NextResponse } from 'next/server'
import { supabase, bucketName } from '@/lib/supabase'
import { verifyToken } from '@/lib/auth'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function POST(request: NextRequest) {
    const user = checkAuth(request)
    if (!user || (!user.isAdmin)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 })
        }

        const buffer = await file.arrayBuffer()
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`

        // Upload to Supabase Storage
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (error) {
            console.error('Supabase Upload Error:', error)
            throw error
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(filename)

        return NextResponse.json({ success: true, url: publicUrl, filename })

    } catch (error: any) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
    }
}
