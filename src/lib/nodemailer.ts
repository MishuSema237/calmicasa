import nodemailer from 'nodemailer'

if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('Please add SMTP configuration to .env.local')
}

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: parseInt(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})

export async function sendEmail({
    to,
    subject,
    html,
    text,
}: {
    to: string
    subject: string
    html?: string
    text?: string
}) {
    try {
        const info = await transporter.sendMail({
            from: `"CalmiCasa" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        })

        console.log('Message sent: %s', info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, error }
    }
}

export default transporter
