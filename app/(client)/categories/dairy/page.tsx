"use client";

import Footer from "@/components/Footer";
import LightNavbar from "@/components/LightNavbar";

export default function DairyCowPage() {
  // Simple dummy data
  const dairyCows = [
    {
      id: 1,
      name: "Holstein Friesian",
      price: 85000,
      location: "Karachi, Pakistan",
    },
    {
      id: 2,
      name: "Jersey Beauty",
      price: 75000,
      location: "Lahore, Pakistan",
    },
    {
      id: 3,
      name: "Sahiwal Queen",
      price: 90000,
      location: "Multan, Pakistan",
    },
    {
      id: 4,
      name: "Brown Swiss",
      price: 95000,
      location: "Islamabad, Pakistan",
    },
    {
      id: 5,
      name: "Red Sindhi",
      price: 82000,
      location: "Hyderabad, Pakistan",
    },
    {
      id: 6,
      name: "Ayrshire Dairy",
      price: 88000,
      location: "Faisalabad, Pakistan",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <LightNavbar />

      {/* Content with padding for navbar */}
      <div className="pt-32 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dairy Cows</h1>

        {/* Simple card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dairyCows.map((cow) => (
            <div key={cow.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl font-bold">
                  Dairy Cow
                </span>
              </div>
              <h3 className="text-xl font-semibold">{cow.name}</h3>
              <p className="text-gray-600">{cow.location}</p>
              <p className="text-green-700 font-bold mt-2">
                Rs. {cow.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
