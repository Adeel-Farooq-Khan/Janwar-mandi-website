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
  FaBars,
  FaTimes,
} from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Close sidebar when screen size changes to larger than md breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSignOut = () => {
    // You can add any sign-out logic here (clear tokens, etc.)
    router.push("/admin/adminlogin")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen flex">
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="fixed inset-0  bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed text-lg font-medium top-0 left-0 h-full w-[250px] bg-[#2c3e50] text-white z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:w-[250px] shadow-lg`}
      >
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Janwar Mandi Admin</h1>
          <button className="text-white md:hidden" onClick={toggleSidebar}>
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-6 px-4">
          <Link href="/admin/admindashboard" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaTachometerAlt /> <span>Dashboard</span>
          </Link>

          <Link href="/admin/animals" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaPaw /> <span>Animals</span>
          </Link>

          <Link href="/admin/users" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaUsers /> <span>Users</span>
          </Link>

          {/* Categories Link (without dropdown) */}
          <Link href="/admin/categories" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaThList /> <span>Categories</span>
          </Link>

          {/* New Subcategories Link */}
          <Link href="/admin/subcategories" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaLayerGroup /> <span>Subcategories</span>
          </Link>

          <Link href="/admin/breeds" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaCog /> <span>Breeds</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-[250px] flex flex-col">
        <header className="fixed top-0 left-0 md:left-[250px] right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-30 border-b">
          {/* Hamburger menu for mobile */}
          <button className="text-gray-700 md:hidden" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-gray-500" />
              <span className="text-gray-700 font-medium hidden sm:inline">Admin User</span>
              <button onClick={handleSignOut} className="ml-4 flex items-center gap-1 text-red-500 hover:text-red-700">
                <FaSignOutAlt />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
