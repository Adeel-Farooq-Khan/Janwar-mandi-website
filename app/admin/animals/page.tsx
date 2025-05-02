"use client";

import AdminLayout from "@/components/AdminLayout";
import Image from "next/image";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { useState } from "react";

export default function AnimalsPage() {
  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false);

  const toggleAddAnimalForm = () => {
    setShowAddAnimalForm(!showAddAnimalForm);
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Manage Animals</h1>
          <div className="mt-4 md:mt-0">
            <button
              onClick={toggleAddAnimalForm}
              className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              <FaPlus className="mr-2" />
              Add Animal
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex space-x-4">
            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search animals..."
                className="ml-2 outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaFilter className="text-gray-500" />
              <select className="ml-2 outline-none">
                <option value="all">All Categories</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>

            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaCalendarAlt className="text-gray-500" />
              <select className="ml-2 outline-none">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="specific">Specific Date</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <input type="date" className="border p-2 rounded-lg" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Apply
            </button>
          </div>
        </div>

        {/* Table for Animals */}
        <div className="overflow-x-auto">
          <table className="min-w-[1500px] table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">SubCategory</th>
                <th className="p-4 text-left">Breed</th>
                <th className="p-4 text-left">Lactation</th>
                <th className="p-4 text-left">Pregnancy Status</th>
                <th className="p-4 text-left">Teats</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Teeth</th>
                <th className="p-4 text-left">Seller</th>
                <th className="p-4 text-left">Date Added</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Animal Row */}
              <tr>
                <td className="p-4">
                  <Image
                    src="/card1.png"
                    alt="Animal"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </td>
                <td className="p-4">Healthy Dairy Cow</td>
                <td className="p-4">Rs. 50000</td>
                <td className="p-4">Dairy</td>
                <td className="p-4">Cow</td>
                <td className="p-4">Australian</td>
                <td className="p-4">No</td>
                <td className="p-4">1 to 3 months</td>
                <td className="p-4">3</td>
                <td className="p-4">Lahore, Punjab</td>
                <td className="p-4">4</td>
                <td className="p-4">seller@example.com</td>
                <td className="p-4">2025-04-30</td>
                <td className="p-4">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2">
                    <FaEdit />
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded-lg mr-2">
                    <FaTrash />
                  </button>
                  <button className="px-2 py-1 bg-green-500 text-white rounded-lg">
                    <FaEye />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Animal Modal */}
      {showAddAnimalForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Animal
              </h2>
              <button
                onClick={toggleAddAnimalForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category*
                    </label>
                    <select
                      name="category"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Category</option>
                      <option value="dairy">Dairy</option>
                      <option value="meat">Meat</option>
                      <option value="qurbani">Qurbani</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Rs.)*
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150000"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                  </div>
                </div>
              </div>

              {/* Animal Details (Dynamic Fields can be added here) */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Animal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Dynamic fields will be added based on selected category */}
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Provide additional details about your animal"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    ></textarea>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location*
                    </label>
                    <select
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Location</option>
                      {/* Add locations */}
                    </select>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Images</h3>
                <div className="border-2 border-gray-300 p-6 rounded-lg">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex justify-center items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <FaCloudUploadAlt className="text-lg" />
                    <span>Upload Images</span>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    multiple
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={toggleAddAnimalForm}
                  className="px-6 py-2 text-gray-700 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-green-700 text-white rounded-lg">
                  Add Animal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
