"use client"

import { useRef } from "react"

export default function CategoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const categories = [
    { name: "Dairy Cows", bgImage: "/card1.png" },
    { name: "Qurbani", bgImage: "/card2.png" },
    { name: "Goats", bgImage: "/card3.png" },
    { name: "Hens", bgImage: "/card4.png" },
    { name: "Camels", bgImage: "/camel.png" },
    { name: "Buffaloes", bgImage: "/buffalor.jpg" },
    { name: "Sheep", bgImage: "/sheep.jpg" },
  ]

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = container.offsetWidth / 1.2 // scroll 1 card width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse Categories</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find the perfect animal for your needs</p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          ❮
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 md:px-0"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 h-80 bg-white rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url('${category.bgImage}')` }}
              />
              <div className="h-24 flex items-center justify-center text-xl font-semibold text-gray-700">
                {category.name}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          ❯
        </button>
      </div>
    </section>
  )
}
