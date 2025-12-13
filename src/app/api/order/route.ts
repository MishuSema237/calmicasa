import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendEmail } from '@/lib/nodemailer'
import { verifyToken } from '@/lib/auth'

const checkAuth = (request: NextRequest) => {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) return null
    return verifyToken(authHeader.substring(7))
}

export async function GET(request: NextRequest) {
    const user = checkAuth(request)
    if (!user || !user.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const db = await getDatabase()
        const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray()
        return NextResponse.json(orders)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const { modelName, price, form } = data // form contains personal info + payment preference

        // Save order to DB
        const db = await getDatabase()
        // You might want a separate 'orders' collection
        const order = {
            modelName,
            price,
            customerName: form.name,
            email: form.email,
            phone: form.phone,
            paymentMethod: form.paymentMethod,
            message: form.message,
            status: 'Pending',
            createdAt: new Date()
        }

        await db.collection('orders').insertOne(order)

        // Email to Customer (Receipt)
        await sendEmail({
            to: form.email,
            subject: `Order Receipt - ${modelName}`,
            html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: auto;">
                <h1 style="color: #333;">Order Confirmation</h1>
                <p>Hi ${form.name},</p>
                <p>Thank you for expressing interest in purchasing <strong>${modelName}</strong>.</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background: #f0f0f0;">
                        <th style="padding: 10px; text-align: left;">Item</th>
                        <th style="padding: 10px; text-align: right;">Price</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${modelName}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">${price}</td>
                    </tr>
                </table>
                <p><strong>Payment Method Selected:</strong> ${form.paymentMethod}</p>
                <p>Our sales team will contact you shortly at ${form.phone} to finalize the payment and shipping details.</p>
                <br>
                <p>Regards,<br>CalmiCasa Team</p>
            </div>
        `
        })

        // Email to Admin
        await sendEmail({
            to: process.env.ADMIN_EMAIL || 'admin@calmicasa.com', // Fallback
            subject: `New Order: ${modelName}`,
            html: `
            <h2>New Order Received</h2>
            <p><strong>Customer:</strong> ${form.name}</p>
            <p><strong>Email:</strong> ${form.email}</p>
            <p><strong>Phone:</strong> ${form.phone}</p>
            <p><strong>Model:</strong> ${modelName}</p>
            <p><strong>Payment Method:</strong> ${form.paymentMethod}</p>
            <p><strong>Message:</strong> ${form.message}</p>
        `
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
