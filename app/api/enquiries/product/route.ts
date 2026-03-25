import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import ProductEnquiry from '@/lib/db/models/ProductEnquiry';
import { sendProductEnquiryEmail } from '@/lib/email';
import { apiResponse, apiError } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, company, message, productName, productSlug, category, partnerName } = body;

    if (!name || !email || !productName || !productSlug || !category) {
      return apiError('Name, email, and product details are required', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiError('Invalid email address', 400);
    }

    const enquiry = await ProductEnquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      message: message?.trim() || undefined,
      productName,
      productSlug,
      category,
      partnerName: partnerName || undefined,
    });

    sendProductEnquiryEmail({ name, email, phone, company, message, productName, productSlug, category, partnerName }).catch((err) =>
      console.error('Product enquiry email failed:', err)
    );

    return apiResponse({ id: enquiry._id, message: 'Quotation request submitted successfully' }, 201);
  } catch (error) {
    console.error('Product enquiry error:', error);
    return apiError('Failed to submit quotation request', 500);
  }
}
