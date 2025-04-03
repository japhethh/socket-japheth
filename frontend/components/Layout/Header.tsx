'use client'
// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const router = useRouter()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {

    try {
      const response = await fetch('/api/auth/logout', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
      })


      if (!response.ok) throw new Error("Logout failed")

      router.push("/login")

    } catch (error) {
      console.log("Logout error:", error)
    }
    // Implement logout logic here
    // This might involve clearing tokens, session storage, etc.

    console.log('Logging out');
    // Example: router.push('/login') or calling an auth service
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo and Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Logo
          </Link>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
              Dashboard
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-800">
              Projects
            </Link>
            <Link href="/reports" className="text-gray-600 hover:text-gray-800">
              Reports
            </Link>
          </div>
        </div>


        {/* Right side - User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">JD</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
              <div className="py-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Optional: Global click outside handler for dropdown
function useOutsideClick(ref, callback) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}