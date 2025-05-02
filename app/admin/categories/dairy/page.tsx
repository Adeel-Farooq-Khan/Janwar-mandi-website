"use client"

import React, { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave } from "react-icons/fa"

export default function DairyCategoryPage() {
  const [isBreedModalOpen, setIsBreedModalOpen] = useState<boolean>(false)
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState<boolean>(false)
  const [newBreed, setNewBreed] = useState<string>("")
  const [newSubcategory, setNewSubcategory] = useState<string>("")
  const [subcategories, setSubcategories] = useState<any[]>([
    { name: "Calf", description: "Calf subcategory", breeds: [] },
    { name: "Heifer", description: "Heifer subcategory", breeds: [] },
    { name: "Cow", description: "Cow subcategory", breeds: [] },
    { name: "Bull", description: "Bull subcategory", breeds: [] },
  ])
  const [breeds, setBreeds] = useState<string[]>(["Holstein", "Jersey", "Angus"])  // Global breed list

  // Open modal for adding breed
  const openBreedModal = () => {
    setIsBreedModalOpen(true)
  }

  // Close breed modal
  const closeBreedModal = () => {
    setIsBreedModalOpen(false)
    setNewBreed("")
  }

  // Open modal for adding subcategory
  const openSubcategoryModal = () => {
    setIsSubcategoryModalOpen(true)
  }

  // Close subcategory modal
  const closeSubcategoryModal = () => {
    setIsSubcategoryModalOpen(false)
    setNewSubcategory("")
  }

  // Handle adding a new breed to global breed list
  const handleAddBreed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBreed) return
    setBreeds([...breeds, newBreed])
    closeBreedModal()
  }

  // Handle adding a new subcategory
  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubcategory) return
    setSubcategories([
      ...subcategories,
      { name: newSubcategory, description: `${newSubcategory} subcategory`, breeds: [] }
    ])
    closeSubcategoryModal()
  }

  return (
    <AdminLayout>
      <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">Dairy Subcategories</h1>
    <div className="flex space-x-2">
      {/* Add Subcategory Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        onClick={openSubcategoryModal}
      >
        <FaPlus /> Add Subcategory
      </button>
      {/* Add Breed Button (Global) */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={openBreedModal}
      >
        <FaPlus /> Add Breed
      </button>
    </div>
  </div>

        <div className="bg-white shadow rounded overflow-x-auto p-4">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="font-bold  text-xl text-gray-700">Subcategory</div>
            <div className="font-bold text-xl text-gray-700">Description</div>
            <div className="font-bold text-xl text-gray-700">Breeds</div>

            {subcategories.map((subcategory) => (
              <React.Fragment key={subcategory.name}>
                <div className="px-4 py-2">{subcategory.name}</div>
                <div className="px-4 py-2">{subcategory.description}</div>
                <div className="px-4 py-2">
                  {breeds.length > 0 ? (
                    <ul>
                      {breeds.map((breed, index) => (
                        <li key={index} className="text-sm text-gray-700">{breed}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No breeds available</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for adding breed */}
      {isBreedModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Add New Breed</h2>
            <form onSubmit={handleAddBreed} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Breed Name</label>
                <input
                  type="text"
                  value={newBreed}
                  onChange={(e) => setNewBreed(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  onClick={closeBreedModal}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeBreedModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding subcategory */}
      {isSubcategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-2xl font-semibold mb-4">Add New Subcategory</h2>
            <form onSubmit={handleAddSubcategory} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Subcategory Name</label>
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  <FaSave className="mr-2" /> Save Subcategory
                </button>
                <button
                  type="button"
                  onClick={closeSubcategoryModal}
                  className="inline-flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeSubcategoryModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
