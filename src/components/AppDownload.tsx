import Image from "next/image"

export default function AppDownload() {
  return (
    <section className="app-download flex flex-col lg:flex-row justify-between items-center py-32  md:px-12 lg:px-32 mt-20 gap-10 ">
      {/* Left: Text + Store Buttons */}
      <div className="flex-1 max-w-lg text-center lg:text-left order-2 lg:order-1">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#2e7d32] mb-4">
          Get The Janwar Mandi App
        </h2>
        <p className="text-base sm:text-lg text-[#555] mb-6 leading-relaxed">
          The easiest way to browse, compare, and contact sellers for Dairy &
          Qurbani Animals - all in one app!
        </p>

        {/* Store Buttons */}
        <div className="app-store-buttons flex justify-center lg:justify-start gap-4 flex-wrap mt-6">
          <a
            href="#"
            className="transform transition-transform hover:scale-105"
          >
            <Image
  src="/google-play.png"
  alt="Download on Google Play"
  className="h-10"
  width={150} 
  height={60} 
  layout="intrinsic" 
/>

          </a>
          <a
            href="#"
            className="transform transition-transform hover:scale-105"
            >
          <Image
  src="/apple.png"
  alt="Download on App Store"
  className="h-10"
  width={150} 
  height={60} 
  layout="intrinsic" 
/>

          </a>
        </div>
      </div>

      {/* Middle: QR Code */}
      <div className="order-3 lg:order-2 text-center">
      <Image
  src="/qrcode.png"
  alt="QR Code"
  className="h-40 mx-auto mb-2"
  width={300}  
  height={40} 
  layout="intrinsic" // Ensures the image adjusts to its aspect ratio
/>

        {/* <p className="text-sm sm:text-base text-[#555]">
          Scan the QR <br /> to get the App
        </p> */}
      </div>

      {/* Right: Mockup Image */}
      <div className="w-full max-w-xs order-1 lg:order-3 flex justify-center items-center">
      <Image
  src="/pngegg.png"
  alt="Janwar Mandi App Mockup"
  className="h-[240px] w-auto object-contain"
  width={360}  // Specify the width based on your design
  height={240} // Specify the height
  layout="intrinsic" // Ensures the image adjusts to its aspect ratio
/>

</div>


    </section>
  );
}
