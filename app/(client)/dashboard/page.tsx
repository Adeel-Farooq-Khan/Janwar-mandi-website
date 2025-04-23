"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaTimes, FaUpload, FaFilter } from "react-icons/fa";
import DashboardNavbar from "@/components/Dashboardnavbar";
import AnimalCard from "@/components/AnimalCard";
import Image from "next/image";

// Mock data to replace Firebase functionality
const MOCK_CATEGORIES = [
  { value: "all", label: "All Animals" },
  { value: "cow", label: "Cow" },
  { value: "dairy-cow", label: "Dairy Cow" },
  { value: "goat", label: "Goat" },
  { value: "camel", label: "Camel" },
  { value: "hen", label: "Hen" },
  { value: "ram", label: "Ram" },
  { value: "qurbani", label: "Qurbani" },
];

const MOCK_USER = {
  uid: "user123",
  email: "user@example.com",
  name: "Demo User",
};

const MOCK_ANIMALS = [
  {
    id: "animal1",
    title: "Healthy Dairy Cow",
    price: 50000,
    type: "dairy-cow",
    location: "Lahore, Punjab",
    color: "Black & White",
    age: "3 years",
    weight: "450 kg",
    description:
      "High quality dairy cow producing 20 liters of milk daily. Vaccinated and healthy.",
    imageBase64: "/api/placeholder/400/300",
    userId: "user123",
    userEmail: "user@example.com",
    createdAt: new Date(2024, 3, 10),
    favorite: false,
  },

  {
    id: "animal3",
    title: "Bactrian Camel",
    price: 120000,
    type: "camel",
    location: "Karachi, Sindh",
    color: "Light Brown",
    age: "5 years",
    weight: "800 kg",
    description: "Well-trained camel, suitable for transport and tourism.",
    imageBase64: "/api/placeholder/400/300",
    userId: "user123",
    userEmail: "user@example.com",
    createdAt: new Date(2024, 3, 5),
    favorite: false,
  },
];

