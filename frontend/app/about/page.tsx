"use client"

import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Deploy application', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      completed: false
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-extrabold text-center mb-6">Todo List</h1>

                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    className="flex-grow p-2 border rounded"
                    placeholder="Enter a new todo"
                  />
                  <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>

                <ul className="space-y-2 mt-4">
                  {todos.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="mr-3"
                        />
                        <span
                          className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>

                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}