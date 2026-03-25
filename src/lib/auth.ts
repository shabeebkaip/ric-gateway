import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'ric-gateway-secret-key';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const signToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
};

export const getTokenFromRequest = (request: NextRequest): string | null => {
  const authHeader = request.headers.get('authorization');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check for cookie
  const token = request.cookies.get('admin-token')?.value;
  return token || null;
};

export const verifyAdmin = (request: NextRequest): JWTPayload | null => {
  const token = getTokenFromRequest(request);
  
  if (!token) {
    return null;
  }
  
  const payload = verifyToken(token);
  
  if (!payload || payload.role !== 'admin') {
    return null;
  }
  
  return payload;
};

  export const verifyAdminToken = (token: string | undefined): JWTPayload | null => {
    if (!token) {
      return null;
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      return null;
    }

    return payload;
  };
