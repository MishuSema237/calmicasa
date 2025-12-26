import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export const bucketName = 'calmicasa'

/**
 * Extracts the filename from a Supabase public URL and deletes it from the bucket.
 */
export async function deleteFileFromUrl(url: string) {
    if (!url) return
    try {
        // Example URL: https://[proj].supabase.co/storage/v1/object/public/calmicasa/1734703812234-image.png
        const parts = url.split(`${bucketName}/`)
        if (parts.length < 2) return

        const fileName = parts[1]
        const { error } = await supabase.storage.from(bucketName).remove([fileName])
        if (error) {
            console.error('Error deleting file from Supabase:', error)
        }
    } catch (e) {
        console.error('Failed to parse Supabase URL for deletion:', e)
    }
}
