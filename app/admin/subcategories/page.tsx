"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave, FaEdit, FaTrash, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa"

// Sample data structure
type Category = {
  id: string
  name: string
}

type Subcategory = {
  id: string
  name: string

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
    { id: "1", name: "Calf",  categoryId: "1", categoryName: "Dairy" },
    { id: "2", name: "Heifer", categoryId: "1", categoryName: "Dairy" },
    { id: "3", name: "Cow", categoryId: "1", categoryName: "Dairy" },
    { id: "4", name: "Bull", categoryId: "1", categoryName: "Dairy" },
    { id: "5", name: "Goat",categoryId: "2", categoryName: "Meat" },
    { id: "6", name: "Sheep", categoryId: "2", categoryName: "Meat" },
    { id: "7", name: "Camel", categoryId: "3", categoryName: "Qurbani" },
  ])

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [newSubcategoryName, setNewSubcategoryName] = useState("")
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null)

  // Confirmation popup state
  const [confirmationPopup, setConfirmationPopup] = useState<{
    show: boolean
    type: "delete"
    subcategoryId: string | null
    position: { top: number; left: number }
  }>({
    show: false,
    type: "delete",
    subcategoryId: null,
    position: { top: 0, left: 0 },
  })

  // Refs
  const popupRef = useRef<HTMLDivElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setConfirmationPopup((prev) => ({ ...prev, show: false }))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleAddSubcategoryClick = () => {
    setIsAddModalOpen(true)
    setSelectedCategory("")
    setNewSubcategoryName("")
  }

  const handleAddModalClose = () => {
    setIsAddModalOpen(false)
  }

  const handleEditClick = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory)
    setSelectedCategory(subcategory.categoryId)
    setNewSubcategoryName(subcategory.name)

    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setEditingSubcategory(null)
  }

  const handleSaveSubcategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategory || !newSubcategoryName) return

    const category = categories.find((c) => c.id === selectedCategory)
    if (!category) return

    const newSubcategory: Subcategory = {
      id: Date.now().toString(), // Simple ID generation
      name: newSubcategoryName,
      categoryId: selectedCategory,
      categoryName: category.name,
    }

    setSubcategories([...subcategories, newSubcategory])
    handleAddModalClose()
  }

  const handleUpdateSubcategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingSubcategory || !selectedCategory || !newSubcategoryName) return

    const category = categories.find((c) => c.id === selectedCategory)
    if (!category) return

    const updatedSubcategories = subcategories.map((sub) =>
      sub.id === editingSubcategory.id
        ? {
            ...sub,
            name: newSubcategoryName,

            categoryId: selectedCategory,
            categoryName: category.name,
          }
        : sub
    )

    setSubcategories(updatedSubcategories)
    handleEditModalClose()
  }

  // Handle delete confirmation popup
  const handleDeleteClick = (subcategoryId: string, event: React.MouseEvent) => {
    // Get button position for popup placement
    const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    setConfirmationPopup({
      show: true,
      type: "delete",
      subcategoryId,
      position: {
        top: buttonRect.bottom + scrollTop,
        left: buttonRect.left - 100 + buttonRect.width / 2,
      },
    })
  }

  const handleConfirmDelete = () => {
    const { subcategoryId } = confirmationPopup

    if (!subcategoryId) return

    // Delete subcategory
    setSubcategories(subcategories.filter((sub) => sub.id !== subcategoryId))

    // Close popup
    setConfirmationPopup((prev) => ({ ...prev, show: false }))
  }

  return (
    <AdminLayout>
      <div className="pb-8 p-4 md:p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Manage Subcategories</h1>
          <button
            onClick={handleAddSubcategoryClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200"
          >
            <FaPlus /> Add Subcategory
          </button>
        </div>

        {/* Table Container for Subcategories */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left">Subcategory</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {subcategory.name}
                    <div className="text-xs text-gray-500 md:hidden">Category: {subcategory.categoryName}</div>
                    
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-blue-100 text-blue-800">
                      {subcategory.categoryName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(subcategory)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition-colors duration-200"
                        aria-label="Edit subcategory"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleDeleteClick(subcategory.id, e)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200"
                        aria-label="Delete subcategory"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {subcategories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                    No subcategories found. Add a subcategory to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Popup */}
      {confirmationPopup.show && (
        <div
          ref={popupRef}
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-64 animate-in fade-in zoom-in-95 duration-200"
          style={{
            top: `${confirmationPopup.position.top}px`,
            left: `${confirmationPopup.position.left}px`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-start mb-3">
            <div className="mr-3 text-amber-500">
              <FaExclamationTriangle size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Confirm Delete</h3>
              <p className="text-sm text-gray-600 mt-1">
                Are you sure you want to delete this subcategory? This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setConfirmationPopup((prev) => ({ ...prev, show: false }))}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-3 py-1.5 rounded text-sm text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Subcategory</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleAddModalClose}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
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
                  onClick={handleAddModalClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                >
                  <FaSave /> Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subcategory Modal */}
      {isEditModalOpen && editingSubcategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4  bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Subcategory</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleEditModalClose}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubcategory} className="p-4 space-y-4">
              {/* Category Selection */}
              <div className="form-group">
                <label htmlFor="editCategorySelect" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="editCategorySelect"
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
                <label htmlFor="editSubcategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editSubcategoryName"
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
                  onClick={handleEditModalClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                >
                  <FaCheck /> Update Subcategory
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
