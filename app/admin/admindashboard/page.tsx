// app/dashboard/page.tsx (or pages/dashboard.tsx depending on your setup)

"use client"

import AdminLayout from "@/components/AdminLayout"
import { BiCategory } from "react-icons/bi"
import { BsListNested } from "react-icons/bs"
import { FaUsers, FaPaw, FaListAlt } from "react-icons/fa"

export default function Dashboard() {
  const stats = {
    totalUsers: 123,
    totalAnimals: 456,
    totalCategories: 7,
    totalSubCategories: 15,
    totalBreeds: 20,
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">
            <FaPaw />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Animals</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalAnimals}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl">
            <FaListAlt />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Categories</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalCategories}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl">
          <BsListNested />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">SubCategories</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalSubCategories}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xl">
          <BiCategory />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">Breeds</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalBreeds}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
