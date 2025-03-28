// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
}

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
  })

  if (!token) {
    const url = new URL('/auth/signin', req.url)
    url.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (token.role === 'admin' && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  } else if (token.role !== 'admin' && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/user', req.url))
  } else if (token.role === 'user' && req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.next()
  } else if (token.role !== 'user' && req.nextUrl.pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}
