import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Content from '@/lib/db/models/Content';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET all sections for a page (public)
// e.g. GET /api/content/home → { content: { hero: {...}, cta: {...} } }
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await connectDB();
    const { key } = await params;

    const docs = await Content.find({ page: key, isActive: true }).lean();

    const content: Record<string, unknown> = {};
    docs.forEach((doc) => {
      content[doc.section] = doc.content;
    });

    return apiResponse({ content });
  } catch (error: unknown) {
    console.error('Get content error:', error);
    return apiError('Failed to fetch content', 500);
  }
}

// PUT update one or more sections for a page (admin only)
// Body: { hero: { title: '...' }, cta: { ... } }
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      const { key } = await params;
      const body = await req.json();

      if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return apiError('Request body must be an object of sections', 400);
      }

      const entries = Object.entries(body as Record<string, unknown>);
      if (entries.length === 0) {
        return apiError('No sections provided', 400);
      }

      const updated: Record<string, unknown> = {};
      await Promise.all(
        entries.map(async ([section, content]) => {
          const doc = await Content.findOneAndUpdate(
            { page: key, section },
            { page: key, section, content, isActive: true },
            { upsert: true, new: true, runValidators: true }
          );
          updated[section] = doc.content;
        })
      );

      return apiResponse({ content: updated });
    } catch (error: unknown) {
      console.error('Update content error:', error);
      return apiError('Failed to update content', 500);
    }
  });
}

// DELETE all content for a page (admin only)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  return withAuth(_request, async () => {
    try {
      await connectDB();
      const { key } = await params;

      const result = await Content.deleteMany({ page: key });

      if (result.deletedCount === 0) {
        return apiError('Content not found', 404);
      }

      return apiResponse({ message: `Deleted ${result.deletedCount} section(s) for page "${key}"` });
    } catch (error: unknown) {
      console.error('Delete content error:', error);
      return apiError('Failed to delete content', 500);
    }
  });
}
