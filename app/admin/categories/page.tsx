"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave, FaEdit, FaTrash, FaBan, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa"

type Category = {
  id: number
  name: string
  status: "Active" | "Inactive"
}

const CategoriesPage = () => {
  // Sample data
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Dairy", status: "Active" },
    { id: 2, name: "Meat", status: "Active" },
    { id: 3, name: "Qurbani", status: "Active" },
  ])

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Confirmation popup states
  const [confirmationPopup, setConfirmationPopup] = useState<{
    show: boolean
    type: "delete" | "toggle"
    categoryId: number | null
    position: { top: number; left: number }
  }>({
    show: false,
    type: "delete",
    categoryId: null,
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

  // Handle add category modal
  const handleAddCategoryClick = () => {
    setCategoryName("")
    setIsAddModalOpen(true)
  }

  const handleAddModalClose = () => {
    setIsAddModalOpen(false)
    setCategoryName("")
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()

    // Add new category
    const newCategory: Category = {
      id: categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1,
      name: categoryName,
      status: "Active",
    }

    setCategories([...categories, newCategory])
    handleAddModalClose()
  }

  // Handle edit category modal
  const handleEditClick = (category: Category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setEditingCategory(null)
    setCategoryName("")
  }

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingCategory) return

    // Update category
    const updatedCategories = categories.map((cat) =>
      cat.id === editingCategory.id ? { ...cat, name: categoryName } : cat,
    )

    setCategories(updatedCategories)
    handleEditModalClose()
  }

  // Handle confirmation popup
  const handleActionClick = (type: "delete" | "toggle", categoryId: number, event: React.MouseEvent) => {
    // Get button position for popup placement
    const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    setConfirmationPopup({
      show: true,
      type,
      categoryId,
      position: {
        top: buttonRect.bottom + scrollTop,
        left: buttonRect.left - 100 + buttonRect.width / 2,
      },
    })
  }

  const handleConfirmAction = () => {
    const { type, categoryId } = confirmationPopup

    if (!categoryId) return

    if (type === "delete") {
      // Delete category
      setCategories(categories.filter((cat) => cat.id !== categoryId))
    } else if (type === "toggle") {
      // Toggle category status
      setCategories(
        categories.map((cat) =>
          cat.id === categoryId ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" } : cat,
        ),
      )
    }

    // Close popup
    setConfirmationPopup((prev) => ({ ...prev, show: false }))
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 pb-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Manage Categories</h1>
          <button
            onClick={handleAddCategoryClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Table Container for Categories */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left">Category Name</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                        category.status === "Active" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#ffebee] text-[#c62828]"
                      }`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(category)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition-colors duration-200"
                        aria-label="Edit category"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleActionClick("toggle", category.id, e)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded transition-colors duration-200"
                        aria-label={category.status === "Active" ? "Deactivate category" : "Activate category"}
                      >
                        <FaBan />
                      </button>
                      <button
                        onClick={(e) => handleActionClick("delete", category.id, e)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200"
                        aria-label="Delete category"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                    No categories found. Add a category to get started.
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
              <h3 className="font-medium text-gray-900">
                {confirmationPopup.type === "delete" ? "Confirm Delete" : "Confirm Status Change"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {confirmationPopup.type === "delete"
                  ? "Are you sure you want to delete this category?"
                  : "Are you sure you want to change the status of this category?"}
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
              onClick={handleConfirmAction}
              className={`px-3 py-1.5 rounded text-sm text-white transition-colors duration-200 ${
                confirmationPopup.type === "delete"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {confirmationPopup.type === "delete" ? "Delete" : "Change"}
            </button>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleAddModalClose}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-4 space-y-4">
              <div className="form-group">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                  required
                  autoFocus
                />
              </div>

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
                  <FaSave /> Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Category</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={handleEditModalClose}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="p-4 space-y-4">
              <div className="form-group">
                <label htmlFor="editCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                  required
                  autoFocus
                />
              </div>

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
                  <FaCheck /> Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default CategoriesPage
