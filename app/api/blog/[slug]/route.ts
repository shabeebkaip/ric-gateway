import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import BlogPost from '@/lib/db/models/BlogPost';
import { withAuth, apiResponse, apiError, handleApiRouteError } from '@/lib/api-middleware';
import { revalidateTag } from 'next/cache';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const adminView = searchParams.get('admin') === 'true';

    const filter = adminView ? { slug } : { slug, isPublished: true };
    const post = await BlogPost.findOne(filter).lean();

    if (!post) return apiError('Post not found', 404);
    return apiResponse({ post });
  } catch {
    return apiError('Failed to fetch post', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { slug } = await params;
      const data = await req.json();

      if (data.isPublished && !data.publishedAt) {
        data.publishedAt = new Date();
      }

      const post = await BlogPost.findOneAndUpdate({ slug }, data, {
        new: true,
        runValidators: true,
      });

      if (!post) return apiError('Post not found', 404);
      revalidateTag('blog-posts', 'hours');
      return apiResponse({ post });
    } catch (error) {
      return handleApiRouteError(error, 'Failed to update post', 'Invalid post data');
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withAuth(request, async () => {
    try {
      await connectDB();
      const { slug } = await params;
      const post = await BlogPost.findOneAndDelete({ slug });
      if (!post) return apiError('Post not found', 404);
      revalidateTag('blog-posts', 'hours');
      return apiResponse({ message: 'Post deleted successfully' });
    } catch {
      return apiError('Failed to delete post', 500);
    }
  });
}
