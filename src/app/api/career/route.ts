import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const coverLetter = formData.get('coverLetter') as string
    const jobSlug = formData.get('jobSlug') as string
    const jobTitle = formData.get('jobTitle') as string
    const cv = formData.get('cv') as File | null

    // Validate required fields
    if (!name || !email || !phone || !cv || !jobSlug) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurun.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    if (!allowedTypes.includes(cv.type)) {
      return NextResponse.json(
        { error: 'Lütfen PDF, DOC veya DOCX formatında dosya yükleyin.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB)
    if (cv.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Dosya boyutu 5MB\'ı aşamaz.' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Save the CV file to cloud storage (S3, GCS, etc.)
    // 2. Store the application in the database
    // 3. Send notification emails
    // 4. Integrate with ATS (Applicant Tracking System)

    console.log('Career application received:', {
      name,
      email,
      phone,
      coverLetter,
      jobSlug,
      jobTitle,
      cvName: cv.name,
      cvSize: cv.size,
      cvType: cv.type,
    })

    return NextResponse.json({
      success: true,
      message: 'Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.',
    })
  } catch (error) {
    console.error('Career application error:', error)
    return NextResponse.json(
      { error: 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}
