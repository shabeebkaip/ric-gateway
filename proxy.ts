import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Redirect manager ────────────────────────────────────────────────────────
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
    try {
      const redirectsUrl = new URL('/api/seo/redirects', request.url);
      const res = await fetch(redirectsUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const redirects: Array<{ from: string; to: string; code: 301 | 302; enabled: boolean }> =
          await res.json();
        const match = redirects.find((r) => r.enabled && r.from && pathname === r.from);
        if (match) {
          const dest = new URL(match.to, request.url);
          return match.code === 301
            ? NextResponse.redirect(dest, 308)
            : NextResponse.redirect(dest, 307);
        }
      }
    } catch {
      // Non-fatal — continue with normal routing
    }
  }

  // ── Admin auth gate ─────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|otf)).*)'],
};
