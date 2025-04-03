import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { hashPassword } from '@/utils/bcrypt'
import prisma from '@/lib/prisma'

const generateToken = (userId: string) => {
  const secret = process.env.JWT_SECRET
  const expiresIn = "1h"

  if (!secret) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign({ userId }, secret, { expiresIn })
}

export const POST = async (req: Request) => {
  try {
    const { email, password, name, age } = await req.json()


    // check exist
    const existUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)


    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age
      }
    })

    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword }, { status: 201 }
    )

  } catch (error) {
    console.error('Register error', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}