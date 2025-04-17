export default function ListingsGrid() {
    const listings = [
      { image: "/goat.png", price: "Rs: 45,000", age: "8d Ago", weight: "20kg", location: "Lahore, Pakistan" },
      { image: "/brownhen.png", price: "Rs: 10,000", age: "1d Ago", weight: "3kg", location: "Lahore, Pakistan" },
      {
        image: "/brownbull.png",
        price: "Rs: 4,00000",
        age: "2d Ago",
        weight: "100kg",
        location: "Peshawar, Pakistan",
      },
      { image: "/camel.png", price: "Rs: 3,00000", age: "5d Ago", weight: "80kg", location: "Lahore, Pakistan" },
      { image: "/white goat.png", price: "Rs: 55,000", age: "1d Ago", weight: "37kg", location: "Karachi, Pakistan" },
      { image: "/male hen.png", price: "Rs: 10,000", age: "5d Ago", weight: "3.5kg", location: "Multan, Pakistan" },
      {
        image: "/white bull.png",
        price: "Rs: 4,00000",
        age: "3d Ago",
        weight: "80kg",
        location: "Karachi, Pakistan",
      },
      {
        image: "/white cow.png",
        price: "Rs: 4,00000",
        age: "8d Ago",
        weight: "120kg",
        location: "Sahiwal, Pakistan",
      },
      { image: "/white hen.png", price: "Rs: 10,000", age: "8d Ago", weight: "3kg", location: "Lahore, Pakistan" },
      {
        image: "/pindi camel.png",
        price: "Rs: 250,000",
        age: "8d Ago",
        weight: "95kg",
        location: "Rawalpindi, Pakistan",
      },
      {
        image: "/black goat.png",
        price: "Rs: 70,000",
        age: "8d Ago",
        weight: "38kg",
        location: "Faisalabad, Pakistan",
      },
      { image: "/lhr cow.png", price: "Rs: 190,000", age: "9d Ago", weight: "75kg", location: "Lahore, Pakistan" },
    ]
  
    return (
      <section className="bg-white px-4 md:px-20 pt-10 pb-16 mt-5 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Explore All Categories</h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map((item, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="h-[295px] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt="Animal listing"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <span className="text-gray-800 font-semibold text-base">{item.price}</span>
                <span className="text-gray-500 text-sm">{item.age}</span>
              </div>
              <div className="flex flex-col gap-2 px-4 py-3 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚖️</span>
                  <span>{item.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  