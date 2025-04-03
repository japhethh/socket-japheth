'use client'
import { useState } from 'react'

type TaskItemProps = {
  task: {
    id: string // Changed from number to string
    title: string
    completed: boolean
  }
  onUpdate: () => void
  onDelete: () => void
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const updateTask = async (updatedData: { title?: string, completed?: boolean }) => {
    try {
      const res = await fetch(`/api/task/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to update')
      }
      onUpdate()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task')
    }
  }

  const handleToggleComplete = async () => {
    await updateTask({ completed: !task.completed })
  }

  const handleEditSubmit = async () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      await updateTask({ title: editedTitle })
    }
    setIsEditing(false)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/task`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to delete')
      }
      onDelete()
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Failed to delete task')
    }
  }

  return (
    <li className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
      <div className="flex items-center space-x-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="h-5 w-5 rounded text-blue-500"
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
            className="flex-1 p-1 border rounded"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </div>

      <button
        onClick={() => handleDelete(task.id)} // Fixed click handler
        className="text-red-500 hover:text-red-700 p-1"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  )
}