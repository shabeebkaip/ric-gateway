import { NextRequest } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { connectDB } from '@/lib/db/connection';
import BlogPost from '@/lib/db/models/BlogPost';
import { apiResponse, apiError, handleApiRouteError } from '@/lib/api-middleware';
import { calculateReadTime } from '@/lib/blogUtils';

// Draft-only endpoint for the scheduled blog writer.
// Authenticated by BLOG_DRAFT_API_KEY; can only create unpublished posts.
function validKey(provided: string | null): boolean {
  const expected = process.env.BLOG_DRAFT_API_KEY;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Lets the writer see every existing post (incl. drafts) to avoid repeating topics
export async function GET(request: NextRequest) {
  if (!validKey(request.headers.get('x-api-key'))) {
    return apiError('Unauthorized', 401);
  }
  await connectDB();
  const posts = await BlogPost.find({}, { title: 1, slug: 1, isPublished: 1, createdAt: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return apiResponse({ posts });
}

export async function POST(request: NextRequest) {
  if (!validKey(request.headers.get('x-api-key'))) {
    return apiError('Unauthorized', 401);
  }
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, tags, metaTitle, metaDescription, focusKeyword, author } = body ?? {};

    await connectDB();
    if (await BlogPost.exists({ slug })) return apiError('A post with this slug already exists', 409);

    const post = await BlogPost.create({
      title, slug, excerpt, content, category, tags, metaTitle, metaDescription, focusKeyword,
      author: author ?? { name: 'Riyadh International Corporation', role: 'Editorial Team' },
      readTime: typeof content === 'string' ? calculateReadTime(content) : 1,
      isPublished: false, // always a draft — a human publishes from Admin → Blog
      isFeatured: false,
    });
    return apiResponse({ id: post._id, slug: post.slug, status: 'draft' }, 201);
  } catch (error) {
    return handleApiRouteError(error, 'Failed to create draft', 'Invalid post data');
  }
}
