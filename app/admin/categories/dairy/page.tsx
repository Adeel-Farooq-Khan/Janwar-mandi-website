"use client"

import React, { useState } from "react"
import AdminLayout from "@/components/AdminLayout"
import { FaPlus, FaSave } from "react-icons/fa"

// Add animation for modal
const animateFadeIn = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`

type Subcategory = {
  name: string
  description: string
  breeds: string[]
}

export default function DairyCategoryPage() {
  const [isBreedModalOpen, setIsBreedModalOpen] = useState<boolean>(false)
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState<boolean>(false)
  const [newBreed, setNewBreed] = useState<string>("")
  const [newSubcategory, setNewSubcategory] = useState<string>("")
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    { name: "Calf", description: "Calf subcategory", breeds: [] },
    { name: "Heifer", description: "Heifer subcategory", breeds: [] },
    { name: "Cow", description: "Cow subcategory", breeds: [] },
    { name: "Bull", description: "Bull subcategory", breeds: [] },
  ])
  const [breeds, setBreeds] = useState<string[]>(["Holstein", "Jersey", "Angus"]) // Global breed list

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
      {
        name: newSubcategory,
        description: `${newSubcategory} subcategory`,
        breeds: [],
      },
    ])
    closeSubcategoryModal()
  }

  return (
    <AdminLayout>
      <style jsx>{animateFadeIn}</style>
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
                        <li key={index} className="text-sm text-gray-700">
                          {breed}
                        </li>
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Add New Breed</h2>
            <form onSubmit={handleAddBreed} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Breed Name</label>
                <input
                  type="text"
                  value={newBreed}
                  onChange={(e) => setNewBreed(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter breed name"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeBreedModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center"
                >
                  <FaSave className="mr-2" /> Save Breed
                </button>
              </div>
            </form>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closeBreedModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal for adding subcategory */}
      {isSubcategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl relative border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Add New Subcategory</h2>
            <form onSubmit={handleAddSubcategory} className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">Subcategory Name</label>
                <input
                  type="text"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter subcategory name"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeSubcategoryModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center"
                >
                  <FaSave className="mr-2" /> Save Subcategory
                </button>
              </div>
            </form>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={closeSubcategoryModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
