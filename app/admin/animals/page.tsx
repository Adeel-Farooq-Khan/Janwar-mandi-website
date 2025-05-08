"use client"

import AdminLayout from "@/components/AdminLayout"
import Image from "next/image"
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
  FaEllipsisV,
  FaUser,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa"
import { useState, useRef, useEffect } from "react"

// Sample data for animals
const sampleAnimals = [
  {
    id: 1,
    image: "/card1.png",
    title: "Healthy Dairy Cow",
    price: 50000,
    category: "Dairy",
    subcategory: "Cow",
    breed: "Australian",
    lactation: "No",
    pregnancyStatus: "1 to 3 months",
    teats: 3,
    location: "Lahore, Punjab",
    teeth: 4,
    age: "3 years",
    weight: "450 kg",
    gender: "Female",
    seller: {
      name: "John Doe",
      email: "seller@example.com",
      phone: "+92 300 1234567",
      location: "Gulberg, Lahore",
    },
    dateAdded: "2025-04-30",
    description: "A healthy dairy cow with good milk production history. Well maintained and vaccinated regularly.",
    images: ["/card1.png", "/card2.png", "/card1.png"],
  },
  {
    id: 2,
    image: "/card1.png",
    title: "Premium Qurbani Bull",
    price: 120000,
    category: "Qurbani",
    subcategory: "Bull",
    breed: "Sahiwal",
    lactation: "N/A",
    pregnancyStatus: "N/A",
    teats: 0,
    location: "Karachi, Sindh",
    teeth: 6,
    age: "4 years",
    weight: "650 kg",
    gender: "Male",
    seller: {
      name: "Ali Ahmed",
      email: "ali@example.com",
      phone: "+92 321 9876543",
      location: "DHA, Karachi",
    },
    dateAdded: "2025-04-28",
    description: "Premium Qurbani bull with excellent health and appearance. Perfect for upcoming Eid.",
    images: ["/card1.png", "/card1.png"],
  },
  {
    id: 3,
    image: "/card1.png",
    title: "Young Goat",
    price: 25000,
    category: "Meat",
    subcategory: "Goat",
    breed: "Beetal",
    lactation: "Yes",
    pregnancyStatus: "Not pregnant",
    teats: 2,
    location: "Islamabad",
    teeth: 8,
    age: "1.5 years",
    weight: "45 kg",
    gender: "Female",
    seller: {
      name: "Sara Khan",
      email: "sara@example.com",
      phone: "+92 333 5556677",
      location: "F-10, Islamabad",
    },
    dateAdded: "2025-04-25",
    description: "Young healthy goat from premium breed. Good for meat production.",
    images: ["/card1.png", "/card1.png", "/card1.png", "/card1.png"],
  },
]

// Sample data for filters
const categories = ["Dairy", "Meat", "Qurbani"]
const subcategories = {
  Dairy: ["Cow", "Buffalo", "Heifer", "Calf"],
  Meat: ["Goat", "Sheep"],
  Qurbani: ["Bull", "Camel", "Goat"],
}
const breeds = {
  Cow: ["Australian", "Sahiwal", "Holstein", "Jersey"],
  Buffalo: ["Nili Ravi", "Murrah", "Kundi"],
  Goat: ["Beetal", "Teddy", "Kamori"],
  Bull: ["Sahiwal", "Cholistani", "Dhanni"],
  Camel: ["Marrecha", "Brela", "Dhatti"],
}

type Animal = {
  id: number
  image: string
  title: string
  price: number
  category: string
  subcategory: string
  breed: string
  lactation: string
  pregnancyStatus: string
  teats: number
  location: string
  teeth: number
  age: string
  weight: string
  gender: string
  seller: {
    name: string
    email: string
    phone: string
    location: string
  }
  dateAdded: string
  description: string
  images: string[]
}

