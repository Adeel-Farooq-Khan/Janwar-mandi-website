"use client";

import Image from "next/image"; // Import Next.js Image component
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

function Services() {
  const router = useRouter();
  
  const services = [
    {
      id: 1,
      title: "Veterinary Service",
      icon: "/veveterinary.webp ",
      description: "Post detailed listings of your animals with high-quality images, comprehensive descriptions, and fair pricing to attract potential buyers."
    },
    {
      id: 2,
      title: "Animal Relocator",
      icon: "/icons/relocate.png",
      description: "Communicate directly with buyers or sellers through our secure in-app messaging system to discuss details and negotiate prices."
    },
    // {
    //   id: 3,
    //   title: "Verified Sellers",
    //   icon: "/icons/verified.png",
    //   description: "Our verification process ensures that all sellers on our platform are legitimate, reducing the risk of fraudulent transactions."
    // },
    // {
    //   id: 4,
    //   title: "Animal Health Records",
    //   icon: "/icons/health.png",
    //   description: "Upload and view vaccination records, health certificates, and other important documents to ensure animal quality."
    // },
    // {
    //   id: 5,
    //   title: "Featured Listings",
    //   icon: "/icons/featured.png",
    //   description: "Boost your listing's visibility with our premium featured options to reach more potential buyers quickly."
    // },
    // {
    //   id: 6,
    //   title: "Delivery Assistance",
    //   icon: "/icons/delivery.png",
    //   description: "Connect with reliable transportation services to safely deliver purchased animals to their new homes."
    // },
    // {
    //   id: 7,
    //   title: "Price Comparison",
    //   icon: "/icons/compare.png",
    //   description: "Easily compare prices and features of similar animals to make informed purchasing decisions."
    // },
    // {
    //   id: 8,
    //   title: "Expert Consultation",
    //   icon: "/icons/expert.png",
    //   description: "Access professional advice from veterinarians and livestock experts for animal health and management questions."
    // },
    // {
    //   id: 9,
    //   title: "Farm Accessories Marketplace",
    //   icon: "/icons/accessories.png",
    //   description: "Buy and sell essential farm equipment, feed, and other accessories needed for proper animal care."
    // },
    // {
    //   id: 10,
    //   title: "Seasonal Qurbani Services",
    //   icon: "/icons/qurbani.png",
    //   description: "Special services during Eid-ul-Adha to help buyers find perfect qurbani animals and assist sellers in managing increased demand."
    // }
  ];

  const handleLearnMoreClick = () => {
    router.push("/signup");
  };

  return (
    <>
      <Navbar />
      <section
        className="relative bg-cover bg-center flex justify-center items-center w-full h-[500px] px-10 pt-8"
        style={{
          backgroundImage:
            `linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.5) 100%), url('/service.jpg')`,
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-[60px] font-bold">
            <span className="text-yellow-400">Our </span> Services
          </h1>
          <p className="text-xl mt-4">Enhancing your livestock trading experience</p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1200px] mx-auto my-10 px-5">
        <h1 className="text-[28px] text-gray-700 mb-2 text-center welcome-heading font-semibold">Premium Services for Buyers and Sellers</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-8">
          Janwar Mandi offers a comprehensive range of services designed to make livestock trading easier, safer, and more efficient for everyone involved.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col"
            >
              <div className="h-16 bg-gray-300 flex justify-center items-center relative">
                <div className="relative h-10 w-10">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm flex-1">{service.description}</p>
                <div className="mt-4 flex justify-end">
                  <span 
                    onClick={handleLearnMoreClick}
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-2 rounded font-medium cursor-pointer transition-colors duration-300"
                  >
                    Learn More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1300px] mx-auto my-10 px-5 py-10 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-[36px] font-extrabold text-gray-700 mb-6 text-center">
          <span className="text-yellow-400">
            <span className="text-green-700">Why Our </span>Services Matter
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-700">
            <h3 className="text-xl font-bold text-gray-800 mb-3">For Buyers</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Access to a wide variety of quality livestock</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Transparent pricing and detailed animal information</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Direct communication with sellers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Convenience of browsing animals from anywhere</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">✓</span>
                <span>Support throughout the buying process</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
            <h3 className="text-xl font-bold text-gray-800 mb-3">For Sellers</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✓</span>
                <span>Wider market reach across Pakistan</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✓</span>
                <span>Easy listing creation and management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✓</span>
                <span>Targeted audience of serious buyers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✓</span>
                <span>Promotional tools to increase visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✓</span>
                <span>Simplified communication with potential buyers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full bg-green-700 py-16 px-5 my-10">
        <div className="w-[90%] max-w-[1200px] text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Our Premium Services?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who are already benefiting from Janwar Mandi&apos;s innovative livestock marketplace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => router.push("/signup")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Sign Up Now
            </button>
            <button 
              onClick={() => router.push("/about")}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <AppDownload />
      <Footer />
    </>
  );
}

export default Services;