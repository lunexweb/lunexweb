import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  serviceType: z.enum(['web-development', 'marketing'], {
    required_error: 'Please select a service type',
  }),
  projectType: z.enum(['new-project', 'existing-project', 'enquiry'], {
    required_error: 'Please select a project type',
  }),
  budget: z.object({
    amount: z.string().optional(),
    currency: z.enum(['USD', 'ZAR', 'GBP']).optional(),
  }).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // Log the submission (in production, you'd send an email here)
    console.log('Contact form submission received:', {
      name: validatedData.name,
      email: validatedData.email,
      serviceType: validatedData.serviceType,
      projectType: validatedData.projectType,
      budget: validatedData.budget,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    })
    
    // In a real application, you would:
    // 1. Send an email notification
    // 2. Store in a database
    // 3. Send confirmation email to user
    
    return NextResponse.json(
      { message: 'Message sent successfully! We\'ll get back to you soon.' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 