export default function AnimalsPage() {
  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [selectedBreed, setSelectedBreed] = useState("")
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([])
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([])
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null)
  const actionMenuRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // Update available subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      setAvailableSubcategories(subcategories[selectedCategory as keyof typeof subcategories] || [])
      setSelectedSubcategory("")
      setSelectedBreed("")
      setAvailableBreeds([])
    } else {
      setAvailableSubcategories([])
      setSelectedSubcategory("")
      setSelectedBreed("")
      setAvailableBreeds([])
    }
  }, [selectedCategory])

  // Update available breeds when subcategory changes
  useEffect(() => {
    if (selectedSubcategory) {
      setAvailableBreeds(breeds[selectedSubcategory as keyof typeof breeds] || [])
      setSelectedBreed("")
    } else {
      setAvailableBreeds([])
      setSelectedBreed("")
    }
  }, [selectedSubcategory])

  // Close action menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActionMenuOpen(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleAddAnimalForm = () => {
    setShowAddAnimalForm(!showAddAnimalForm)
  }

  const toggleActionMenu = (id: number) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id)
  }

  const openDetailsModal = (animal: Animal) => {
    setSelectedAnimal(animal)
    setActiveImageIndex(0)
    setShowDetailsModal(true)
    setActionMenuOpen(null)
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false)
    setSelectedAnimal(null)
  }

  return (
    <AdminLayout>
      {/* Make the animals page responsive */}
      <div className="p-4 md:p-6 bg-white">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">Manage Animals</h1>
          <div>
            <button
              onClick={toggleAddAnimalForm}
              className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              <FaPlus className="mr-2" />
              Add Animal
            </button>
          </div>
        </div>

        {/* Improved Filters */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Filter */}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaSearch className="text-gray-500" />
              <input type="text" placeholder="Search animals..." className="ml-2 outline-none w-full" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaFilter className="text-gray-500" />
              <select
                className="ml-2 outline-none w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaFilter className="text-gray-500" />
              <select
                className="ml-2 outline-none w-full"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Breed Filter */}
            <div className="flex items-center border border-gray-300 p-2 rounded-lg">
              <FaFilter className="text-gray-500" />
              <select
                className="ml-2 outline-none w-full"
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                disabled={!selectedSubcategory}
              >
                <option value="">All Breeds</option>
                {availableBreeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
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

            <input type="date" className="border p-2 rounded-lg" />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Apply Filters</button>
          </div>
        </div>

        {/* Improved Table for Animals - with responsive handling */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left hidden md:table-cell">Category</th>
                <th className="p-3 text-left hidden md:table-cell">Subcategory</th>
                <th className="p-3 text-left hidden lg:table-cell">Breed</th>
                <th className="p-3 text-left hidden lg:table-cell">Age</th>
                <th className="p-3 text-left hidden lg:table-cell">Weight</th>
                <th className="p-3 text-left hidden lg:table-cell">Gender</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleAnimals.map((animal) => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <Image
                      src={animal.image || "/placeholder.svg"}
                      alt={animal.title}
                      width={60}
                      height={60}
                      className="object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{animal.title}</div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {animal.category} - {animal.subcategory}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium">Rs. {animal.price.toLocaleString()}</div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                      {animal.category}
                    </span>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                      {animal.subcategory}
                    </span>
                  </td>
                  <td className="p-3 hidden lg:table-cell">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                      {animal.breed}
                    </span>
                  </td>
                  <td className="p-3 hidden lg:table-cell">{animal.age}</td>
                  <td className="p-3 hidden lg:table-cell">{animal.weight}</td>
                  <td className="p-3 hidden lg:table-cell">{animal.gender}</td>
                  <td className="p-3 relative">
                    <button onClick={() => toggleActionMenu(animal.id)} className="p-2 rounded-full hover:bg-gray-200">
                      <FaEllipsisV />
                    </button>

                    {/* Action menu */}
                    {actionMenuOpen === animal.id && (
                      <div
                        ref={actionMenuRef}
                        className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-10"
                      >
                        <div className="p-1">
                          <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                            <FaEdit className="text-yellow-500" />
                            <span>Edit</span>
                          </button>
                          <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                            <FaTrash className="text-red-500" />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() => openDetailsModal(animal)}
                            className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                          >
                            <FaEye className="text-green-500" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Animal Modal */}
      {showAddAnimalForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Add New Animal</h2>
              <button onClick={toggleAddAnimalForm} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form className="p-6">
              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory*</label>
                    <select
                      name="subcategory"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Subcategory</option>
                      {/* Dynamic options based on category */}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
                    <select
                      name="breed"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Breed</option>
                      {/* Dynamic options based on subcategory */}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs.)*</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 150000"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3 years"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 450 kg"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
                    <select
                      name="gender"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      rows={4}
                      placeholder="Provide additional details about your animal"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    ></textarea>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
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
                  <input type="file" id="image-upload" className="hidden" multiple />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={toggleAddAnimalForm}
                  className="px-6 py-2 text-gray-700 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded-lg">
                  Add Animal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animal Details Modal */}
      {showDetailsModal && selectedAnimal && (
        <div className="fixed inset-0 flex items-center  shadow-2xl justify-center z-50 p-4 overflow-y-auto ">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">{selectedAnimal.title}</h2>
              <button onClick={closeDetailsModal} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Images */}
                <div>
                  <div className="mb-4 relative rounded-lg overflow-hidden" style={{ height: "300px" }}>
                    <Image
                      src={selectedAnimal.images[activeImageIndex] || "/placeholder.svg" || "/placeholder.svg"}
                      alt={selectedAnimal.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Thumbnails */}
                  {selectedAnimal.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {selectedAnimal.images.map((img: string, index: number) => (
                        <div
                          key={index}
                          className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                            activeImageIndex === index ? "border-blue-500" : "border-transparent"
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={60}
                            height={60}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Price and Basic Info */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-700 mb-2">
                      Rs. {selectedAnimal.price.toLocaleString()}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                        {selectedAnimal.category}
                      </span>
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                        {selectedAnimal.subcategory}
                      </span>
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800">
                        {selectedAnimal.breed}
                      </span>
                    </div>
                    <div className="text-gray-600">{selectedAnimal.description}</div>
                  </div>

                  {/* Seller Information */}
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <FaUser className="mr-2 text-gray-500" /> Seller Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-24 text-gray-600">Name:</span>
                        <span className="font-medium">{selectedAnimal.seller.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-600">Email:</span>
                        <span className="font-medium">{selectedAnimal.seller.email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedAnimal.seller.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-600">Location:</span>
                        <span className="font-medium">{selectedAnimal.seller.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <FaInfoCircle className="mr-2 text-gray-500" /> Animal Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Basic Details */}
                    <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-gray-700">Basic Information</h4>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="flex items-center">
                          <span className="w-24 text-gray-600">Age:</span>
                          <span>{selectedAnimal.age}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-gray-600">Weight:</span>
                          <span>{selectedAnimal.weight}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-gray-600">Gender:</span>
                          <span>{selectedAnimal.gender}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-gray-600">Teeth:</span>
                          <span>{selectedAnimal.teeth}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Specific Details */}
                    <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-gray-700">Category Specific Details</h4>
                      <div className="grid grid-cols-2 gap-y-2">
                        {selectedAnimal.category === "Dairy" && (
                          <>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-600">Lactation:</span>
                              <span>{selectedAnimal.lactation}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-600">Pregnancy:</span>
                              <span>{selectedAnimal.pregnancyStatus}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-600">Teats:</span>
                              <span>{selectedAnimal.teats}</span>
                            </div>
                          </>
                        )}
                        {selectedAnimal.category === "Qurbani" && (
                          <>
                            <div className="flex items-center">
                              <span className="w-24 text-gray-600">Teeth:</span>
                              <span>{selectedAnimal.teeth}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-gray-700">Location</h4>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-500 mr-2" />
                        <span>{selectedAnimal.location}</span>
                      </div>
                    </div>

                    {/* Date Added */}
                    <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-gray-700">Listing Information</h4>
                      <div className="flex items-center">
                        <span className="w-24 text-gray-600">Date Added:</span>
                        <span>{selectedAnimal.dateAdded}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4 flex justify-end">
              <button onClick={closeDetailsModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2">
                Close
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                <FaEdit className="inline mr-1" /> Edit Animal
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
