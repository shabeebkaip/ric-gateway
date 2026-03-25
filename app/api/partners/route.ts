import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/db/connection';
import Partner from '@/lib/db/models/Partner';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET all partners (public)
export async function GET() {
  try {
    await connectDB();
    
    const partners = await Partner.find({ isActive: true }).sort({ order: 1, name: 1 });
    
    return apiResponse({ partners });
  } catch (error: any) {
    console.error('Get partners error:', error);
    return apiError('Failed to fetch partners', 500);
  }
}

// POST new partner (admin only)
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      
      const data = await req.json();
      
      const existing = await Partner.findOne({ slug: data.slug });
      if (existing) {
        return apiError('Partner with this slug already exists', 409);
      }
      
      const partner = await Partner.create(data);
      
      revalidateTag('partners', 'hours');
      return apiResponse({ partner }, 201);
    } catch (error: any) {
      console.error('Create partner error:', error);
      return apiError(error.message || 'Failed to create partner', 500);
    }
  });
}
