"use client"

import { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave, FaEdit, FaTrash, FaBan, FaCheck } from "react-icons/fa"

const CategoriesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>("")
  const [subcategories, setSubcategories] = useState<string[]>([""])
  const [breeds, setBreeds] = useState<string[]>([""])

  const handleAddCategoryClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    // Reset the modal fields when closing
    setCategoryName("")
    setSubcategories([""])
    setBreeds([""])
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the saving logic here, e.g., sending data to API
    console.log("Category Name:", categoryName)
    console.log("Subcategories:", subcategories)
    console.log("Breeds:", breeds)

    // Close modal and reset fields after save
    handleModalClose()
  }

  const handleSubcategoryChange = (index: number, value: string) => {
    const updatedSubcategories = [...subcategories]
    updatedSubcategories[index] = value
    setSubcategories(updatedSubcategories)
  }

  const handleBreedChange = (index: number, value: string) => {
    const updatedBreeds = [...breeds]
    updatedBreeds[index] = value
    setBreeds(updatedBreeds)
  }

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, ""])
  }

  const addBreedField = () => {
    setBreeds([...breeds, ""])
  }

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
        <div className="admin-table-container overflow-x-auto">
          <table className="admin-table w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Label</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
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
                <td className="px-4 py-2">Qurbani  category</td>
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
             
              {/* More rows here */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Category */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
            <form onSubmit={handleSaveCategory} className="space-y-6">
              {/* Category Name */}
              <div className="form-group">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Subcategories */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Subcategories</label>
                {subcategories.map((subcategory, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Subcategory ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSubcategoryField}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  <FaPlus className="mr-2" /> Add Subcategory
                </button>
              </div>

              {/* Breeds */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Breeds</label>
                {breeds.map((breed, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={breed}
                      onChange={(e) => handleBreedChange(index, e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Breed ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBreedField}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  <FaPlus className="mr-2" /> Add Breed
                </button>
              </div>

              {/* Submit Button */}
              <div className="form-group">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  <FaSave className="mr-2" /> Save Category
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={handleModalClose}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default CategoriesPage
