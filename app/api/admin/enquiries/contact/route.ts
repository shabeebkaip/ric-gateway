import { NextRequest, NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';
import { verifyAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/db/connection';
import ContactEnquiry from '@/lib/db/models/ContactEnquiry';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id, status } = await req.json().catch(() => ({}));
  if (!isValidObjectId(id) || !['new', 'read', 'replied'].includes(status)) {
    return NextResponse.json({ error: 'Invalid id or status' }, { status: 400 });
  }
  await connectDB();
  const enquiry = await ContactEnquiry.findByIdAndUpdate(id, { status }, { new: true });
  if (!enquiry) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  return NextResponse.json({ enquiry });
}
