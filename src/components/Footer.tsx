import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer bg-gradient-to-b from-[#2E7D32] to-[#54E35B] text-white py-10 md:py-12 lg:py-16 px-32 bg-cyan-400">
      <div className="footer-container flex flex-wrap justify-between  mx-auto ">
        {/* Company Info */}
        <div className="footer-company flex-1 min-w-[250px] mb-8">
          <div className="footer-logo flex items-center mb-4">
            <Image
              src="/logo.png"
              alt="Janwar Mandi Logo"
              className="w-16 h-16 mr-3"
              width={64} // Adjust width according to your design
              height={64} // Adjust height according to your design
              layout="intrinsic" // Ensures the image adjusts to its aspect ratio
            />

            <h3 className="text-xl font-semibold">Janwar Mandi</h3>
          </div>
          <p className="company-tagline text-sm mb-2 opacity-90">
            Pakistan&apos;s #1 Marketplace for Dairy & Qurbani Animals.
          </p>
          <p className="company-description text-sm opacity-80">
            Find verified sellers and buy with ease!
          </p>
        </div>

        {/* About Links */}
        <div className="footer-links flex-1 min-w-[160px] mb-8">
          <h4 className="text-lg font-semibold text-[#ffe000] mb-4">
            About Janwar Mandi
          </h4>
          <ul className="list-none p-0 m-0">
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Browse Animals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-links flex-1 min-w-[160px] mb-8">
          <h4 className="text-lg font-semibold text-[#ffe000] mb-4">
            Categories
          </h4>
          <ul className="list-none p-0 m-0">
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Dairy Animals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Goats
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Hens
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Qurbani Animals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Farm Accessories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white text-sm hover:opacity-80 hover:underline"
              >
                Business
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact flex-1 min-w-[200px] mb-8">
          <h4 className="text-lg font-semibold text-[#ffe000] mb-4">Contact</h4>
          <ul className="list-none p-0 m-0">
            <li className="flex items-center mb-3 text-sm">
              <span className="mr-3 text-xl">📞</span>
              <a
                href="tel:+923114547723"
                className="text-white hover:opacity-80 hover:underline"
              >
                +923114547723
              </a>
            </li>
            <li className="flex items-center mb-3 text-sm">
              <span className="mr-3 text-xl">✉️</span>
              <a
                href="mailto:ahmednayat096@gmail.com"
                className="text-white hover:opacity-80 hover:underline"
              >
                ahmednayat096@gmail.com
              </a>
            </li>
            <li className="flex items-center mb-3 text-sm">
              <span className="mr-3 text-xl">📍</span>
              <span>Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media and App Downloads */}
      <div className="footer-social flex flex-wrap justify-between items-center mx-auto  py-6 border-t border-b border-white/10">
        <div className="social-icons flex gap-6 mb-6">
          <a
            href="#"
            className="social-icon w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="social-icon w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="social-icon w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="#"
            className="social-icon w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="#"
            className="social-icon w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom flex justify-between items-center flex-wrap mx-auto py-4 sm:text-center">
        <p className="text-sm opacity-80">
          © {currentYear} Janwar Mandi. All rights reserved.
        </p>
        <div className="footer-bottom-links flex gap-8">
          <a
            href="#"
            className="text-white text-sm opacity-80 hover:opacity-100 hover:underline"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-white text-sm opacity-80 hover:opacity-100 hover:underline"
          >
            Accessibility
          </a>
          <a
            href="#"
            className="text-white text-sm opacity-80 hover:opacity-100 hover:underline"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
