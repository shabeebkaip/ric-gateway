import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import { apiResponse, apiError } from '@/lib/api-middleware';

export async function GET(request: NextRequest) {
  const user = verifyAdmin(request);
  
  if (!user) {
    return apiError('Unauthorized', 401);
  }
  
  return apiResponse({ user });
}
