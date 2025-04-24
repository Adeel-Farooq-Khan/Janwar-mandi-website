"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  FaPlus,
  FaTimes,
  FaFilter,
  FaImages,
  FaTrashAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaWeight,
  FaImage,
  FaCalendarAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaCloudUploadAlt,
  FaCheck,
} from "react-icons/fa"
import DashboardNavbar from "@/components/Dashboardnavbar"
import AnimalCardComponent from "@/components/AnimalCard"

// Mock subscription plans
const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free Trial",
    price: 0,
    duration: "7 days",
    listings: 1,
    description: "Upload 1 animal for free for 7 days",
    features: ["Basic listing", "7 days visibility", "Email support"],
  },
  {
    id: "silver",
    name: "Silver Plan",
    price: 900,
    duration: "1 month",
    listings: 3,
    description: "Upload up to 3 animals per month",
    features: ["3 listings per month", "30 days visibility", "Priority support"],
  },
  {
    id: "gold",
    name: "Gold Plan",
    price: 2000,
    duration: "1 month",
    listings: 10,
    description: "Upload up to 10 animals per month",
    features: ["10 listings per month", "Featured listings", "Phone support"],
  },
  {
    id: "platinum",
    name: "Platinum Plan",
    price: 5000,
    duration: "1 month",
    listings: 19,
    description: "Upload up to 19 animals per month",
    features: ["19 listings per month", "Premium placement", "Dedicated support"],
  },
]

// Main categories and subcategories
const CATEGORIES = {
  dairy: {
    label: "Dairy",
    subcategories: [
      { value: "calf", label: "Calf" },
      { value: "heifer", label: "Heifer" },
      { value: "cow", label: "Cow" },
      { value: "bull", label: "Bull" },
    ],
  },
  meat: {
    label: "Meat",
    subcategories: [
      { value: "cow", label: "Cow" },
      { value: "bull", label: "Bull" },
      { value: "goat", label: "Goat" },
      { value: "buffalo", label: "Buffalo" },
    ],
  },
  qurbani: {
    label: "Qurbani",
    subcategories: [
      { value: "sheep", label: "Sheep" },
      { value: "katta-katti", label: "Katta/Katti" },
      { value: "buffalo", label: "Buffalo" },
      { value: "bakra-bakri", label: "Bakra/Bakri" },
      { value: "cow", label: "Cow" },
      { value: "bull", label: "Bull" },
      { value: "bachra-bachri", label: "Bachra/Bachri" },
    ],
  },
}

// Combined list for filtering
const FILTER_CATEGORIES = [
  { value: "all", label: "All Animals" },
  { value: "dairy", label: "All Dairy" },
  { value: "meat", label: "All Meat" },
  { value: "qurbani", label: "All Qurbani" },
  ...Object.keys(CATEGORIES).flatMap((mainCat) =>
    CATEGORIES[mainCat].subcategories.map((subCat) => ({
      value: `${mainCat}-${subCat.value}`,
      label: `${CATEGORIES[mainCat].label} - ${subCat.label}`,
    })),
  ),
]

// Breeds list
const COW_BREEDS = [
  "Angus",
  "Bhagnari",
  "Brahman",
  "Cholistani",
  "Cross",
  "Cross Friesian",
  "Cross Jersey",
  "Dajal",
  "Desi",
  "Dhanni",
  "Fatehjang",
  "Holstein Friesian",
  "Jersey",
  "Lohani",
  "Not Known",
  "Red Sindhi",
  "Sahiwal",
  "Tharparker",
]

// Locations list
const LOCATIONS = [
  "Lahore, Punjab",
  "Karachi, Sindh",
  "Islamabad, Federal",
  "Peshawar, KPK",
  "Quetta, Balochistan",
  "Multan, Punjab",
  "Faisalabad, Punjab",
  "Rawalpindi, Punjab",
  "Gujranwala, Punjab",
  "Sialkot, Punjab",
  "Bahawalpur, Punjab",
  "Hyderabad, Sindh",
  "Sukkur, Sindh",
  "Larkana, Sindh",
  "Dera Ghazi Khan, Punjab",
  "Gujrat, Punjab",
  "Jhang, Punjab",
  "Sheikhupura, Punjab",
  "Kasur, Punjab",
]

