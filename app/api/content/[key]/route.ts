import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Content from '@/lib/db/models/Content';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET single content by key
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await connectDB();
    const { key } = await params;
    
    const content = await Content.findOne({ key, isActive: true });
    
    if (!content) {
      return apiError('Content not found', 404);
    }
    
    return apiResponse({ content });
  } catch (error: any) {
    console.error('Get content error:', error);
    return apiError('Failed to fetch content', 500);
  }
}

// PUT update content (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { key } = await params;
      const data = await req.json();
      
      const content = await Content.findOneAndUpdate(
        { key },
        data,
        { new: true, runValidators: true }
      );
      
      if (!content) {
        return apiError('Content not found', 404);
      }
      
      return apiResponse({ content });
    } catch (error: any) {
      console.error('Update content error:', error);
      return apiError(error.message || 'Failed to update content', 500);
    }
  });
}

// DELETE content (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { key } = await params;
      
      const content = await Content.findOneAndDelete({ key });
      
      if (!content) {
        return apiError('Content not found', 404);
      }
      
      return apiResponse({ message: 'Content deleted successfully' });
    } catch (error: any) {
      console.error('Delete content error:', error);
      return apiError('Failed to delete content', 500);
    }
  });
}
