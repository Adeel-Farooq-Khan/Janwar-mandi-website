"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave, FaEdit, FaTrash, FaBan, FaTimes } from "react-icons/fa"

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>("")
  const [categoryDescription, setCategoryDescription] = useState<string>("")
  const [subcategories, setSubcategories] = useState<string[]>([""])
  const [breeds, setBreeds] = useState<string[]>([""])

  const handleAddCategoryClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Reset the modal fields when closing
    setCategoryName("")
    setCategoryDescription("")
    setSubcategories([""])
    setBreeds([""])
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the saving logic here, e.g., sending data to API
    console.log("Category Name:", categoryName)
    console.log("Category Description:", categoryDescription)
    console.log(
      "Subcategories:",
      subcategories.filter((item) => item.trim() !== ""),
    )
    console.log(
      "Breeds:",
      breeds.filter((item) => item.trim() !== ""),
    )

    // Close modal and reset fields after save
    handleModalClose()
  }

  // const handleSubcategoryChange = (index: number, value: string) => {
  //   const updatedSubcategories = [...subcategories]
  //   updatedSubcategories[index] = value
  //   setSubcategories(updatedSubcategories)
  // }

  // const handleBreedChange = (index: number, value: string) => {
  //   const updatedBreeds = [...breeds]
  //   updatedBreeds[index] = value
  //   setBreeds(updatedBreeds)
  // }

  // const addSubcategoryField = () => {
  //   setSubcategories([...subcategories, ""])
  // }

  // const addBreedField = () => {
  //   setBreeds([...breeds, ""])
  // }

  // const removeSubcategoryField = (index: number) => {
  //   if (subcategories.length > 1) {
  //     const updatedSubcategories = [...subcategories]
  //     updatedSubcategories.splice(index, 1)
  //     setSubcategories(updatedSubcategories)
  //   }
  // }

  // const removeBreedField = (index: number) => {
  //   if (breeds.length > 1) {
  //     const updatedBreeds = [...breeds]
  //     updatedBreeds.splice(index, 1)
  //     setBreeds(updatedBreeds)
  //   }
  // }

  return (
    <AdminLayout>
      <div className="admin-categories-page pb-8">
        {/* Page Header */}
        <div className="admin-page-header flex justify-between items-center mb-6">
          <h1 className="admin-page-title text-2xl font-semibold">Manage Categories</h1>
          <button
            onClick={handleAddCategoryClick}
            className="admin-add-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Table Container for Categories */}
        <div className="admin-table-container overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="admin-table w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Label</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Dummy Categories Data */}
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">Dairy</td>
                <td className="px-4 py-2">Dairy products category</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                    Active
                  </span>
                </td>
                <td className="px-4 py-2">
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
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">Meat</td>
                <td className="px-4 py-2">Meat products category</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                    Active
                  </span>
                </td>
                <td className="px-4 py-2">
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
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-2">Qurbani</td>
                <td className="px-4 py-2">Qurbani category</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 rounded text-sm font-semibold bg-[#e8f5e9] text-[#2e7d32]">
                    Active
                  </span>
                </td>
                <td className="px-4 py-2">
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

      {/* Modal for Adding Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>
              <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={handleModalClose}>
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-4 space-y-4">
              {/* Category Name */}
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

              {/* Category Description */}
              <div className="form-group">
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category description (optional)"
                />
              </div>

              {/* Subcategories */}
              {/* <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                  <button
                    type="button"
                    onClick={addSubcategoryField}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <FaPlus size={10} /> Add
                  </button>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {subcategories.map((subcategory, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Subcategory ${index + 1}`}
                      />
                      {subcategories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubcategoryField(index)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <FaTimes size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Breeds */}
              {/* <div className="form-group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Breeds</label>
                  <button
                    type="button"
                    onClick={addBreedField}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <FaPlus size={10} /> Add
                  </button>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                  {breeds.map((breed, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={breed}
                        onChange={(e) => handleBreedChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Breed ${index + 1}`}
                      />
                      {breeds.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBreedField(index)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <FaTimes size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div> */}

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
                  <FaSave /> Save Category
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