export default function Dashboard() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user] = useState(MOCK_USER);
  const [loading, setLoading] = useState(true);
  const [showAddAnimalForm, setShowAddAnimalForm] = useState(false);
  const [animals, setAnimals] = useState<typeof MOCK_ANIMALS>([]);

  const [filteredAnimals, setFilteredAnimals] = useState<AnimalListing[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories] = useState(MOCK_CATEGORIES);
  const [formData, setFormData] = useState<{
    title: string;
    price: string;
    type: string;
    location: string;
    color: string;
    age: string;
    weight: string;
    description: string;
    image: File | null; 
    imageBase64: string;
  }>({
    title: "",
    price: "",
    type: "",
    location: "",
    color: "",
    age: "",
    weight: "",
    description: "",
    image: null,
    imageBase64: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingAnimalId, setEditingAnimalId] = useState<string | null>(null);

  type AnimalListing = (typeof MOCK_ANIMALS)[number];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAnimals(MOCK_ANIMALS);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter animals when category or animals list changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredAnimals(animals);
    } else {
      setFilteredAnimals(
        animals.filter((animal) => animal.type === selectedCategory)
      );
    }
  }, [selectedCategory, animals]);

  const handleSignOut = async () => {
    try {
      setLoading(true); // Show loader while signing out
      // Simulate sign out process
      setTimeout(() => {
        alert("Signed out successfully!");
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error signing out:", error);
      setLoading(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleAddAnimalForm = () => {
    setShowAddAnimalForm(!showAddAnimalForm);
    // Reset form data and messages when toggling
    if (!showAddAnimalForm) {
      // If we're not editing, reset the form
      if (!isEditing) {
        resetForm();
      }
    } else {
      // If we're closing the form, reset everything
      resetForm();
      setIsEditing(false);
      setEditingAnimalId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      type: "",
      location: "",
      color: "",
      age: "",
      weight: "",
      description: "",
      image: null,
      imageBase64: "",
    });
    setError("");
    setSuccess("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  interface Animal {
    id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    price: number;
    imageBase64: string;
    createdAt: Date;
    userId: string;
    userEmail: string;
    favorite: boolean;
    color: string;  // Make color a required field
    age?: string;
    weight?: string;
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return; 
      }

      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          imageBase64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleFavorite = (animalId: string) => {
    setAnimals(
      animals.map((animal) =>
        animal.id === animalId
          ? { ...animal, favorite: !animal.favorite }
          : animal
      )
    );
  };

  const handleEditAnimal = (animal: Animal) => {
    setFormData({
      title: animal.title || "",
      price: animal.price?.toString() || "",
      type: animal.type || "",
      location: animal.location || "",
      color: animal.color || "",
      age: animal.age || "",
      weight: animal.weight || "",
      description: animal.description || "",
      image: null,
      imageBase64: animal.imageBase64 || "",
    });

    setIsEditing(true);
    setEditingAnimalId(animal.id);
    setShowAddAnimalForm(true);
  };

  const handleDeleteAnimal = async (animalId: string) => {
    try {
      // Verify the current user is the owner of the animal
      const animalToDelete = animals.find((animal) => animal.id === animalId);

      if (!animalToDelete) {
        throw new Error("Animal not found");
      }

      // Confirm deletion
      if (
        !window.confirm("Are you sure you want to delete this animal listing?")
      ) {
        return;
      }

      // Update the state
      setAnimals(animals.filter((animal) => animal.id !== animalId));

      // Show success message
      alert("Animal listing deleted successfully");
    } catch (error) {
      const err = error as Error;
      console.error("Error deleting animal:", err);
      alert(`Failed to delete animal listing: ${err.message}`);
    }
    
  }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      // Validate form
      if (
        !formData.title ||
        !formData.price ||
        !formData.type ||
        !formData.location
      ) {
        setError("Please fill in all required fields");
        return;
      }

      if (!formData.imageBase64 && !isEditing) {
        setError("Please upload an image");
        return;
      }

      // Validate price is a number
      if (isNaN(Number.parseFloat(formData.price))) {
        setError("Price must be a valid number");
        return;
      }

      setIsSubmitting(true);

      try {
        // Create animal data object
        const animalData = {
          id: isEditing ? editingAnimalId : `animal${Date.now()}`,
          title: formData.title,
          price: Number.parseFloat(formData.price),
          description: formData.description || "",
          location: formData.location,
          type: formData.type,
          color: formData.color || "",
          age: formData.age || "",
          weight: formData.weight || "",
          userId: user.uid,
          userEmail: user.email,
          imageBase64: formData.imageBase64 || "/api/placeholder/400/300",
          createdAt: new Date(),
          favorite: false,
        };

        if (isEditing && editingAnimalId) {
          // Update existing animal (only if editingAnimalId is valid)
            setAnimals(
            animals.map((animal) =>
              animal.id === editingAnimalId
              ? { ...animal, ...animalData, id: animal.id || editingAnimalId }
              : animal
            )
            );
          setSuccess("Animal updated successfully!");
        } 
        
        // Reset form
        resetForm();

        // Close form after a delay
        setTimeout(() => {
          setShowAddAnimalForm(false);
          setSuccess("");
          setIsEditing(false);
          setEditingAnimalId(null);
        }, 2000);
      } catch (error) {
        const err = error as Error;
        console.error("Error saving animal:", err);
        setError(
          `Failed to ${isEditing ? "update" : "add"} animal: ${
            err.message || "Unknown error"
          }`
        );
      } finally {
        setIsSubmitting(false);
      }
    };

    // Simple loader component
    if (loading) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/95 z-50 backdrop-blur-sm">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-b-blue-500 animate-spin"></div>
          </div>
          <div className="mt-5 text-lg font-medium text-gray-800 relative">
            Loading<span className="animate-pulse">...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar
          user={user}
          showProfileMenu={showProfileMenu}
          toggleProfileMenu={toggleProfileMenu}
          handleSignOut={handleSignOut}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800"></h1>
            <button
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg font-medium transition-colors"
              onClick={toggleAddAnimalForm}
            >
              <FaPlus /> Add Animal
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <label
                htmlFor="category-filter"
                className="flex items-center gap-2 font-medium text-gray-600"
              >
                <FaFilter className="text-gray-500" /> Filter by Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm min-w-[150px] cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && !showAddAnimalForm && (
            <div className="bg-red-100 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {showAddAnimalForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {isEditing ? "Edit Animal" : "Add New Animal"}
                  </h2>
                  <button
                    className="bg-transparent border-none text-gray-500 hover:bg-gray-100 hover:text-gray-700 p-1 rounded"
                    onClick={toggleAddAnimalForm}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>

                {error && (
                  <div className="bg-red-100 text-red-500 p-3 mx-6 mt-6 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-100 text-green-600 p-3 mx-6 mt-6 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-5 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo{!isEditing && "*"}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 overflow-hidden">
                      {formData.imageBase64 ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={formData.imageBase64}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                image: null,
                                imageBase64: "",
                              })
                            }
                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 relative">
                          <FaUpload size={32} className="mb-2" />
                          <span>Click to upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Max size: 5MB{" "}
                      {isEditing && "(Leave unchanged to keep current image)"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Healthy Dairy Cow"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (PKR)*
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g. 50000"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Animal Type*
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      >
                        <option value="">Select Type</option>
                        {categories
                          .filter((category) => category.value !== "all")
                          .map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location*
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Lahore, Punjab"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-5">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="e.g. Black & White"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="e.g. 3 years"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>

                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="e.g. 450 kg"
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide details about your animal..."
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={toggleAddAnimalForm}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg mr-3 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>{isEditing ? "Update Animal" : "Add Animal"}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {filteredAnimals.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No animals found
              </h3>
              <p className="text-gray-600">
                {selectedCategory === "all"
                  ? "No animal listings available. Be the first to add one!"
                  : "No animals found in this category. Try a different category or add a new listing."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnimals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  currentUserId={user.uid}
                  onEdit={handleEditAnimal}
                  onDelete={handleDeleteAnimal} // Pass the delete function here
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

