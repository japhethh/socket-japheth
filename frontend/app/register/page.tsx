'use client'
import { CoreApi } from '@/lib/Axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
const Register = () => {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const route = useRouter()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await CoreApi.post("/auth/register", { name, email, age, password })

      console.log(response.data.user)
      console.log(email)
      route.push("/login")

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios errors (e.g., server response errors)
        const errorMessage = error.response?.data?.message || "Registration failed. Please try again."
        alert(errorMessage)
      } else {
        // Handle generic errors (e.g., network errors, runtime errors)
        console.error("Registration error:", error)
        alert("An unexpected error occurred. Please try again.")
      }
    }
  }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div >
        <form onSubmit={handleRegister} className="flex flex-col gap-3">

          <div>
            <input className="className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <input className="className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'" type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input className="className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'" type="number" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <input className="className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'" type="text" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="bg-blue-500 rounded-sm py-2 px-5 text-white">Submits what's up nigga</button>
        </form>

      </div>

    </div>
  )
}

export default Register