// Mock user data
const MOCK_USER = {
  uid: "user123",
  email: "user@example.com",
  name: "Demo User",
  subscription: "silver", // free, silver, gold, platinum
  listingsUsed: 0,
  subscriptionEndDate: new Date(2025, 5, 1), // Example end date
}

// Mock animals data
const MOCK_ANIMALS = [
  {
    id: "animal1",
    title: "Holstein Friesian Dairy Cow",
    price: 50000,
    category: "dairy",
    subcategory: "cow",
    breed: "Holstein Friesian",
    location: "Lahore, Punjab",
    province: "Punjab",
    district: "Lahore",
    tehsil: "Lahore City",
    color: "Black & White",
    age: "3 years",
    weight: "450 kg",
    milkQuantity: 20,
    lactation: 2,
    teats: 4,
    pregnancyStatus: "Yes",
    pregnancyDuration: "3 to 6 Months",
    description: "High quality dairy cow producing 20 liters of milk daily. Vaccinated and healthy.",
    images: ["/3cowsimg.png", "/api/placeholder/400/300"],
    userId: "user123",
    userEmail: "user@example.com",
    userName: "Demo User",
    userContact: "+92 300 1234567",
    createdAt: new Date(2024, 3, 10),
  },
  {
    id: "animal2",
    title: "Sahiwal Bull for Qurbani",
    price: 120000,
    category: "qurbani",
    subcategory: "bull",
    breed: "Sahiwal",
    location: "Karachi, Sindh",
    province: "Sindh",
    district: "Karachi",
    tehsil: "Malir",
    color: "Light Brown",
    age: "24 months",
    weight: "800 kg",
    teeth: "4",
    description: "Healthy bull suitable for Qurbani. Well-fed and cared for.",
    images: ["/api/placeholder/400/300"],
    userId: "user123",
    userEmail: "user@example.com",
    userName: "Demo User",
    userContact: "+92 300 1234567",
    createdAt: new Date(2024, 3, 5),
  },
]

