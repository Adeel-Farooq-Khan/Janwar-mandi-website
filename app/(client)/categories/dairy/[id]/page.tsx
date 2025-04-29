"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

// Update PageParams to include an index signature
interface PageParams {
  id: string;
  [key: string]: string | undefined;
}

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
  description: string;
  sellerName: string;
  sellerPhone: string;
  images: string[];
}

export default function DairyCowDetail({ params }: { params: PageParams }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cowData, setCowData] = useState<DairyCow | null>(null);
  const [loading, setLoading] = useState(true);

  const Detail = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div>
      <p className="font-semibold text-gray-700">{label}</p>
      <p>{value}</p>
    </div>
  );

  const dairyCows: DairyCow[] = [
    {
      id: 1,
      name: "Holstein Friesian",
      breed: "Holstein Friesian",
      price: 85000,
      location: "Karachi, Pakistan",
      milk: 28, // daily milk in liters
      age: 36, // age in months
      lactation: 2,
      teats: 4,
      pregnant: "No",
      weight: 450, // in kg
      description:
        "High-quality Holstein Friesian dairy cow with excellent milk production records. Well-maintained health and vaccination history.",
      sellerName: "Ali Ahmed",
      sellerPhone: "+92 300 1234567",
      images: ["/dairy.png", "/card4.jpg", "/cow1_3.jpg"],
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
      description:
        "Beautiful Jersey cow known for rich milk content with high butterfat. Very docile temperament and easy to handle.",
      sellerName: "Muhammad Usman",
      sellerPhone: "+92 333 9876543",
      images: ["/cow2_1.jpg", "/cow2_2.jpg"],
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
      description:
        "Pure Sahiwal breed, well adapted to local climate conditions. Heat tolerant and resistant to many diseases.",
      sellerName: "Farooq Malik",
      sellerPhone: "+92 321 5556677",
      images: ["/cow3_1.jpg", "/cow3_2.jpg", "/cow3_3.jpg"],
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
      description:
        "Imported Brown Swiss cow with excellent pedigree. Known for consistent milk production and longevity.",
      sellerName: "Ahmed Khan",
      sellerPhone: "+92 345 1122334",
      images: ["/cow4_1.jpg", "/cow4_2.jpg"],
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
      description:
        "Authentic Red Sindhi breed with good milk production capabilities. Heat resistant and low maintenance.",
      sellerName: "Bilal Qureshi",
      sellerPhone: "+92 311 7788990",
      images: ["/cow5_1.jpg"],
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
      description:
        "Well-tempered Ayrshire cow with balanced milk production. Very healthy and has good feed conversion.",
      sellerName: "Imran Malik",
      sellerPhone: "+92 332 4455667",
      images: ["/cow6_1.jpg", "/cow6_2.jpg"],
    },
  ];

  useEffect(() => {
    if (params?.id) {
      const cow = dairyCows.find((c) => c.id === parseInt(params.id));
      if (cow) {
        setCowData(cow);
      } else {
        router.push("/categories/dairy");
      }
    }
    setLoading(false);
  }, [params, router, dairyCows]);

  const nextImage = () => {
    if (cowData?.images.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === cowData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (cowData?.images.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? cowData.images.length - 1 : prevIndex - 1
      );
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!cowData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">Cow not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LightNavbar />

      <main className="flex-grow mt-6 pt-32 pb-10 container mx-auto px-4">
        <button
          onClick={() => router.push("/categories/dairy")}
          className="flex items-center text-green-700 hover:text-green-900 mb-6"
        >
          <ChevronLeft size={20} />
          <span className="ml-1">Back to Listings</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-80 md:h-96">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  Image {currentImageIndex + 1} of {cowData.images.length}
                </span>
              </div>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronLeft size={24} className="text-green-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              >
                <ChevronRight size={24} className="text-green-700" />
              </button>
            </div>
            <div className="flex overflow-x-auto p-2 gap-2 bg-gray-50">
              {cowData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectImage(index)}
                  className={`w-16 h-16 relative border-2 rounded ${
                    currentImageIndex === index
                      ? "border-green-600"
                      : "border-transparent"
                  }`}
                >
                  <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-green-800 mb-2">
              {cowData.name}
            </h1>
            <p className="text-3xl font-bold text-orange-600 mb-4">
              Rs. {cowData.price.toLocaleString()}
            </p>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin size={18} className="mr-1" />
              <span>{cowData.location}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Detail label="Breed" value={cowData.breed} />
              <Detail label="Daily Milk" value={`${cowData.milk} Liters`} />
              <Detail label="Age" value={`${cowData.age} months`} />
              <Detail label="Weight" value={`${cowData.weight} kg`} />
              <Detail label="Lactation" value={`${cowData.lactation}`} />
              <Detail label="Teats" value={`${cowData.teats}`} />
              <div className="col-span-2">
                <p className="font-semibold text-gray-700">Pregnancy Status</p>
                <p>{cowData.pregnant}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{cowData.description}</p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-700 mb-2">
                Seller Information
              </h3>
              <p className="font-medium">{cowData.sellerName}</p>
              <p className="flex items-center text-gray-600 mb-2">
                <Phone size={16} className="mr-2" />
                {cowData.sellerPhone}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded flex-1 flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  Call Seller
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex-1 flex items-center justify-center">
                  <MessageCircle size={18} className="mr-2" />
                  Chat with Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
