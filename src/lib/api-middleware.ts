import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function withAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: any) => Promise<NextResponse>
) {
  const user = verifyAdmin(request);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized - Admin access required' },
      { status: 401 }
    );
  }
  
  return handler(request, user);
}

export function apiResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}
