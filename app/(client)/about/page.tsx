import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function AboutUS() {
  return (
    <>
    <Navbar />
    <section
  className="relative bg-cover bg-center flex justify-center items-center w-full h-[500px] px-10 pt-8"
  style={{
    backgroundImage:
      `linear-gradient(to left, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.5) 100%), url('/aboutushero.png')`,
  }}
>
  <div className="text-white text-center">
    <h1 className="text-[60px] font-bold">
      <span className="text-yellow-400">About </span> US
    </h1>
  </div>
</section>


      <section className="flex flex-col items-center justify-center w-[90%] max-w-[900px] mx-auto my-10 px-5">
        <h1 className="text-[28px] text-gray-700 mb-2 text-center welcome-heading font-semibold">Welcome To Janwar Mandi</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4">

          Janwar Mandi is Pakistan’s leading online marketplace for dairy farm
          animals, qurbani livestock, and farm accessories. We connect buyers
          and sellers from across the country, making it easier than ever to
          find high-quality animals without the hassle of visiting physical
          markets. Our platform ensures reliable listings, verified sellers, and
          secure communication, giving you the confidence to choose the best
          livestock from the comfort of your home.
        </p>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4">

          At Janwar Mandi, we understand the importance of healthy and well-bred
          animals, whether it’s for daily dairy needs or for the sacred occasion
          of qurbani. That’s why we provide detailed animal profiles, including
          high-quality images, pricing, seller details, and direct contact
          options. No more long market visits – simply browse, compare, and
          connect with sellers instantly!
        </p>
        <h1 className="text-[28px] text-gray-700 mb-2 text-center font-semibold">Our Mission</h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4">

          Our mission is to digitize the livestock industry in Pakistan,
          offering farmers, breeders, and buyers a seamless platform to trade.
          Whether you’re looking for cows, goats, camels, hens, or farm
          equipment, Janwar Mandi is your trusted partner in finding the best
          deals. Join us today and experience a smarter, faster, and more
          reliable way to buy and sell farm animals!
        </p>
      </section>

      <section className="flex flex-col items-center justify-center w-[90%] max-w-[1300px] mx-auto my-10 px-5 shadow-md shadow-black/10 p-5">
        <h1 className="text-[36px] font-extrabold text-gray-700 mb-2 text-center">
          <span className="text-yellow-400">
            <span className="text-green-700 ">Why Chose </span>Janwar Mandi?
          </span>
        </h1>
        <p className="text-[16px] leading-relaxed text-black text-center mb-4 px-10 md:px-5 sm:px-2">
          At Janwar Mandi, we are revolutionizing the way people buy and sell
          farm animals in Pakistan. Whether you need a healthy dairy cow, a
          premium qurbani animal, or essential farm accessories, we provide a
          safe, convenient, and reliable platform for all your livestock needs.
          No more crowded markets or time-consuming searches—simply explore
          listings, compare options, and connect with sellers instantly.
        </p>
      </section>

      <div className="flex justify-center items-center my-5 px-4 sm:px-0">  
  <img src="/whychose.png" alt="Why Choose" className="w-full max-w-[800px] h-auto" />  
</div>  
      <AppDownload />
      <Footer />
    </>
  );
}

export default AboutUS;
