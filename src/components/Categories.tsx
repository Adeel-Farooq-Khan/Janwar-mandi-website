"use client";

import Link from "next/link";

export default function CategoriesSection() {
  const categories = [
    { name: "Dairy Cows", bgImage: "/dairy.png", path: "dairy" },
    { name: "Meat", bgImage: "/meat.png", path: "meat" },
    { name: "Qurbani", bgImage: "/qurbani.png", path: "qurbani" },
  ];

  return (
    <section className="py-20 px-4 sm:px-10 md:px-20 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Browse Categories</h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Find the perfect animal for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link key={index} href={`/categories/${category.path}`}>
            <div
              className="h-80 rounded-xl shadow-lg bg-cover bg-center relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${category.bgImage}')`,
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h2 className="text-white text-xl font-semibold hover:text-yellow-300 transition-colors duration-300">
                  {category.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
