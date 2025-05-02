"use client"

import { useState, FC } from "react"
import { FaPlus, FaSave } from "react-icons/fa"

interface AddCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (categoryName: string, subcategories: string[], breeds: string[]) => void
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState<string>("")
  const [subcategories, setSubcategories] = useState<string[]>([""])
  const [breeds, setBreeds] = useState<string[]>([""])

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(categoryName, subcategories, breeds)
    onClose() // Close the modal after saving
    setCategoryName("")
    setSubcategories([""])
    setBreeds([""])
  }

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div className="form-group">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleCategoryNameChange}
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
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    )
  )
}

export default AddCategoryModal
