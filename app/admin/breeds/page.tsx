"use client"

import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa"
import type React from "react"
import { useState, useEffect, useMemo, useRef } from "react"
import AdminLayout from "@/components/AdminLayout"

type Breed = {
  id: string
  name: string
  category: string
  subcategory: string
  totalAnimals: number
}

export default function BreedsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [breedName, setBreedName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null)
  
  // Confirmation popup state
  const [confirmationPopup, setConfirmationPopup] = useState<{
    show: boolean
    breedId: string | null
    position: { top: number; left: number }
  }>({
    show: false,
    breedId: null,
    position: { top: 0, left: 0 },
  })
  
  // Ref for popup
  const popupRef = useRef<HTMLDivElement>(null)
  
  const [breeds, setBreeds] = useState<Breed[]>([
    { id: "1", name: "Angus", category: "Dairy", subcategory: "Cow", totalAnimals: 35 },
    { id: "2", name: "Sahiwal", category: "Dairy", subcategory: "Cow", totalAnimals: 50 },
    { id: "3", name: "Holstein Friesian", category: "Dairy", subcategory: "Cow", totalAnimals: 12 },
    { id: "4", name: "Bhagnari", category: "Dairy", subcategory: "Cow", totalAnimals: 22 },
    { id: "5", name: "Brahman", category: "Dairy", subcategory: "Cow", totalAnimals: 40 },
    { id: "6", name: "Cholistani", category: "Dairy", subcategory: "Cow", totalAnimals: 15 },
    { id: "7", name: "Cross Friesian", category: "Dairy", subcategory: "Cow", totalAnimals: 18 },
    { id: "8", name: "Red Sindhi", category: "Dairy", subcategory: "Cow", totalAnimals: 25 },
    { id: "9", name: "Tharparker", category: "Dairy", subcategory: "Cow", totalAnimals: 28 },
  ])

  // Sample data for categories and subcategories
  const categories = [
    { id: "1", name: "Dairy" },
    { id: "2", name: "Meat" },
    { id: "3", name: "Qurbani" },
  ]

  const memoizedSubcategories = useMemo(
    () => ({
      "1": [
        { id: "1", name: "Cow" },
        { id: "2", name: "Bull" },
        { id: "3", name: "Heifer" },
        { id: "4", name: "Calf" },
      ],
      "2": [
        { id: "5", name: "Goat" },
        { id: "6", name: "Sheep" },
      ],
      "3": [
        { id: "7", name: "Camel" },
        { id: "8", name: "Cow" },
        { id: "9", name: "Goat" },
      ],
    }),
    []
  )

  const [availableSubcategories, setAvailableSubcategories] = useState<Array<{ id: string; name: string }>>([])

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

  // Update available subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      setAvailableSubcategories(memoizedSubcategories[selectedCategory as keyof typeof memoizedSubcategories] || [])
      setSelectedSubcategory("")
    } else {
      setAvailableSubcategories([])
      setSelectedSubcategory("")
    }
  }, [selectedCategory, memoizedSubcategories])

  // Open modal for adding breed
  const openAddModal = () => {
    setIsAddModalOpen(true)
    setBreedName("")
    setSelectedCategory("")
    setSelectedSubcategory("")
  }

  // Close add breed modal
  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  // Open modal for editing breed
  const openEditModal = (breed: Breed) => {
    setEditingBreed(breed)
    setBreedName(breed.name)
    
    // Find category ID by name
    const categoryObj = categories.find(c => c.name === breed.category)
    if (categoryObj) {
      setSelectedCategory(categoryObj.id)
      
      // Find subcategory ID by name after category is set
      setTimeout(() => {
        const subcategoryObj = availableSubcategories.find(s => s.name === breed.subcategory)
        if (subcategoryObj) {
          setSelectedSubcategory(subcategoryObj.id)
        }
      }, 0)
    }
    
    setIsEditModalOpen(true)
  }

  // Close edit breed modal
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingBreed(null)
  }

  // Handle form submission for adding breed
  const handleAddBreed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!breedName || !selectedCategory || !selectedSubcategory) return

    const categoryName = categories.find((c) => c.id === selectedCategory)?.name || ""
    const subcategoryName = availableSubcategories.find((s) => s.id === selectedSubcategory)?.name || ""

    const newBreed: Breed = {
      id: Date.now().toString(),
      name: breedName,
      category: categoryName,
      subcategory: subcategoryName,
      totalAnimals: 0,
    }

    setBreeds([...breeds, newBreed])
    closeAddModal()
  }
  
  // Handle form submission for editing breed
  const handleUpdateBreed = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBreed || !breedName || !selectedCategory || !selectedSubcategory) return

    const categoryName = categories.find((c) => c.id === selectedCategory)?.name || ""
    const subcategoryName = availableSubcategories.find((s) => s.id === selectedSubcategory)?.name || ""

    const updatedBreeds = breeds.map(breed => 
      breed.id === editingBreed.id 
        ? {
            ...breed,
            name: breedName,
            category: categoryName,
            subcategory: subcategoryName
          }
        : breed
    )

    setBreeds(updatedBreeds)
    closeEditModal()
  }
  
  // Handle delete confirmation popup
  const handleDeleteClick = (breedId: string, event: React.MouseEvent) => {
    // Get button position for popup placement
    const buttonRect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    setConfirmationPopup({
      show: true,
      breedId,
      position: {
        top: buttonRect.bottom + scrollTop,
        left: buttonRect.left - 100 + buttonRect.width / 2,
      },
    })
  }

  const handleConfirmDelete = () => {
    const { breedId } = confirmationPopup

    if (!breedId) return

    // Delete breed
    setBreeds(breeds.filter((breed) => breed.id !== breedId))

    // Close popup
    setConfirmationPopup((prev) => ({ ...prev, show: false }))
  }

  return (
    <AdminLayout >

    
    <div className="p-4 md:p-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Manage Breeds</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200"
        >
          <FaPlus /> Add Breed
        </button>
      </div>

      {/* Breeds Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left">Breed Name</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Subcategory</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Total Animals</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {breeds.map((breed) => (
              <tr key={breed.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {breed.name}
                  <div className="text-xs text-gray-500 md:hidden">
                    {breed.category} - {breed.subcategory}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                    {breed.category}
                  </span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                    {breed.subcategory}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">{breed.totalAnimals}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(breed)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition-colors duration-200"
                      aria-label="Edit breed"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(breed.id, e)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200"
                      aria-label="Delete breed"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {breeds.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No breeds found. Add a breed to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
                Are you sure you want to delete this breed? This action cannot be undone.
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

      {/* Add Breed Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Breed</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeAddModal}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBreed} className="p-4 space-y-4">
              {/* Step 1: Select Category */}
              <div className="form-group">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select Subcategory (only shown if category is selected) */}
              {selectedCategory && (
                <div className="form-group">
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {availableSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Step 3: Enter Breed Name (only shown if subcategory is selected) */}
              {selectedSubcategory && (
                <div className="form-group">
                  <label htmlFor="breedName" className="block text-sm font-medium text-gray-700 mb-1">
                    Breed Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="breedName"
                    value={breedName}
                    onChange={(e) => setBreedName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter breed name"
                    required
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                  disabled={!breedName || !selectedCategory || !selectedSubcategory}
                >
                  <FaSave /> Save Breed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Breed Modal */}
      {isEditModalOpen && editingBreed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4  bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit Breed</h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeEditModal}
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateBreed} className="p-4 space-y-4">
              {/* Step 1: Select Category */}
              <div className="form-group">
                <label htmlFor="editCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="editCategory"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Select Subcategory */}
              {selectedCategory && (
                <div className="form-group">
                  <label htmlFor="editSubcategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="editSubcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {availableSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Step 3: Enter Breed Name */}
              <div className="form-group">
                <label htmlFor="editBreedName" className="block text-sm font-medium text-gray-700 mb-1">
                  Breed Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editBreedName"
                  value={breedName}
                  onChange={(e) => setBreedName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter breed name"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center gap-2 transition-colors duration-200"
                  disabled={!breedName || !selectedCategory || !selectedSubcategory}
                >
                  <FaCheck /> Update Breed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  )
}
