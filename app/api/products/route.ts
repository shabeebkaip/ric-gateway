import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Product from '@/lib/db/models/Product';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET all products (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const partner = searchParams.get('partner');
    const type = searchParams.get('type');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    
    const filter: any = { isActive: true };
    
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (partner) filter.partner = partner;
    if (type) filter.type = type;
    if (featured === 'true') filter.isFeatured = true;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    const products = await Product.find(filter).sort({ order: 1, createdAt: -1 });
    
    return apiResponse({ products });
  } catch (error: any) {
    console.error('Get products error:', error);
    return apiError('Failed to fetch products', 500);
  }
}

// POST new product (admin only)
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      
      const data = await req.json();
      
      // Check if slug exists
      const existing = await Product.findOne({ slug: data.slug });
      if (existing) {
        return apiError('Product with this slug already exists', 409);
      }
      
      const product = await Product.create(data);
      
      return apiResponse({ product }, 201);
    } catch (error: any) {
      console.error('Create product error:', error);
      return apiError(error.message || 'Failed to create product', 500);
    }
  });
}
