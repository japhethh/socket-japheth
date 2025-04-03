import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const tasks = await prisma.helloLord.findMany({
      orderBy: { createdAt: 'desc' } // Changed from 'id' to 'createdAt'
    })

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

// tite
export const POST = async (req: Request) => {
  try {
    const { title } = await req.json()

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      )
    }

    const newTask = await prisma.task.create({
      data: { title }
    })

    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create task' }, // Fixed error message
      { status: 500 }
    )
  }
}



export async function DELETE(
  request: Request,
) {

  const { id } = await request.json()
  try {


    // Verify task exists
    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      console.error('Task not found with ID:', id)
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    // Perform deletion
    await prisma.task.delete({
      where: { id }
    })

    console.log('Successfully deleted task with ID:', id) // Debug log
    return NextResponse.json(
      { success: true, message: 'Task deleted successfully' },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Full delete error:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete task',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, completed } = await req.json() // Changed from 'complete' to 'completed'
    const { id } = params

    // Validate MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { error: 'Invalid task ID format' },
        { status: 400 }
      )
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title,
        completed: completed
      }
    })

    return NextResponse.json(updatedTask)
  } catch (error: any) {
    console.error('Update error:', error)
    return NextResponse.json(
      {
        error: "Failed to update task",
        details: error.message
      },
      { status: 500 }
    )
  }
}