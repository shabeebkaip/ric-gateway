import { NextRequest } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { withAuth, apiResponse, apiError } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      const folder = (formData.get('folder') as string) || 'ric-gateway';
      
      if (!file) {
        return apiError('No file provided', 400);
      }
      
      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
      
      // Upload to Cloudinary
      const result = await uploadToCloudinary(base64, folder);
      
      return apiResponse({ url: result.url, publicId: result.publicId });
    } catch (error: any) {
      console.error('Upload error:', error);
      return apiError(error.message || 'Failed to upload file', 500);
    }
  });
}
