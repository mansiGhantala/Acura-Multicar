import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <FaExclamationTriangle className="text-red-700 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-[#415D8A] mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-[#415D8A] transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
