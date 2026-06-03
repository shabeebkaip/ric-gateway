import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import BlogPost from '@/lib/db/models/BlogPost';
import { withAuth, apiResponse, apiError, handleApiRouteError } from '@/lib/api-middleware';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const all = searchParams.get('all'); // admin: include unpublished

    const filter: Record<string, unknown> = all === 'true' ? {} : { isPublished: true };
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;

    const posts = await BlogPost.find(filter)
      .sort({ order: 1, publishedAt: -1 })
      .lean();

    return apiResponse({ posts });
  } catch {
    return apiError('Failed to fetch posts', 500);
  }
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const data = await req.json();

      const existing = await BlogPost.findOne({ slug: data.slug });
      if (existing) return apiError('A post with this slug already exists', 409);

      if (data.isPublished && !data.publishedAt) {
        data.publishedAt = new Date();
      }

      const post = await BlogPost.create(data);
      revalidateTag('blog-posts', 'hours');
      return apiResponse({ post }, 201);
    } catch (error) {
      return handleApiRouteError(error, 'Failed to create post', 'Invalid post data');
    }
  });
}
