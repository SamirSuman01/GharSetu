import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email?: string
  phone?: string
  city?: string
  investmentRange?: string
  message?: string
  budget?: string
  preferredLocation?: string
  formType: 'contact' | 'consultation' | 'catalogue'
}

interface Submission {
  id: string
  name: string
  email?: string
  phone?: string
  city?: string
  investmentRange?: string
  message?: string
  budget?: string
  preferredLocation?: string
  formType: string
  submittedAt: string
  userAgent?: string
}

// In-memory storage for demo mode (resets on server restart)
// In production, replace with database
const submissions: Submission[] = []

// Simple input sanitization to prevent XSS
function sanitizeInput(input: string | undefined): string | undefined {
  if (!input) return input
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// Rate limiting: simple in-memory tracker
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const data: ContactFormData = await request.json()

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(data.name) || '',
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      city: sanitizeInput(data.city),
      investmentRange: sanitizeInput(data.investmentRange),
      message: sanitizeInput(data.message),
      budget: sanitizeInput(data.budget),
      preferredLocation: sanitizeInput(data.preferredLocation),
      formType: data.formType,
    }

    // Validate required fields
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name is required and must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (sanitizedData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(sanitizedData.email)) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid email address' },
          { status: 400 }
        )
      }
    }

    // Validate phone if provided
    if (sanitizedData.phone) {
      const phoneRegex = /^[+]?[\d\s-]{10,}$/
      if (!phoneRegex.test(sanitizedData.phone.replace(/\s/g, ''))) {
        return NextResponse.json(
          { success: false, error: 'Please enter a valid phone number' },
          { status: 400 }
        )
      }
    }

    // Validate form type
    if (!['contact', 'consultation', 'catalogue'].includes(sanitizedData.formType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid form type' },
        { status: 400 }
      )
    }

    // Create submission record
    const submission: Submission = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      ...sanitizedData,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
    }

    // Store submission
    // Option 1: If Supabase is configured, use it
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      try {
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(submission),
        })

        if (!response.ok) {
          console.error('Supabase error:', await response.text())
          // Fall through to in-memory storage
        }
      } catch (dbError) {
        console.error('Database error:', dbError)
        // Fall through to in-memory storage
      }
    }

    // Option 2: Store in memory (for demo/development)
    submissions.push(submission)

    // Keep only last 100 submissions in memory
    if (submissions.length > 100) {
      submissions.shift()
    }

    // Log submission (useful for demo)
    console.log(`[${new Date().toISOString()}] New ${sanitizedData.formType} submission:`, {
      id: submission.id,
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      formType: sanitizedData.formType,
    })

    // Send email notification if configured
    if (process.env.EMAIL_SERVICE_API_KEY) {
      // Email sending would go here
      // Example with Resend, SendGrid, etc.
      console.log('Email notification would be sent here')
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      submissionId: submission.id,
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve submissions (protected, for admin use)
export async function GET(request: NextRequest) {
  // Simple API key protection for admin access
  const apiKey = request.headers.get('x-api-key')

  if (!process.env.ADMIN_API_KEY || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    success: true,
    count: submissions.length,
    submissions: submissions.slice(-50), // Return last 50
  })
}
