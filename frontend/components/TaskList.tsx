'use client';
import { useEffect, useState } from 'react';
import { connectSocket } from '@/lib/socket';
import type { Task } from '@/types/task';
import toast from 'react-hot-toast';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketInstance = connectSocket();
    setSocket(socketInstance);

    // Initial data load
    socketInstance.emit('getTasks', (initialTasks: Task[]) => {
      console.log(initialTasks)
      setTasks(initialTasks);
    });

    // Real-time listeners
    socketInstance.on('taskCreated', (newTask: Task) => {
      setTasks(prev => [newTask, ...prev]);
    });

    socketInstance.on('taskUpdated', (updatedTask: Task) => {
      toast('Task created successfully!')
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    });

    socketInstance.on('taskDeleted', (deletedId: string) => {
      setTasks(prev => prev.filter(t => t.id !== deletedId));
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleCreate = () => {
    if (!newTaskTitle.trim() || !socket) return;
    socket.emit('createTask', newTaskTitle);
    setNewTaskTitle('');
  };

  const handleToggle = (id: string, completed: boolean) => {
    socket?.emit('updateTask', { id, completed: !completed });
  };

  const handleDelete = (id: string) => {
    socket?.emit('deleteTask', id);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex mb-4">
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          className="flex-1 p-2 border rounded-l"
          placeholder="New task..."
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id, task.completed)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through' : ''}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}