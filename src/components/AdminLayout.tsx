// In AdminLayout.tsx
"use client"

import {
  FaUserCircle,
  FaPaw,
  FaUsers,
  FaThList,
  FaCog,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isCategoryOpen, setCategoryOpen] = useState(false)

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

      {/* Categories Dropdown */}
<div className="w-full">
  <div
    onClick={() => router.push("/admin/categories")}
    className="flex items-center justify-between cursor-pointer hover:text-gray-300"
  >
    <div className="flex items-center gap-2">
      <FaThList />
      <span className="max-md:hidden">Categories</span>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation() // Prevent route push when arrow is clicked
        setCategoryOpen((prev) => !prev)
      }}
      className="text-sm ml-auto"
    >
      {isCategoryOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  </div>

  {/* Dropdown Submenu */}
  <div
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      isCategoryOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
    }`}
  >
    <div className="ml-6 flex flex-col gap-2 text-sm text-gray-200">
      <Link href="/admin/categories/dairy" className="hover:text-white">
        Dairy
      </Link>
      <Link href="/admin/categories/meat" className="hover:text-white">
        Meat
      </Link>
      <Link href="/admin/categories/qurbani" className="hover:text-white">
        Qurbani
      </Link>
    </div>
  </div>
</div>

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
            <div className="flex items-center gap-2 cursor-pointer">
              <FaUserCircle className="text-2xl text-gray-500" />
              <span className="text-gray-700 font-medium max-md:hidden">Admin User</span>
            </div>
          </div>
        </header>

        <main className="mt-16 p-6">{children}</main>
      </div>
    </div>
  )
}
