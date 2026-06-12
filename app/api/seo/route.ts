import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { readSeo, writeSeo } from '@/lib/seo';
import type { CMSSeo } from '@/lib/seo';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
  return withAuth(request, async () => {
    try {
      const seo = await readSeo();
      return apiResponse(seo);
    } catch (err) {
      console.error('[SEO] GET failed:', err);
      return apiError('Failed to fetch SEO settings', 500);
    }
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const body = (await req.json()) as CMSSeo;
      await writeSeo(body);
      revalidatePath('/', 'layout');
      revalidatePath('/robots.txt');
      revalidatePath('/sitemap.xml');
      return apiResponse({ success: true });
    } catch (err) {
      console.error('[SEO] POST failed:', err);
      return apiError('Failed to save SEO settings', 500);
    }
  });
}
