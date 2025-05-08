"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave, FaEdit, FaTrash } from "react-icons/fa"

// Sample data structure
type Category = {
  id: string
  name: string
}

type Subcategory = {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
}

const SubcategoriesPage = () => {
  // Sample data
  const [categories] = useState<Category[]>([
    { id: "1", name: "Dairy" },
    { id: "2", name: "Meat" },
    { id: "3", name: "Qurbani" },
  ])

  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    { id: "1", name: "Calf", description: "Young dairy animal", categoryId: "1", categoryName: "Dairy" },
    { id: "2", name: "Heifer", description: "Young female dairy animal", categoryId: "1", categoryName: "Dairy" },
    { id: "3", name: "Cow", description: "Adult female dairy animal", categoryId: "1", categoryName: "Dairy" },
    { id: "4", name: "Bull", description: "Adult male dairy animal", categoryId: "1", categoryName: "Dairy" },
    { id: "5", name: "Goat", description: "Meat goat", categoryId: "2", categoryName: "Meat" },
    { id: "6", name: "Sheep", description: "Meat sheep", categoryId: "2", categoryName: "Meat" },
    { id: "7", name: "Camel", description: "Qurbani camel", categoryId: "3", categoryName: "Qurbani" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newSubcategoryName, setNewSubcategoryName] = useState("")
  const [newSubcategoryDescription, setNewSubcategoryDescription] = useState("")

  const handleAddSubcategoryClick = () => {
    setIsModalOpen(true)
    setSelectedCategory("")
    setNewSubcategoryName("")
    setNewSubcategoryDescription("")
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSaveSubcategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategory || !newSubcategoryName) return

    const category = categories.find((c) => c.id === selectedCategory)
    if (!category) return

    const newSubcategory: Subcategory = {
      id: Date.now().toString(), // Simple ID generation
      name: newSubcategoryName,
      description: newSubcategoryDescription,
      categoryId: selectedCategory,
      categoryName: category.name,
    }

    setSubcategories([...subcategories, newSubcategory])
    handleModalClose()
  }

  return (
    <AdminLayout>
      <div className="pb-8 p-4 md:p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Manage Subcategories</h1>
          <button
            onClick={handleAddSubcategoryClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full md:w-auto justify-center md:justify-start"
          >
            <FaPlus /> Add Subcategory
          </button>
        </div>

        {/* Table Container for Subcategories */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Subcategory</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {subcategory.name}
                    <div className="text-xs text-gray-500 md:hidden">Category: {subcategory.categoryName}</div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">
                      {subcategory.categoryName}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded">
                        <FaEdit />
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
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

      {/* Modal for Adding Subcategory - Make responsive */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Subcategory</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={handleModalClose}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveSubcategory} className="p-4 space-y-4">
              {/* Category Selection */}
              <div className="form-group">
                <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="categorySelect"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Name */}
              <div className="form-group">
                <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subcategoryName"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subcategory name"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2"
                >
                  <FaSave /> Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default SubcategoriesPage
