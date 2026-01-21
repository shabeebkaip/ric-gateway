import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { signToken } from '@/lib/auth';
import { apiError, apiResponse } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, email, password, role = 'editor' } = await request.json();
    
    if (!name || !email || !password) {
      return apiError('Name, email, and password are required', 400);
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) {
      return apiError('User already exists', 409);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });
    
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
    }, 201);
    
    // Set cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error: any) {
    console.error('Register error:', error);
    return apiError('Registration failed', 500);
  }
}
