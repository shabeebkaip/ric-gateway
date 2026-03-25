import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Product from '@/lib/db/models/Product';
import { withAuth, apiResponse, apiError, handleApiRouteError } from '@/lib/api-middleware';
import { revalidateTag } from 'next/cache';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const product = await Product.findOne({ slug, isActive: true });
    
    if (!product) {
      return apiError('Product not found', 404);
    }
    
    return apiResponse({ product });
  } catch (error: any) {
    console.error('Get product error:', error);
    return apiError('Failed to fetch product', 500);
  }
}

// PUT update product (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { slug } = await params;
      const data = await req.json();
      
      const product = await Product.findOneAndUpdate(
        { slug },
        data,
        { new: true, runValidators: true }
      );
      
      if (!product) {
        return apiError('Product not found', 404);
      }
      
      revalidateTag('products', 'hours');
      return apiResponse({ product });
    } catch (error: any) {
      console.error('Update product error:', error);
      return handleApiRouteError(error, 'Failed to update product', 'Invalid product data');
    }
  });
}

// DELETE product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { slug } = await params;
      
      const product = await Product.findOneAndDelete({ slug });
      
      if (!product) {
        return apiError('Product not found', 404);
      }
      
      revalidateTag('products', 'hours');
      return apiResponse({ message: 'Product deleted successfully' });
    } catch (error: any) {
      console.error('Delete product error:', error);
      return apiError('Failed to delete product', 500);
    }
  });
}
