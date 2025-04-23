"use client";


export default function CategoriesSection() {
  const categories = [
    { name: "Dairy Cows", bgImage: "/dairy.png" },
    { name: "Meat", bgImage: "/meat.png" },
    { name: "Qurbani", bgImage: "/qurbani.png" },
  ];

  return (
    <section className="py-32 px-72 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Browse Categories
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect animal for your needs
        </p>
      </div>

      <div>
        <div className="flex gap-10 justify-center px-2 md:px-0 cursor-pointer w-[100%] ">
          {categories.map((category, index) => (
            <div
              key={index}
              className=" flex bg-cover bg-center  w-[33.3%] h-96 rounded-xl shadow-lg relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 "
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), url('${category.bgImage}') `,
              }}
            >
              {/* Bottom overlay with hover effect */}
              <div className="absolute bottom-0 left-4  py-4 text-center transition-colors duration-300 ">
                <h2 className="text-white text-xl font-semibold hover:text-yellow-300 transition-colors duration-300">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
