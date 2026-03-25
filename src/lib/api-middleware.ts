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

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

export function handleApiRouteError(
  error: unknown,
  fallbackMessage: string,
  validationMessage: string = 'Invalid request data'
) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'ValidationError'
  ) {
    return apiError(validationMessage, 400);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'CastError'
  ) {
    return apiError('Invalid request data', 400);
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 11000
  ) {
    return apiError('Resource already exists', 409);
  }

  return apiError(fallbackMessage, 500);
}
