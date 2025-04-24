import { Button } from "./ui/button"

export default function FeaturedBanner() {
  return (
    <section
      className="relative h-[600px] w-full bg-cover bg-center flex justify-center flex-col px-5 md:px-10 bg-slate-900"
      style={{ backgroundImage: `url('/3cowsimg.png') ` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-0" />

      <div className="relative z-10 max-w-[750px] w-full text-center mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Pakistan&apos;s #1 Marketplace <br />
            for <span className="text-yellow-300 px-2">Dairy & Qurbani Animals!</span>
          </h1>
        </div>
      <div></div>
        <div className="text-white text-base sm:text-lg mb-6 space-x-2">
          <span className="text-shadow">Verified Sellers</span>
          <span className="text-shadow">|</span>
          <span className="text-shadow">Best Prices</span>
          <span className="text-shadow">|</span>
          <span className="text-shadow">Direct Contact</span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-100">
            FREE SIGNUP
          </Button>

          <div className="font-['Noto_Nastaliq_Urdu'] text-white text-lg leading-7 rtl text-right text-shadow">
            <p>اگر آپ سائن اپ نہیں کر سکتے</p>
            <p>اپنے مویشی کے معلومات ہمیں Whatsapp کریں اور</p>
            <p>ہم اپ ک لئے اپ لوڈ کریں گے</p>
          </div>

          <div className="mt-3">
            <a
              href="tel:+923114547723"
              className="inline-block bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition"
            >
              +923114547723
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
