"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa"
import Link from "next/link"
import React, { useState } from "react"

export default function BreedsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [breedName, setBreedName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [breeds, setBreeds] = useState([
    { name: "Angus", category: "Cow", totalAnimals: 35 },
    { name: "Sahiwal", category: "Cow", totalAnimals: 50 },
    { name: "Holstein Friesian", category: "Cow", totalAnimals: 12 },
    { name: "Bhagnari", category: "Cow", totalAnimals: 22 },
    { name: "Brahman", category: "Cow", totalAnimals: 40 },
    { name: "Cholistani", category: "Cow", totalAnimals: 15 },
    { name: "Cross Friesian", category: "Cow", totalAnimals: 18 },
    { name: "Red Sindhi", category: "Cow", totalAnimals: 25 },
    { name: "Tharparker", category: "Cow", totalAnimals: 28 },
  ])
  const categories = ["Cow", "Bull", "Heifer", "Calf"] // Example categories for dropdown

  // Open modal for adding breed
  const openModal = () => {
    setIsModalOpen(true)
  }

  // Close breed modal
  const closeModal = () => {
    setIsModalOpen(false)
    setBreedName("")
    setSelectedCategory("")
  }

  // Handle form submission for adding breed
  const handleAddBreed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!breedName || !selectedCategory) return

    setBreeds([
      ...breeds,
      { name: breedName, category: selectedCategory, totalAnimals: 0 }
    ])
    closeModal()
  }

  return (
    <AdminLayout>
      <div className="admin-breeds-page pb-8">
        {/* Page Header */}
        <div className="admin-page-header flex justify-between items-center mb-6">
          <h1 className="admin-page-title text-2xl font-semibold">Manage Breeds</h1>
          <button
            onClick={openModal}
            className="admin-add-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Breed
          </button>
        </div>

        {/* Breeds Table */}
        <div className="admin-table-container overflow-x-auto">
          <table className="admin-table w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Breed Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Total Animals</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((breed) => (
                <tr key={breed.name} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{breed.name}</td>
                  <td className="px-4 py-2">{breed.category}</td>
                  <td className="px-4 py-2">{breed.totalAnimals}</td>
                  <td className="px-4 py-2">
                    <div className="admin-actions flex gap-2">
                      <Link
                        href="/admin/categories/breeds/edit"
                        className="admin-action-button edit bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                      >
                        <FaEdit />
                      </Link>
                      <button className="admin-action-button delete bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Breed */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Add New Breed</h2>
            <form onSubmit={handleAddBreed} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Breed Name</label>
                <input
                  type="text"
                  value={breedName}
                  onChange={(e) => setBreedName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  <FaSave className="mr-2" /> Save Breed
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
