'use client'

import { CoreApi } from '@/lib/Axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await CoreApi.post('/auth/login', {
        email,
        password
      }, {
        withCredentials: true // Important for cookies
      })

      if (response.data.success) {
        router.push('/tasknew')
        router.refresh() // Ensure client state updates
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Login failed:', error)
      setError(
        error.response?.data?.message ||
        'Login failed. Please try again later'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-full bg-gray-50'>
      <form
        onSubmit={handleLogin}
        className='flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md w-full max-w-md'
      >
        <h1 className='text-2xl font-bold text-center'>Login</h1>

        {error && (
          <div className='text-red-500 text-sm p-2 bg-red-50 rounded'>
            {error}
          </div>
        )}

        <div className='space-y-1'>
          <label htmlFor='email' className='block text-sm font-medium'>
            Email
          </label>
          <input
            id='email'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className='space-y-1'>
          <label htmlFor='password' className='block text-sm font-medium'>
            Password
          </label>
          <input
            id='password'
            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center text-sm text-gray-600">
          Dont have an account?
          <Link
            href="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Page