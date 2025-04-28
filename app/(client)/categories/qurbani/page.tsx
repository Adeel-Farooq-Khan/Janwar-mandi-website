"use client";

import Footer from "@/components/Footer";
import LightNavbar from "@/components/LightNavbar";

export default function QurbaniCategoryPage() {
  // Simple dummy data for qurbani animals
  const qurbaniAnimals = [
    {
      id: 1,
      name: "Bakra - Special Qurbani",
      price: 65000,
      location: "Karachi, Pakistan",
      type: "goat",
    },
    {
      id: 2,
      name: "Bull - Premium Qurbani",
      price: 160000,
      location: "Lahore, Pakistan",
      type: "bull",
    },
    {
      id: 3,
      name: "Sheep - Dumba",
      price: 75000,
      location: "Multan, Pakistan",
      type: "sheep",
    },
    {
      id: 4,
      name: "Bakra - Sindhi",
      price: 50000,
      location: "Hyderabad, Pakistan",
      type: "goat",
    },
    {
      id: 5,
      name: "Bull - White Sacrifice",
      price: 180000,
      location: "Islamabad, Pakistan",
      type: "bull",
    },
    {
      id: 6,
      name: "Sheep - Australian",
      price: 80000,
      location: "Faisalabad, Pakistan",
      type: "sheep",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LightNavbar />

      {/* Content with padding for navbar */}
      <div className="pt-32 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Qurbani Animals</h1>

        {/* Simple card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qurbaniAnimals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl font-bold">
                  {animal.type === "bull"
                    ? "Bull"
                    : animal.type === "goat"
                    ? "Goat"
                    : "Sheep"}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{animal.name}</h3>
              <p className="text-gray-600">{animal.location}</p>
              <p className="text-green-700 font-bold mt-2">
                Rs. {animal.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
