import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import LightNavbar from "@/components/LightNavbar";

function ContactUs() {
  return (
    <>
      <LightNavbar />
      
      <h1 className="text-center text-[50px] font-bold mt-[120px] mb-8 sm:text-[42px] md:text-[36px] lg:text-[50px] ">

        <span className="text-green-700">Contact </span>
        <span className="text-yellow-500">Us</span>
      </h1>

      <section className="flex flex-col lg:flex-row justify-center items-start gap-12 max-w-[1200px] mx-auto px-5 py-10">
        {/* Form */}
        <form className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-full max-w-md">
          <h3 className="text-xl font-semibold mb-2">Your Details</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 border border-gray-300 rounded-lg text-base"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 border border-gray-300 rounded-lg text-base"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="p-3 border border-gray-300 rounded-lg text-base"
          />
          <input
            type="text"
            placeholder="Enter Your Message"
            className="p-3 border border-gray-300 rounded-lg h-24 resize-y text-base"
          />
          <button
            type="submit"
            className="bg-gradient-to-b from-green-400 to-green-800 text-white p-3 rounded-lg font-semibold hover:from-green-800 hover:to-green-400 transition-all"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          <div className="bg-white p-5 shadow-lg rounded-xl">
            <h2 className="text-2xl font-medium mb-2">
              Feel free to drop by or call to say Hello!
            </h2>
            <h3 className="text-lg mt-4 font-semibold">Address</h3>
            <p className="text-gray-600">
              Saeed Alam Tower, 37-Commercial Zone <br />
              Liberty Market, Gulberg, Lahore, Pakistan.
            </p>

            <h3 className="text-lg mt-4 font-semibold">Contact Information</h3>
            <p className="text-gray-600">
              Phone: 042 - 111 WHEELS (042 - 111 943 357)
            </p>
            <p className="text-gray-600">
              Email: customersupport@pakeventures.com
            </p>
            <p className="text-gray-600">
              Find anything about Dairy Farm only on janwarmandi.com
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg w-full sm:w-1/2">
              <i className="fa-solid fa-phone text-green-700 text-lg"></i>
              <h3 className="text-sm font-semibold text-gray-800 text-center">
                Phone Number
              </h3>
              <p className="text-sm font-medium text-gray-600 text-center break-words">
                +923114547723
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-lg w-full sm:w-1/2">
              <i className="fa-brands fa-whatsapp text-green-700 text-lg"></i>
              <h3 className="text-sm font-semibold text-gray-800 text-center">
                Whatsapp
              </h3>
              <p className="text-sm font-medium text-gray-600 text-center break-words">
                +923114547723
              </p>
            </div>
          </div>
        </div>
      </section>
      <AppDownload />
      <Footer />
    </>
  );
}

export default ContactUs;
