"use client";

import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import LightNavbar from "@/components/LightNavbar";

// Define the DairyCow type
interface DairyCow {
  id: number;
  name: string;
  breed: string;
  price: number;
  location: string;
  milk: number;
  age: number;
  lactation: number;
  teats: number;
  pregnant: string;
  weight: number;
  images: string[];
}

export default function DairyCowPage() {
  const router = useRouter();

  const dairyCows: DairyCow[] = [
    {
      id: 1,
      name: "Holstein Friesian",
      breed: "Holstein Friesian",
      price: 85000,
      location: "Karachi, Pakistan",
      milk: 28,
      age: 36,
      lactation: 2,
      teats: 4,
      pregnant: "No",
      weight: 450,
      images: ["/cow1_1.jpg", "/cow1_2.jpg", "/cow1_3.jpg"]
    },
    {
      id: 2,
      name: "Jersey Beauty",
      breed: "Jersey",
      price: 75000,
      location: "Lahore, Pakistan",
      milk: 22,
      age: 48,
      lactation: 3,
      teats: 4,
      pregnant: "Yes, 3 to 6 Months",
      weight: 380,
      images: ["/cow2_1.jpg", "/cow2_2.jpg"]
    },
    {
      id: 3,
      name: "Sahiwal Queen",
      breed: "Sahiwal",
      price: 90000,
      location: "Multan, Pakistan",
      milk: 18,
      age: 30,
      lactation: 1,
      teats: 4,
      pregnant: "No",
      weight: 400,
      images: ["/cow3_1.jpg", "/cow3_2.jpg", "/cow3_3.jpg"]
    },
    {
      id: 4,
      name: "Brown Swiss",
      breed: "Brown Swiss",
      price: 95000,
      location: "Islamabad, Pakistan",
      milk: 26,
      age: 42,
      lactation: 2,
      teats: 4,
      pregnant: "Yes, 1 to 4 Months",
      weight: 480,
      images: ["/cow4_1.jpg", "/cow4_2.jpg"]
    },
    {
      id: 5,
      name: "Red Sindhi",
      breed: "Red Sindhi",
      price: 82000,
      location: "Hyderabad, Pakistan",
      milk: 16,
      age: 54,
      lactation: 4,
      teats: 4,
      pregnant: "No",
      weight: 420,
      images: ["/cow5_1.jpg"]
    },
    {
      id: 6,
      name: "Ayrshire Dairy",
      breed: "Ayrshire",
      price: 88000,
      location: "Faisalabad, Pakistan",
      milk: 20,
      age: 38,
      lactation: 2,
      teats: 4,
      pregnant: "Yes, 6 to 9 Months",
      weight: 430,
      images: ["/cow6_1.jpg", "/cow6_2.jpg"]
    },
  ];

  const handleCowClick = (cowId: number) => {
    router.push(`/categories/dairy/${cowId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LightNavbar />

      <div className="pt-32 px-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Dairy Cows</h1>

        <div className="grid grid-cols-1 pb-8  md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dairyCows.map((cow) => (
            <div
              key={cow.id}
              onClick={() => handleCowClick(cow.id)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg hover:scale-105"
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                <span className="text-gray-400 text-2xl font-bold">Dairy Cow</span>
              </div>
              <h3 className="text-xl font-semibold text-green-700">{cow.name}</h3>
              <p className="text-gray-600">{cow.location}</p>
              <p className="text-orange-600 font-bold mt-2">Rs. {cow.price.toLocaleString()}</p>
              <div className="flex justify-between text-sm text-gray-700 mt-3">
                <div><span className="font-medium">Milk:</span> {cow.milk}L/day</div>
                <div><span className="font-medium">Age:</span> {cow.age} mo</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
