// pages/admin/categories/breeds.tsx

"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import Link from "next/link"

export default function BreedsPage() {
  return (
    <AdminLayout>
      <div className="admin-breeds-page pb-8">
        {/* Page Header */}
        <div className="admin-page-header flex justify-between items-center mb-6">
          <h1 className="admin-page-title text-2xl font-semibold">Manage Breeds</h1>
          <Link href="/admin/categories/breeds/add" className="admin-add-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
            <FaPlus /> Add Breed
          </Link>
        </div>

        {/* Breeds Overview */}
        <div className="admin-table-container overflow-x-auto">
          <table className="admin-table w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Breed Name</th>
                <th className="px-4 py-2 border-b">Category</th>
                <th className="px-4 py-2 border-b">Total Animals</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Angus Breed */}
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Angus</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">35</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Sahiwal Breed */}
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Sahiwal</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">50</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Holstein Friesian Breed */}
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Holstein Friesian</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">12</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Additional Breeds Data */}
              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Bhagnari</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">22</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Brahman</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">40</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Cholistani</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">15</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Cross Friesian</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">18</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Red Sindhi</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">25</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
                    <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">Tharparker</td>
                <td className="px-4 py-2 border-b">Cow</td>
                <td className="px-4 py-2 border-b">28</td>
                <td className="px-4 py-2 border-b">
                  <div className="admin-actions flex gap-2">
                    <Link href="/admin/categories/breeds/edit" className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                      <FaEdit />
                    </Link>
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
