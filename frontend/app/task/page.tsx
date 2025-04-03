// app/components/TaskList.tsx
'use client'
import TaskItem from '@/components/TaskItem'
import { useState, useEffect } from 'react'

type Task = {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export default function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/task')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async () => {
    if (!newTaskTitle.trim()) return

    try {
      const res = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTaskTitle })
      })

      if (!res.ok) throw new Error('Failed to create')

      const newTask = await res.json()
      setTasks([newTask, ...tasks])
      setNewTaskTitle('')
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }


  // const deleteTask = async (id: number) => {
  //   try {
  //     const res = await fetch(`/api/task/${id} `, {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //   } catch (error) {
  //     console.error('Error deleting task:', error)

  //   }
  // }

  if (loading) return <div>Loading tasks...</div>

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createTask()}
          placeholder="Add a new task..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={createTask}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task as any}
            onUpdate={fetchTasks}
            onDelete={fetchTasks}
          />
        ))}
      </ul>
    </div>
  )
}