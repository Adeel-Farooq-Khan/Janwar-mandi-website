"use client";

import Footer from "@/components/Footer";
import LightNavbar from "@/components/LightNavbar";


export default function MeatCategoryPage() {
  // Simple dummy data for meat animals
  const meatAnimals = [
    {
      id: 1,
      name: "Bull - Brahman",
      price: 120000,
      location: "Karachi, Pakistan",
      type: "bull",
    },
    {
      id: 2,
      name: "Goat - Beetal",
      price: 45000,
      location: "Lahore, Pakistan",
      type: "goat",
    },
    {
      id: 3,
      name: "Bull - Nili Ravi",
      price: 135000,
      location: "Multan, Pakistan",
      type: "bull",
    },
    {
      id: 4,
      name: "Goat - Kamori",
      price: 38000,
      location: "Hyderabad, Pakistan",
      type: "goat",
    },
    {
      id: 5,
      name: "Bull - Tharparkar",
      price: 110000,
      location: "Faisalabad, Pakistan",
      type: "bull",
    },
    {
      id: 6,
      name: "Goat - Teddy",
      price: 30000,
      location: "Islamabad, Pakistan",
      type: "goat",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LightNavbar />
      
      {/* Content with padding for navbar */}
      <div className="pt-32 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Meat Animals</h1>
        
        {/* Simple card grid */}
        <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meatAnimals.map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl font-bold">
                  {animal.type === "bull" ? "Bull" : "Goat"}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{animal.name}</h3>
              <p className="text-gray-600">{animal.location}</p>
              <p className="text-green-700 font-bold mt-2">Rs. {animal.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}