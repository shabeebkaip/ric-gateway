import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/db/connection';
import Category from '@/lib/db/models/Category';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET single category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const category = await Category.findOne({ slug, isActive: true });
    
    if (!category) {
      return apiError('Category not found', 404);
    }
    
    return apiResponse({ category });
  } catch (error: any) {
    console.error('Get category error:', error);
    return apiError('Failed to fetch category', 500);
  }
}

// PUT update category (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { slug } = await params;
      const data = await req.json();
      
      const category = await Category.findOneAndUpdate(
        { slug },
        data,
        { new: true, runValidators: true }
      );
      
      if (!category) {
        return apiError('Category not found', 404);
      }
      
      revalidateTag('categories', 'hours');
      return apiResponse({ category });
    } catch (error: any) {
      console.error('Update category error:', error);
      return apiError(error.message || 'Failed to update category', 500);
    }
  });
}

// DELETE category (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { slug } = await params;
      
      const category = await Category.findOneAndDelete({ slug });
      
      if (!category) {
        return apiError('Category not found', 404);
      }
      
      revalidateTag('categories', 'hours');
      return apiResponse({ message: 'Category deleted successfully' });
    } catch (error: any) {
      console.error('Delete category error:', error);
      return apiError('Failed to delete category', 500);
    }
  });
}