export default function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [user, setUser] = useState(MOCK_USER)
  const [loading, setLoading] = useState(true)
  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [animals, setAnimals] = useState<typeof MOCK_ANIMALS>([])
  const [filteredAnimals, setFilteredAnimals] = useState<any[]>([])

  const [selectedFilter, setSelectedFilter] = useState("all")
  const [formStep, setFormStep] = useState(1)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    subcategory: "",
    breed: "",
    location: "",
    province: "",
    district: "",
    tehsil: "",
    color: "",
    age: "",
    weight: "",
    gender: "",
    description: "",
    // Dairy specific
    milkQuantity: "",
    lactation: "",
    teats: "",
    pregnancyStatus: "No",
    pregnancyDuration: "",
    // Meat/Qurbani specific
    teeth: "",
    // Contact
    contactNumber: "",
    // Images
    images: [] as File[],
    imageUrls: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [animalToDelete, setAnimalToDelete] = useState<string | null>(null)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "success") => {
    setToast({ message, type })

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setToast(null)
    }, 3000)
  }

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAnimals(MOCK_ANIMALS)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter animals when filter or animals list changes
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredAnimals(animals)
    } else if (["dairy", "meat", "qurbani"].includes(selectedFilter)) {
      // Filter by main category
      setFilteredAnimals(animals.filter((animal) => animal.category === selectedFilter))
    } else {
      // Filter by subcategory (format: "maincategory-subcategory")
      const [mainCat, subCat] = selectedFilter.split("-")
      setFilteredAnimals(animals.filter((animal) => animal.category === mainCat && animal.subcategory === subCat))
    }
  }, [selectedFilter, animals])

  const handleSignOut = async () => {
    try {
      setLoading(true) // Show loader while signing out
      // Simulate sign out process
      setTimeout(() => {
        alert("Signed out successfully!")
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error("Error signing out:", error)
      setLoading(false)
    }
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const handleAddAnimalClick = () => {
    // Check if user can add more animals based on subscription
    const canAddMore = checkSubscriptionLimits()

    if (canAddMore) {
      setShowAddAnimalForm(true)
      setFormStep(1)
      resetForm()
    } else {
      setShowSubscriptionModal(true)
    }
  }

  const checkSubscriptionLimits = () => {
    // Free users can add 1 listing if they haven't used it yet
    if (user.subscription === "free" && user.listingsUsed >= 1) {
      return false
    }

    // Check limits for other subscription types
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === user.subscription)
    if (!plan) return false

    return user.listingsUsed < plan.listings
  }

  const toggleAddAnimalForm = () => {
    setShowAddAnimalForm(!showAddAnimalForm)
    if (!showAddAnimalForm) {
      if (!isEditing) {
        resetForm()
        setFormStep(1)
      }
    } else {
      resetForm()
      setIsEditing(false)
      setEditingAnimalId(null)
    }
  }

  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      category: "",
      subcategory: "",
      breed: "",
      location: "",
      province: "",
      district: "",
      tehsil: "",
      color: "",
      age: "",
      weight: "",
      gender: "",
      description: "",
      milkQuantity: "",
      lactation: "",
      teats: "",
      pregnancyStatus: "No",
      pregnancyDuration: "",
      teeth: "",
      contactNumber: "",
      images: [],
      imageUrls: [],
    })
    setError("")
    setSuccess("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    setFormData({
      ...formData,
      category: category,
      subcategory: "", // Reset subcategory when category changes
    })
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // Check if adding these files would exceed the 5 image limit
    if (formData.images.length + files.length > 5) {
      setError("Maximum 5 images allowed")
      return
    }

    // Check file sizes
    const oversizedFiles = Array.from(files).filter((file) => file.size > 5 * 1024 * 1024)

    if (oversizedFiles.length > 0) {
      setError("Images must be less than 5MB each")
      return
    }

    // Add the new files
    const newImages = [...formData.images, ...Array.from(files)]

    // Generate preview URLs
    const newImageUrls = [...formData.imageUrls]
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      newImageUrls.push(url)
    })

    setFormData({
      ...formData,
      images: newImages,
      imageUrls: newImageUrls,
    })

    setError("") // Clear any previous errors
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images]
    const newImageUrls = [...formData.imageUrls]

    // Remove the image and its URL
    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setFormData({
      ...formData,
      images: newImages,
      imageUrls: newImageUrls,
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images]
    const newImageUrls = [...formData.imageUrls]

    // Remove the image and its URL
    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setFormData({
      ...formData,
      images: newImages,
      imageUrls: newImageUrls,
    })
  }

  const handleCategorySelection = (category: string) => {
    setFormData({
      ...formData,
      category: category,
      subcategory: "", // Reset subcategory when category changes
    })
  }

  const handleSubcategorySelection = (subcategory: string) => {
    setFormData({
      ...formData,
      subcategory: subcategory,
    })
    // Move to next step
    setFormStep(2)
  }

  const goBackToCategories = () => {
    setFormStep(1)
  }

  const handleEditAnimal = (animal: any) => {
    // Convert the animal data to match the form structure
    setFormData({
      title: animal.title || "",
      price: animal.price?.toString() || "",
      category: animal.category || "",
      subcategory: animal.subcategory || "",
      breed: animal.breed || "",
      location: animal.location || "",
      province: animal.province || "",
      district: animal.district || "",
      tehsil: animal.tehsil || "",
      color: animal.color || "",
      age: animal.age || "",
      weight: animal.weight || "",
      gender: animal.gender || "",
      description: animal.description || "",
      milkQuantity: animal.milkQuantity?.toString() || "",
      lactation: animal.lactation?.toString() || "",
      teats: animal.teats?.toString() || "",
      pregnancyStatus: animal.pregnancyStatus || "No",
      pregnancyDuration: animal.pregnancyDuration || "",
      teeth: animal.teeth || "",
      images: [], // Cannot copy files directly
      imageUrls: animal.images || [], // Use existing image URLs
    })

    setIsEditing(true)
    setEditingAnimalId(animal.id)
    setShowAddAnimalForm(true)
    setFormStep(2) // Skip to the form directly
  }

  const handleDeleteAnimal = (animalId: string) => {
    try {
      // Find the animal to delete
      const animalToDelete = animals.find((animal) => animal.id === animalId)

      if (!animalToDelete) {
        throw new Error("Animal not found")
      }

      // Confirm deletion
      if (!window.confirm("Are you sure you want to delete this animal listing?")) {
        return
      }

      // Update the state
      setAnimals(animals.filter((animal) => animal.id !== animalId))

      // Show success message
      showToast("Animal listing deleted successfully", "success")
    } catch (error) {
      const err = error as Error
      console.error("Error deleting animal:", err)
      showToast(`Failed to delete animal listing: ${err.message}`, "error")
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validate form - basic required fields
    if (!formData.title || !formData.price || !formData.category || !formData.subcategory || !formData.location) {
      setError("Please fill in all required fields")
      return
    }

    // Validate that at least one image is uploaded for new listings
    if (!isEditing && formData.imageUrls.length === 0) {
      setError("Please upload at least one image")
      return
    }

    // Validate price is a number
    if (isNaN(Number.parseFloat(formData.price))) {
      setError("Price must be a valid number")
      return
    }

    setIsSubmitting(true)

    try {
      // Create animal data object
      const animalData = {
        id: isEditing ? editingAnimalId : `animal${Date.now()}`,
        title: formData.title,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        subcategory: formData.subcategory,
        breed: formData.breed,
        location: formData.location,
        province: formData.province,
        district: formData.district,
        tehsil: formData.tehsil,
        color: formData.color,
        age: formData.age,
        weight: formData.weight,
        gender: formData.gender,
        description: formData.description,
        // Conditional fields based on category/subcategory
        ...(formData.category === "dairy" &&
          formData.subcategory === "cow" && {
            milkQuantity: formData.milkQuantity ? Number(formData.milkQuantity) : undefined,
            lactation: formData.lactation ? Number(formData.lactation) : undefined,
            teats: formData.teats ? Number(formData.teats) : undefined,
            pregnancyStatus: formData.pregnancyStatus,
            pregnancyDuration: formData.pregnancyStatus === "Yes" ? formData.pregnancyDuration : undefined,
          }),
        ...(["meat", "qurbani"].includes(formData.category) && {
          teeth: formData.teeth,
        }),
        // Use existing images for editing or new uploads
        images: formData.imageUrls,
        userId: user.uid,
        userEmail: user.email,
        userName: user.name,
        userContact: "+92 300 1234567", // Mock contact number
        createdAt: new Date(),
      }

      if (isEditing && editingAnimalId) {
        // Update existing animal
        setAnimals(
          animals.map((animal) =>
            animal.id === editingAnimalId ? { ...animal, ...animalData, id: animal.id || editingAnimalId } : animal,
          ),
        )
        setSuccess("Animal updated successfully!")
      } else {
        // Add new animal
        setAnimals([...animals, animalData as any])
        setSuccess("Animal added successfully!")

        // Update user's listings count
        setUser({
          ...user,
          listingsUsed: user.listingsUsed + 1,
        })
      }

      // Reset form
      resetForm()

      // Close form after a delay
      setTimeout(() => {
        setShowAddAnimalForm(false)
        setSuccess("")
        setIsEditing(false)
        setEditingAnimalId(null)
      }, 2000)
    } catch (error) {
      const err = error as Error
      console.error("Error saving animal:", err)
      setError(`Failed to ${isEditing ? "update" : "add"} animal: ${err.message || "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to select a subscription plan
  const selectSubscriptionPlan = (planId: string) => {
    // In a real app, this would redirect to payment
    alert(`You selected the ${planId} plan. In a real app, this would redirect to payment.`)

    // For demo purposes, we'll just update the user's subscription
    setUser({
      ...user,
      subscription: planId,
      listingsUsed: 0,
    })

    closeSubscriptionModal()
  }

  const handleSubscriptionChange = (planId: string) => {
    // In a real app, this would redirect to payment
    if (window.confirm(`You selected the ${planId} plan. Proceed to payment?`)) {
      // For demo purposes, we'll just update the user's subscription
      setUser({
        ...user,
        subscription: planId,
        listingsUsed: 0,
      })

      closeSubscriptionModal()
      showToast(`Successfully upgraded to ${planId} plan`, "success")
    }
  }

  // Simple loader component
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/95 z-50 backdrop-blur-sm">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-700 border-b-green-700 animate-spin"></div>
        </div>
        <div className="mt-5 text-lg font-medium text-gray-800 relative">
          Loading<span className="animate-pulse">...</span>
        </div>
      </div>
    )
  }

  // Dynamic field rendering based on category and subcategory
  // Dynamic field rendering based on category and subcategory
  const renderDynamicFields = () => {
    const { category, subcategory } = formData

    if (category === "dairy") {
      if (subcategory === "calf") {
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Breed</option>
                {COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (Months)*</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 3"
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="e.g. 100"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </>
        )
      } else if (subcategory === "heifer") {
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Breed</option>
                {COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (Months)*</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 18"
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Teeth</label>
              <select
                name="teeth"
                value={formData.teeth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Teeth</option>
                <option value="Kheeri">Kheeri</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="e.g. 250"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Status*</label>
              <select
                name="pregnancyStatus"
                value={formData.pregnancyStatus}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.pregnancyStatus === "Yes" && (
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Duration*</label>
                <select
                  name="pregnancyDuration"
                  value={formData.pregnancyDuration}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                >
                  <option value="">Select Duration</option>
                  <option value="1 to 3 Months">1 to 3 Months</option>
                  <option value="3 to 6 Months">3 to 6 Months</option>
                  <option value="6 to 9 Months">6 to 9 Months</option>
                </select>
              </div>
            )}
          </>
        )
      } else if (subcategory === "cow") {
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Breed</option>
                {COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (Years)</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 4"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="e.g. 400"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Daily Milk Quantity (Liters)*</label>
              <input
                type="number"
                name="milkQuantity"
                value={formData.milkQuantity}
                onChange={handleInputChange}
                placeholder="e.g. 15"
                required
                min="0"
                max="60"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Lactation*</label>
              <select
                name="lactation"
                value={formData.lactation}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Lactation</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Teats*</label>
              <select
                name="teats"
                value={formData.teats}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Teats</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Status*</label>
              <select
                name="pregnancyStatus"
                value={formData.pregnancyStatus}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {formData.pregnancyStatus === "Yes" && (
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pregnancy Duration*</label>
                <select
                  name="pregnancyDuration"
                  value={formData.pregnancyDuration}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                >
                  <option value="">Select Duration</option>
                  <option value="1 to 3 Months">1 to 3 Months</option>
                  <option value="3 to 6 Months">3 to 6 Months</option>
                  <option value="6 to 9 Months">6 to 9 Months</option>
                </select>
              </div>
            )}
          </>
        )
      } else if (subcategory === "bull") {
        return (
          <>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
              <select
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Breed</option>
                {COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (Months)*</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 24"
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)*</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="e.g. 600"
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Teeth*</label>
              <select
                name="teeth"
                value={formData.teeth}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
              >
                <option value="">Select Teeth</option>
                <option value="Kheeri">Kheeri</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
              </select>
            </div>
          </>
        )
      }
    } else if (category === "meat") {
      return (
        <>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Breed</option>
              {["cow", "bull"].includes(subcategory) ? (
                COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))
              ) : (
                <>
                  <option value="Local">Local</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Imported">Imported</option>
                </>
              )}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)*</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g. 350"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Age*</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="e.g. 3 years"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Teeth*</label>
            <select
              name="teeth"
              value={formData.teeth}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Teeth</option>
              <option value="Kheeri">Kheeri</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>
        </>
      )
    } else if (category === "qurbani") {
      return (
        <>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Breed*</label>
            <select
              name="breed"
              value={formData.breed}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Breed</option>
              {["cow", "bull"].includes(subcategory) ? (
                COW_BREEDS.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))
              ) : (
                <>
                  <option value="Local">Local</option>
                  <option value="Desi">Desi</option>
                  <option value="Barbari">Barbari</option>
                  <option value="Beetal">Beetal</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Imported">Imported</option>
                </>
              )}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (KG)*</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="e.g. 150"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="e.g. 2 years"
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Teeth*</label>
            <select
              name="teeth"
              value={formData.teeth}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
            >
              <option value="">Select Teeth</option>
              <option value="Kheeri">Kheeri</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>
          </div>
        </>
      )
    }

    return null
  }

  // Now let's complete the return part of the component with the UI
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardNavbar
        user={user}
        showProfileMenu={showProfileMenu}
        toggleProfileMenu={toggleProfileMenu}
        handleSignOut={handleSignOut}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Animals</h1>
            <p className="text-gray-600">Manage your animal listings here</p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={handleAddAnimalClick}
              className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              <FaPlus className="mr-2" />
              Add Animal
            </button>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Subscription: <span className="capitalize">{user.subscription}</span> Plan
              </h2>
              <p className="text-sm text-gray-600">
                Animals posted: {user.listingsUsed} /
                {SUBSCRIPTION_PLANS.find((plan) => plan.id === user.subscription)?.listings || 0}
              </p>
              {user.subscription !== "free" && (
                <p className="text-xs text-gray-500 mt-1">Renews on {user.subscriptionEndDate.toLocaleDateString()}</p>
              )}
            </div>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="mt-3 md:mt-0 text-sm px-3 py-1.5 border border-green-700 text-green-700 rounded hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
            >
              {user.subscription === "free" ? "Upgrade Plan" : "Manage Subscription"}
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <FaFilter className="mr-2 text-gray-500" />
            <div className="w-full md:w-64">
              <select
                value={selectedFilter}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700"
              >
                {FILTER_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Animals List */}
        {filteredAnimals.length === 0 ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <FaImages className="text-gray-300 text-5xl mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No animals found</h3>
              <p className="text-gray-500 mb-4">
                {selectedFilter !== "all"
                  ? "Try changing your filter or add an animal in this category."
                  : "Start by adding your first animal listing."}
              </p>
              <button
                onClick={handleAddAnimalClick}
                className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
              >
                <FaPlus className="mr-2" />
                Add Animal
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimals.map((animal) => (
              <AnimalCardComponent
                key={animal.id}
                animal={animal}
                onEdit={() => handleEditAnimal(animal)}
                onDelete={() => handleDeleteAnimal(animal.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Animal Form Modal */}
      {showAddAnimalForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {isEditing ? "Edit Animal Listing" : "Add New Animal"}
              </h2>
              <button onClick={toggleAddAnimalForm} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Category</option>
                      <option value="dairy">Dairy</option>
                      <option value="meat">Meat</option>
                      <option value="qurbani">Qurbani</option>
                    </select>
                  </div>

                  {formData.category && (
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory*</label>
                      <select
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                      >
                        <option value="">Select Subcategory</option>
                        {formData.category === "dairy" && (
                          <>
                            <option value="calf">Calf</option>
                            <option value="heifer">Heifer</option>
                            <option value="cow">Cow</option>
                            <option value="bull">Bull</option>
                          </>
                        )}
                        {formData.category === "meat" && (
                          <>
                            <option value="cow">Cow</option>
                            <option value="bull">Bull</option>
                            <option value="goat">Goat</option>
                            <option value="sheep">Sheep</option>
                          </>
                        )}
                        {formData.category === "qurbani" && (
                          <>
                            <option value="cow">Cow</option>
                            <option value="bull">Bull</option>
                            <option value="goat">Goat</option>
                            <option value="sheep">Sheep</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs.)*</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="e.g. 150000"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                  </div>
                </div>
              </div>

              {formData.category && formData.subcategory && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Animal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{renderDynamicFields()}</div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Provide additional details about your animal"
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    ></textarea>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location*</label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    >
                      <option value="">Select Location</option>
                      {LOCATIONS.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number*</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 03001234567"
                      pattern="03[0-9]{9}"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 03XXXXXXXXX</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Images</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="images" className="cursor-pointer flex flex-col items-center justify-center">
                      <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                      <span className="text-gray-600 font-medium">Drop files here or click to upload</span>
                      <span className="text-xs text-gray-500 mt-1">(Up to 5 images, max 5MB each)</span>
                    </label>
                  </div>

                  {formData.images && formData.images.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.preview || image}
                            alt={`Preview ${index + 1}`}
                            className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={toggleAddAnimalForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-3 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      {isEditing ? "Updating..." : "Posting..."}
                    </>
                  ) : (
                    <>{isEditing ? "Update Listing" : "Post Listing"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Subscription Plans</h2>
              <button onClick={() => setShowSubscriptionModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 flex flex-col ${
                      user.subscription === plan.id ? "border-green-500 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="text-xl font-bold mb-2 capitalize">{plan.id}</div>
                    <div className="text-3xl font-semibold mb-4">
                      {plan.price > 0 ? `Rs. ${plan.price}` : "Free"}
                      {plan.price > 0 && <span className="text-sm font-normal">/month</span>}
                    </div>
                    <ul className="text-sm text-gray-700 mb-6 flex-grow">
                      <li className="mb-2 flex items-start">
                        <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span>{plan.listings} animal listings</span>
                      </li>
                      {plan.features.map((feature, index) => (
                        <li key={index} className="mb-2 flex items-start">
                          <FaCheck className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubscriptionChange(plan.id)}
                      disabled={user.subscription === plan.id}
                      className={`w-full py-2 rounded-lg ${
                        user.subscription === plan.id
                          ? "bg-gray-100 text-gray-500 cursor-default"
                          : "bg-green-700 text-white hover:bg-green-800"
                      }`}
                    >
                      {user.subscription === plan.id ? "Current Plan" : plan.price > 0 ? "Upgrade" : "Downgrade"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-center text-red-600 mb-4">
                <FaExclamationTriangle className="text-4xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center mb-2">Delete Animal Listing</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this listing? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAnimal}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white flex items-center`}
        >
          {toast.type === "success" ? <FaCheckCircle className="mr-2" /> : <FaExclamationCircle className="mr-2" />}
          {toast.message}
        </div>
      )}
    </div>
  )
}

