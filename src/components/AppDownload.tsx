export default function AppDownload() {
  return (
    <section className="app-download flex flex-col lg:flex-row justify-between items-center py-16 px-6 md:px-12 lg:px-16 mt-20 gap-10">
      
      {/* Left: Text + Store Buttons */}
      <div className="flex-1 max-w-lg text-center lg:text-left order-2 lg:order-1">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#2e7d32] mb-4">
          Get The Janwar Mandi App
        </h2>
        <p className="text-base sm:text-lg text-[#555] mb-6 leading-relaxed">
          The easiest way to browse, compare, and contact sellers for Dairy & Qurbani Animals - all in one app!
        </p>

        {/* Store Buttons */}
        <div className="app-store-buttons flex justify-center lg:justify-start gap-4 flex-wrap mt-6">
          <a href="#" className="transform transition-transform hover:scale-105">
            <img src="/google-play.png" alt="Download on Google Play" className="h-10" />
          </a>
          <a href="#" className="transform transition-transform hover:scale-105">
            <img src="/apple.png" alt="Download on App Store" className="h-10" />
          </a>
        </div>
      </div>

      {/* Middle: QR Code */}
      <div className="order-3 lg:order-2 text-center">
        <img src="/qr code.png" alt="QR Code" className="h-40 mx-auto mb-2" />
        <p className="text-sm sm:text-base text-[#555]">
          Scan the QR <br /> to get the App
        </p>
      </div>

      {/* Right: Mockup Image */}
      <div className="flex-1 max-w-xs w-full order-1 lg:order-3">
        <img src="/app mockup.jpg" alt="Janwar Mandi App Mockup" className="w-full mx-auto" />
      </div>
    </section>
  );
}
