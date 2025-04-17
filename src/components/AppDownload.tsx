export default function AppDownload() {
    return (
      <section className="app-download flex justify-between items-center py-16 px-8 md:px-12 lg:px-16 mt-20">
        <div className="app-info flex-1 max-w-lg px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2e7d32] mb-4">
            Get The Janwar Mandi App
          </h2>
          <p className="text-base sm:text-lg text-[#555] mb-6 leading-relaxed">
            The easiest way to browse, compare, and contact sellers for Dairy & Qurbani Animals - all in one app!
          </p>
  
          <div className="app-store-buttons flex gap-6">
            <a href="#" className="play-store transform transition-transform hover:scale-105">
              <img src="/google-play.png" alt="Download on Google Play" className="h-10" />
            </a>
            <a href="#" className="app-store transform transition-transform hover:scale-105">
              <img src="/apple.png" alt="Download on App Store" className="h-10" />
            </a>
          </div>
        </div>
  
        <div className="qr-section flex flex-col items-center text-center">
          <div className="qr-code mb-4">
            <img src="/qr code.png" alt="QR Code" className="h-40" />
          </div>
          <p className="text-sm sm:text-base text-[#555]">
            Scan the QR <br /> to get the App
          </p>
        </div>
  
        <div className="phone-mockup flex-1 max-w-xs text-right">
          <img src="/app mockup.jpg" alt="Janwar Mandi App Mockup" className="w-full" />
        </div>
      </section>
    )
  }
  