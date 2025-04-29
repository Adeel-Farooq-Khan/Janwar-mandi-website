"use client";

import { useRouter } from "next/navigation";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
function Categories() {
  const router = useRouter();
  
  // Main categories based on your project structure
  const categories = [
    {
      id: 1,
      name: "Dairy",
      image: "/card1.png",
      slug: "dairy",
      description: "High-quality milk-producing cows and buffalo for your dairy farm needs"
    },
    {
      id: 2,
      name: "Meat",
      image: "/beef-cattle.jpg",
      slug: "meat",
      description: "Premium beef cattle, goats, sheep and other meat-producing animals"
    },
    {
      id: 3,
      name: "Qurbani",
      image: "/qurabani.jpg",
      slug: "qurbani",
      description: "Special selection of animals for the sacred occasion of qurbani"
    }
  ];
  
  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center flex justify-center items-center w-full h-[500px] px-10 pt-8"
        style={{
          backgroundImage:
            `linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.5) 100%), url('/animalsss.jpg')`,
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-[60px] font-bold">
            <span className="text-yellow-400">Animal </span> Categories
          </h1>
          <p className="text-xl mt-4">Find the perfect livestock for your needs</p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1200px] mx-auto my-10 px-5">
        <h1 className="text-[28px] text-gray-700 mb-2 text-center welcome-heading font-semibold">Explore Our Animal Categories</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-8">
          Browse through our selection of livestock categories. Click on any category to view more details.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="h-64 overflow-hidden">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={300}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{category.description}</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="inline-block bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">Browse {category.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1300px] mx-auto my-16 px-5 shadow-md shadow-black/10 py-8">
        <h1 className="text-[36px] font-extrabold text-gray-700 mb-4 text-center">
          <span className="text-green-700">Quality </span>
          <span className="text-yellow-400">Livestock</span>
        </h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4 px-10 md:px-5 sm:px-2">
          At Janwar Mandi, we ensure that all listed animals meet high quality standards. Our sellers provide detailed information about each animal&apos;s health, breed, age, and other essential characteristics. Browse our categories to explore our extensive collection of livestock from trusted sellers across Pakistan.
        </p>
      </section>

      <AppDownload />
      <Footer />
    </>
  );
}

export default Categories;