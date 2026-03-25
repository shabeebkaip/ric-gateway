import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import ContactEnquiry from '@/lib/db/models/ContactEnquiry';
import { sendContactEnquiryEmail } from '@/lib/email';
import { apiResponse, apiError } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return apiError('Name, email, and message are required', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiError('Invalid email address', 400);
    }

    const enquiry = await ContactEnquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message.trim(),
    });

    // Fire-and-forget — don't let email failure block the response
    sendContactEnquiryEmail({ name, email, phone, company, message }).catch((err) =>
      console.error('Contact enquiry email failed:', err)
    );

    return apiResponse({ id: enquiry._id, message: 'Enquiry submitted successfully' }, 201);
  } catch (error) {
    console.error('Contact enquiry error:', error);
    return apiError('Failed to submit enquiry', 500);
  }
}
