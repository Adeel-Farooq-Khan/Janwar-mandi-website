"use client";

import AdminLayout from "@/components/AdminLayout";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import Link from "next/link";
import type React from "react";
import { useState, useEffect, useMemo } from "react";

export default function BreedsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breedName, setBreedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [breeds, setBreeds] = useState([
    { name: "Angus", category: "Dairy", subcategory: "Cow", totalAnimals: 35 },
    {
      name: "Sahiwal",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 50,
    },
    {
      name: "Holstein Friesian",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 12,
    },
    {
      name: "Bhagnari",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 22,
    },
    {
      name: "Brahman",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 40,
    },
    {
      name: "Cholistani",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 15,
    },
    {
      name: "Cross Friesian",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 18,
    },
    {
      name: "Red Sindhi",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 25,
    },
    {
      name: "Tharparker",
      category: "Dairy",
      subcategory: "Cow",
      totalAnimals: 28,
    },
  ]);

  // Sample data for categories and subcategories
  const categories = [
    { id: "1", name: "Dairy" },
    { id: "2", name: "Meat" },
    { id: "3", name: "Qurbani" },
  ];

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
  );

  const [availableSubcategories, setAvailableSubcategories] = useState<
    Array<{ id: string; name: string }>
  >([]);

  // Update available subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      setAvailableSubcategories(
        memoizedSubcategories[
          selectedCategory as keyof typeof memoizedSubcategories
        ] || []
      );
      setSelectedSubcategory("");
    } else {
      setAvailableSubcategories([]);
      setSelectedSubcategory("");
    }
  }, [selectedCategory, memoizedSubcategories]);

  // Open modal for adding breed
  const openModal = () => {
    setIsModalOpen(true);
    setBreedName("");
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  // Close breed modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission for adding breed
  const handleAddBreed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breedName || !selectedCategory || !selectedSubcategory) return;

    const categoryName =
      categories.find((c) => c.id === selectedCategory)?.name || "";
    const subcategoryName =
      availableSubcategories.find((s) => s.id === selectedSubcategory)?.name ||
      "";

    setBreeds([
      ...breeds,
      {
        name: breedName,
        category: categoryName,
        subcategory: subcategoryName,
        totalAnimals: 0,
      },
    ]);
    closeModal();
  };

  return (
    <AdminLayout>
      <div className="admin-breeds-page pb-8">
        {/* Page Header */}
        <div className="admin-page-header flex justify-between items-center mb-6">
          <h1 className="admin-page-title text-2xl font-semibold">
            Manage Breeds
          </h1>
          <button
            onClick={openModal}
            className="admin-add-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Breed
          </button>
        </div>

        {/* Breeds Table */}
        <div className="admin-table-container overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="admin-table w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Breed Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Subcategory</th>
                <th className="px-4 py-2 text-left">Total Animals</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {breeds.map((breed, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{breed.name}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                      {breed.category}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {breed.subcategory}
                    </span>
                  </td>
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto border border-gray-200">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Breed
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={closeModal}
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

            <form onSubmit={handleAddBreed} className="p-4 space-y-4">
              {/* Step 1: Select Category */}
              <div className="form-group">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                  <label
                    htmlFor="subcategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                  <label
                    htmlFor="breedName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
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
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2"
                  disabled={
                    !breedName || !selectedCategory || !selectedSubcategory
                  }
                >
                  <FaSave /> Save Breed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
