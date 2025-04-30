"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaEdit, FaTrash,  FaBan, FaCheck } from "react-icons/fa"

export default function CategoriesPage() {
  return (
    <AdminLayout>

   <div className="admin-categories-page pb-8">

      {/* Page Header */}
      <div className="admin-page-header flex justify-between items-center mb-6">
        <h1 className="admin-page-title text-2xl font-semibold">Manage Categories</h1>
        <button className="admin-add-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlus /> Add Category
        </button>
      </div>

 

      {/* Table Container for Categories */}
      <div className="admin-table-container overflow-x-auto">
        <table className="admin-table w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Label</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy Categories Data */}
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">Dairy</td>
              <td className="px-4 py-2 border-b">Dairy products category</td>
              <td className="px-4 py-2 border-b">
                <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                  Active
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <div className="admin-actions flex gap-2">
                  <button className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                    <FaEdit />
                  </button>
                  <button className="admin-action-button toggle bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
                    <FaBan />
                  </button>
                  <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>

            {/* More dummy data rows */}
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">Meat</td>
              <td className="px-4 py-2 border-b">Meat products category</td>
              <td className="px-4 py-2 border-b">
                <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#ffebee] text-[#c62828]">
                  Inactive
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <div className="admin-actions flex gap-2">
                  <button className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                    <FaEdit />
                  </button>
                  <button className="admin-action-button toggle bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
                    <FaCheck />
                  </button>
                  <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">Qurbani</td>
              <td className="px-4 py-2 border-b">Qurbani animals category</td>
              <td className="px-4 py-2 border-b">
                <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                  Active
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                <div className="admin-actions flex gap-2">
                  <button className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                    <FaEdit />
                  </button>
                  <button className="admin-action-button toggle bg-orange-500 hover:bg-orange-600 text-white p-2 rounded">
                    <FaBan />
                  </button>
                  <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  )
}