// AnimalCard Component
const AnimalCardComponent = ({ animal, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        {animal.images && animal.images.length > 0 ? (
          <img
            src={animal.images[0] || "/placeholder.svg"}
            alt={`${animal.breed} ${animal.subcategory}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <FaImage className="text-gray-400 text-4xl" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              animal.category === "dairy"
                ? "bg-blue-100 text-blue-800"
                : animal.category === "meat"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {animal.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 capitalize">
            {animal.breed} {animal.subcategory}
          </h3>
          <div className="text-lg font-bold text-green-700">Rs. {animal.price.toLocaleString()}</div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <div className="flex flex-wrap gap-y-1">
            {animal.weight && (
              <div className="mr-4 flex items-center">
                <FaWeight className="mr-1 text-gray-500" />
                {animal.weight} KG
              </div>
            )}
            {animal.age && (
              <div className="mr-4 flex items-center">
                <FaCalendarAlt className="mr-1 text-gray-500" />
                {animal.age}{" "}
                {animal.subcategory === "calf" || animal.subcategory === "heifer" || animal.subcategory === "bull"
                  ? "Months"
                  : "Years"}
              </div>
            )}
            {animal.location && (
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-1 text-gray-500" />
                {animal.location}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">Posted {new Date(animal.createdAt).toLocaleDateString()}</div>
          <div className="flex space-x-2">
            <button onClick={onEdit} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
              <FaEdit />
            </button>
            <button onClick={onDelete} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
