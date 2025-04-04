import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


export const GET = async () => {
  const users = await prisma.user.findMany()
  if (!users) {
    return NextResponse.json({ message: "Users not found!" })
  }
  return NextResponse.json(users)

}
