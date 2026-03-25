import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';
import { connectDB } from '@/lib/db/connection';
import Partner from '@/lib/db/models/Partner';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET single partner
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const partner = await Partner.findOne({ slug, isActive: true });
    
    if (!partner) {
      return apiError('Partner not found', 404);
    }
    
    return apiResponse({ partner });
  } catch (error: any) {
    console.error('Get partner error:', error);
    return apiError('Failed to fetch partner', 500);
  }
}

// PUT update partner (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { slug } = await params;
      const data = await req.json();
      
      const partner = await Partner.findOneAndUpdate(
        { slug },
        data,
        { new: true, runValidators: true }
      );
      
      if (!partner) {
        return apiError('Partner not found', 404);
      }
      
      revalidateTag('partners', 'hours');
      return apiResponse({ partner });
    } catch (error: any) {
      console.error('Update partner error:', error);
      return apiError(error.message || 'Failed to update partner', 500);
    }
  });
}

// DELETE partner (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { slug } = await params;
      
      const partner = await Partner.findOneAndDelete({ slug });
      
      if (!partner) {
        return apiError('Partner not found', 404);
      }
      
      revalidateTag('partners', 'hours');
      return apiResponse({ message: 'Partner deleted successfully' });
    } catch (error: any) {
      console.error('Delete partner error:', error);
      return apiError('Failed to delete partner', 500);
    }
  });
}
