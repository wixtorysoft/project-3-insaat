import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Lütfen zorunlu alanları doldurun.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM

    console.log('Contact form submission:', {
      name,
      email,
      phone: body.phone || 'Belirtilmedi',
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
