import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { comparePassword } from '@/utils/bcrypt'
import { SignJWT } from 'jose'

// Force Node.js runtime (required for Prisma)
export const runtime = 'nodejs'

const generateToken = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  // return await new SignJWT({ userId })
  //   .setProtectedHeader({ alg: 'HS256' })
  //   .setExpirationTime('1h')
  //   .sign(secret)

  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret)
}

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json()

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await generateToken(user.id.toString())

    // Create response with user data (excluding sensitive info)
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'strict'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    )
  }
}