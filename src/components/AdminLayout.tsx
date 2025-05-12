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
  FaTools,
} from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    router.push("/admin/adminlogin")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="h-screen flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
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

          <Link href="/admin/categories" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaThList /> <span>Categories</span>
          </Link>

          <Link href="/admin/subcategories" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaLayerGroup /> <span>Subcategories</span>
          </Link>

          <Link href="/admin/breeds" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaCog /> <span>Breeds</span>
          </Link>

          {/* New Admin Settings Link */}
          <Link href="/admin/adminsettings" className="flex items-center gap-2 hover:text-gray-300 py-2">
            <FaTools /> <span>Admin Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-[250px] flex flex-col">
        <header className="fixed top-0 left-0 md:left-[250px] right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-30 border-b">
          <button className="text-gray-700 md:hidden" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800 ml-4 md:ml-0">Admin Dashboard</h1>

          {/* Admin Dropdown with only Sign Out */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-gray-700"
            >
              <FaUserCircle className="text-2xl" />
              <span className="hidden sm:inline font-medium">Admin User</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-gray-100"
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
