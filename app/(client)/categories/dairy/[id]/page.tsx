"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";
import {
  FaMapMarkerAlt,
  FaWeight,
  FaCalendarAlt,
  FaTint,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";

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
  description?: string;
  seller?: {
    name: string;
    phone: string;
    joinedDate: string;
  };
}

// Mock data for dairy cows
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
    images: ["/cow1_1.jpg", "/cow1_2.jpg", "/cow1_3.jpg"],
    description:
      "High-quality Holstein Friesian dairy cow with excellent milk production. Healthy and well-maintained with proper vaccination history. This cow produces approximately 28 liters of milk daily and has completed 2 lactation cycles.",
    seller: {
      name: "Ahmed Khan",
      phone: "+92 300 1234567",
      joinedDate: "January 2023",
    },
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
    images: ["/cow2_1.jpg", "/cow2_2.jpg"],
    description:
      "Beautiful Jersey cow with rich milk production. Currently pregnant (3-6 months) and still producing milk. Has completed 3 lactation cycles with consistent milk production.",
    seller: {
      name: "Bilal Ahmed",
      phone: "+92 321 9876543",
      joinedDate: "March 2022",
    },
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
    images: ["/cow3_1.jpg", "/cow3_2.jpg", "/cow3_3.jpg"],
    description:
      "Pure breed Sahiwal cow with excellent genetics. First lactation cycle with promising milk production. Well-adapted to local climate and resistant to common diseases.",
    seller: {
      name: "Farooq Malik",
      phone: "+92 333 5556677",
      joinedDate: "November 2023",
    },
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
    images: ["/cow4_1.jpg", "/cow4_2.jpg"],
    description:
      "Premium Brown Swiss dairy cow with excellent temperament. Currently in early pregnancy but still producing high-quality milk. Ideal for dairy farming with consistent production.",
    seller: {
      name: "Imran Sheikh",
      phone: "+92 345 1122334",
      joinedDate: "August 2022",
    },
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
    images: ["/cow5_1.jpg"],
    description:
      "Mature Red Sindhi cow with proven track record. Has completed 4 lactation cycles and maintains good milk production. Heat-tolerant and disease-resistant local breed.",
    seller: {
      name: "Yasir Hussain",
      phone: "+92 312 7788990",
      joinedDate: "May 2021",
    },
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
    images: ["/cow6_1.jpg", "/cow6_2.jpg"],
    description:
      "Healthy Ayrshire dairy cow in late pregnancy. Expected to calve within 1-3 months. Has shown excellent milk production in previous lactation cycles with good fat content.",
    seller: {
      name: "Usman Ali",
      phone: "+92 334 6677889",
      joinedDate: "February 2023",
    },
  },
];

export default function DairyCowDetailPage() {
  const params = useParams();
  const cowId = Number(params.id);

  // Find the cow with the matching ID
  const cow = dairyCows.find((c) => c.id === cowId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // If cow not found
  if (!cow) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LightNavbar />
        <div className="pt-32 px-4 container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-red-600">
            Cow Not Found
          </h1>
          <p className="text-gray-600">
            The dairy cow you are looking for does not exist.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Function to handle image navigation
  const navigateImage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveImageIndex((prev) => (prev + 1) % cow.images.length);
    } else {
      setActiveImageIndex(
        (prev) => (prev - 1 + cow.images.length) % cow.images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LightNavbar />

      <div className="pt-24 pb-16 px-4 container mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6">
          <ul className="flex space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-green-700">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/categories" className="hover:text-green-700">
                Categories
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/categories/dairy" className="hover:text-green-700">
                Dairy
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-green-700 font-medium">{cow.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
              {cow.images.length > 0 ? (
                <>
                  <div className="relative w-full h-full">
                    <Image
                      src={cow.images[activeImageIndex] || "/placeholder.svg"}
                      alt={`${cow.name} - Image ${activeImageIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Navigation arrows */}
                  {cow.images.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage("prev")}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigateImage("next")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-2xl font-bold">
                    No Image Available
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {cow.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {cow.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index
                        ? "border-green-500"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${cow.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {cow.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              <span>{cow.location}</span>
            </div>

            <div className="text-3xl font-bold text-green-700 mb-6">
              Rs. {cow.price.toLocaleString()}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Breed</div>
                <div className="font-medium">{cow.breed}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Daily Milk</div>
                <div className="font-medium flex items-center">
                  <FaTint className="text-blue-500 mr-1" />
                  {cow.milk} Liters
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Age</div>
                <div className="font-medium flex items-center">
                  <FaCalendarAlt className="text-orange-500 mr-1" />
                  {cow.age} months ({Math.floor(cow.age / 12)} years{" "}
                  {cow.age % 12} months)
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Weight</div>
                <div className="font-medium flex items-center">
                  <FaWeight className="text-gray-500 mr-1" />
                  {cow.weight} kg
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Lactation</div>
                <div className="font-medium">{cow.lactation} cycles</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm">Teats</div>
                <div className="font-medium">{cow.teats} functional</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                <div className="text-gray-500 text-sm">Pregnancy Status</div>
                <div className="font-medium">{cow.pregnant}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{cow.description}</p>
            </div>

            {/* Contact Seller Section */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Seller Information</h3>
                  <p className="text-sm text-gray-500">
                    Member since {cow.seller?.joinedDate}
                  </p>
                </div>
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="text-green-700 font-medium hover:underline"
                >
                  {showContactInfo ? "Hide Contact" : "Show Contact"}
                </button>
              </div>

              {showContactInfo && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="mb-2">
                    <div className="text-gray-500 text-sm">Seller Name</div>
                    <div className="font-medium">{cow.seller?.name}</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-gray-500 text-sm">Contact Number</div>
                    <div className="font-medium">{cow.seller?.phone}</div>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href={`tel:${cow.seller?.phone}`}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-green-700"
                    >
                      <FaPhoneAlt className="mr-2" />
                      Call Seller
                    </a>
                    <a
                      href={`https://wa.me/${cow.seller?.phone.replace(
                        /\s+/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-md flex items-center justify-center hover:bg-green-200"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Dairy Cows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dairyCows
              .filter((c) => c.id !== cow.id)
              .slice(0, 4)
              .map((similarCow) => (
                <a
                  key={similarCow.id}
                  href={`/categories/dairy/${similarCow.id}`}
                  className="bg-white rounded-lg shadow-md p-4 transition hover:shadow-lg"
                >
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4 rounded-md overflow-hidden">
                    {similarCow.images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={similarCow.images[0] || "/placeholder.svg"}
                          alt={similarCow.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xl font-bold">
                        Dairy Cow
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-green-700">
                    {similarCow.name}
                  </h3>
                  <p className="text-gray-600">{similarCow.location}</p>
                  <p className="text-orange-600 font-bold mt-2">
                    Rs. {similarCow.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between text-sm text-gray-700 mt-2">
                    <div>
                      <span className="font-medium">Milk:</span>{" "}
                      {similarCow.milk}L/day
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {similarCow.age}{" "}
                      mo
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
