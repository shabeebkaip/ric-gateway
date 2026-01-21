import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import Content from '@/lib/db/models/Content';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

// GET content by page and section (public)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const section = searchParams.get('section');
    
    // If both page and section provided, get specific content
    if (page && section) {
      const content = await Content.findOne({ page, section, isActive: true });
      if (!content) {
        return apiResponse({ content: null });
      }
      return apiResponse({ content: content.content });
    }
    
    // If only page provided, get all sections for that page
    if (page) {
      const contents = await Content.find({ page, isActive: true });
      const result: Record<string, unknown> = {};
      contents.forEach(c => {
        result[c.section] = c.content;
      });
      return apiResponse({ content: result });
    }
    
    // Get all content grouped by page
    const contents = await Content.find({ isActive: true });
    const result: Record<string, Record<string, unknown>> = {};
    contents.forEach(c => {
      if (!result[c.page]) result[c.page] = {};
      result[c.page][c.section] = c.content;
    });
    
    return apiResponse({ content: result });
  } catch (error: unknown) {
    console.error('Get content error:', error);
    return apiError('Failed to fetch content', 500);
  }
}

// POST/PUT content (admin only) - upserts by page+section
export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();
      
      const data = await req.json();
      const { page, section, content } = data;
      
      if (!page || !section) {
        return apiError('Page and section are required', 400);
      }
      
      const result = await Content.findOneAndUpdate(
        { page, section },
        { page, section, content, isActive: true },
        { upsert: true, new: true }
      );
      
      return apiResponse({ content: result }, 201);
    } catch (error: unknown) {
      console.error('Create/Update content error:', error);
      const message = error instanceof Error ? error.message : 'Failed to save content';
      return apiError(message, 500);
    }
  });
}
