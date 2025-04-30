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
} from "react-icons/fa";

export default function AnimalsPage() {
  return (
    <AdminLayout>
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Manage Animals</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
            <FaPlus className="mr-2" /> Add Animal
          </button>
        </div>

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
                <th className="p-4 text-left">Pregrancy Status</th>
                <th className="p-4 text-left">Teets</th>
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
    </AdminLayout>
  );
}
