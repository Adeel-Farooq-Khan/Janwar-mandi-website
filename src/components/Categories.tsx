"use client"

import { useState } from "react"

export default function CategoriesSection() {
  const [activeDot, setActiveDot] = useState(0)

  const categories = [
    { name: "Dairy Cows", imgClass: "dairy-img", bgImage: "/card1.png" },
    { name: "Qurbani", imgClass: "qurbani-img", bgImage: "/card2.png" },
    { name: "Goats", imgClass: "goats-img", bgImage: "/card3.png" },
    { name: "Hens", imgClass: "hens-img", bgImage: "/card4.png" },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse Categories</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find the perfect animal for your needs</p>
      </div>

      <div className="relative max-w-6xl mx-auto flex items-center">
        {/* Left Arrow */}
        <button className="absolute left-2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
          ❮
        </button>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide w-full justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-80 bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url('${category.bgImage}')` }}
              ></div>
              <div className="h-24 flex items-center justify-center text-xl font-semibold text-gray-700">
                {category.name}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="absolute right-2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300">
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {categories.map((_, dot) => (
          <button
            key={dot}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeDot === dot ? "bg-blue-500 scale-110" : "bg-gray-300"
            }`}
            onClick={() => setActiveDot(dot)}
            aria-label={`Go to slide ${dot + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
