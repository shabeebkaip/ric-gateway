import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Category from '@/lib/db/models/Category';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET all categories (public)
export async function GET() {
  try {
    await connectDB();
    
    const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 });
    
    return apiResponse({ categories });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return apiError('Failed to fetch categories', 500);
  }
}

// POST new category (admin only)
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      
      const data = await req.json();
      
      const existing = await Category.findOne({ slug: data.slug });
      if (existing) {
        return apiError('Category with this slug already exists', 409);
      }
      
      const category = await Category.create(data);
      
      return apiResponse({ category }, 201);
    } catch (error: any) {
      console.error('Create category error:', error);
      return apiError(error.message || 'Failed to create category', 500);
    }
  });
}
