"use client"

import type React from "react"

import {
  FaUserCircle,
  FaPaw,
  FaUsers,
  FaThList,
  FaCog,
  FaTachometerAlt,
  FaSignOutAlt,
  FaLayerGroup,
} from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleSignOut = () => {
    // You can add any sign-out logic here (clear tokens, etc.)
    router.push("/admin/adminlogin")
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="fixed text-lg font-medium top-0 left-0 h-full w-[250px] bg-[#2c3e50] text-white max-md:w-[60px] z-40">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold max-md:hidden">Janwar Mandi Admin</h1>
        </div>

        <nav className="flex flex-col gap-4 mt-6 px-4">
          <Link href="/admin/admindashboard" className="flex items-center gap-2 hover:text-gray-300">
            <FaTachometerAlt /> <span className="max-md:hidden">Dashboard</span>
          </Link>

          <Link href="/admin/animals" className="flex items-center gap-2 hover:text-gray-300">
            <FaPaw /> <span className="max-md:hidden">Animals</span>
          </Link>

          <Link href="/admin/users" className="flex items-center gap-2 hover:text-gray-300">
            <FaUsers /> <span className="max-md:hidden">Users</span>
          </Link>

          {/* Categories Link (without dropdown) */}
          <Link href="/admin/categories" className="flex items-center gap-2 hover:text-gray-300">
            <FaThList /> <span className="max-md:hidden">Categories</span>
          </Link>

          {/* New Subcategories Link */}
          <Link href="/admin/subcategories" className="flex items-center gap-2 hover:text-gray-300">
            <FaLayerGroup /> <span className="max-md:hidden">Subcategories</span>
          </Link>

          <Link href="/admin/breeds" className="flex items-center gap-2 hover:text-gray-300">
            <FaCog /> <span className="max-md:hidden">Breeds</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] max-md:ml-[60px] flex flex-col">
        <header className="fixed top-0 left-[250px] max-md:left-[60px] right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-30 border-b">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-gray-500" />
              <span className="text-gray-700 font-medium max-md:hidden">Admin User</span>
              <button onClick={handleSignOut} className="ml-4 flex items-center gap-1 text-red-500 hover:text-red-700">
                <FaSignOutAlt />
                <span className="max-md:hidden">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
