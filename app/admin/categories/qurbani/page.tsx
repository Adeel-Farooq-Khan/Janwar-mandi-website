// app/admin/categories/qurbani/page.tsx

"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaPlus } from "react-icons/fa"

export default function QurbaniCategoryPage() {
  return (
    <AdminLayout>
      <div className="pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Qurbani Subcategories</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Add Subcategory
          </button>
        </div>

        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Subcategory</th>
                <th className="px-4 py-2 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {["Goat", "Sheep", "Cow", "Camel"].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-medium">{item}</td>
                  <td className="px-4 py-2 border-b">This is the {item.toLowerCase()} subcategory.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
