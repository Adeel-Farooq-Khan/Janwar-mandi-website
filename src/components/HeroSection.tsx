"use client";

import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <div className="relative pt-[98px] ">
      <div
        className="absolute top-0 left-0 w-full h-[700px] bg-cover bg-center z-0"
        style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${category.bgImage}'), url('/hero.jpg')" }}
      />
      {/* Hero Content */}
      <section className="relative z-10 text-white py-16 px-6 flex flex-col items-center justify-center min-h-[500px] text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffde00] mb-4">
          Pakistan&apos;s #1 Marketplace for Dairy Farm Animals
        </h1>
        <p className="text-base md:text-lg max-w-2xl mb-8">
          Buy & explore a wide range of Dairy Animals, Qurbani Janwar, Goats,
          Hens, and Farm Accessories
        </p>

        {/* Search Box */}
        <div className="flex flex-col sm:flex-row items-stretch max-w-xl w-full mb-6 gap-2 sm:gap-0">
          <input
            type="text"
            placeholder="Search for Animals, Categories, or Locations..."
            className="flex-1 border border-gray-300 text-gray-800 px-4 py-3 text-base rounded-md placeholder-gray-500 bg-white focus:outline-none focus:border-green-700"
          />

          <Button className="bg-[#4a8f29] text-white px-6 py-3 rounded-md sm:ml-2 w-full sm:w-auto">
            Search
          </Button>
        </div>

        {/* Contact Button */}
        <Button
          variant="outline"
          className="border mt-3 border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 rounded-lg"
        >
          Contact a Seller
        </Button>
      </section>
    </div>
  );
}
