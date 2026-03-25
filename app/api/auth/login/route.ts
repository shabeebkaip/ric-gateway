import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { signToken } from '@/lib/auth';
import { apiError, apiResponse, getClientIp, isNonEmptyString } from '@/lib/api-middleware';
import { consumeRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
      return apiError('Email and password are required', 400);
    }

    const rateLimit = consumeRateLimit('auth-login', getClientIp(request), 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return apiError('Too many login attempts. Please try again later.', 429);
    }

    await connectDB();
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return apiError('Invalid credentials', 401);
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return apiError('Invalid credentials', 401);
    }
    
    // Generate token
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    
    const response = apiResponse({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
    // Set cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return apiError('Login failed', 500);
  }
}
