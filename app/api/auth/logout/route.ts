import { NextResponse } from 'next/server';
import { apiResponse } from '@/lib/api-middleware';

export async function POST() {
  const response = apiResponse({ message: 'Logged out successfully' });
  
  response.cookies.delete('admin-token');
  
  return response;
}
