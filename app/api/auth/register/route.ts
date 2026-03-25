import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db/connection';
import User from '@/lib/db/models/User';
import { apiError, apiResponse, withAuth, isNonEmptyString } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  return withAuth(request, async (req) => {
    try {
      await connectDB();

      const { name, email, password, role = 'editor' } = await req.json();

      if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
        return apiError('Name, email, and password are required', 400);
      }

      if (role !== 'admin' && role !== 'editor') {
        return apiError('Invalid role', 400);
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        return apiError('User already exists', 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
      });

      return apiResponse({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }, 201);
    } catch (error: any) {
      console.error('Register error:', error);
      return apiError('Registration failed', 500);
    }
  });
}
