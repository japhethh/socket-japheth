import { NextResponse, NextRequest } from 'next/server'
import { verifyToken } from './lib/verifyToken'

// Public routes that don't require authentication
const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get('authToken')?.value

  // Redirect to login if no token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify token
  const decoded = await verifyToken(token)
  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Continue to protected route
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}