"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // Track active dropdown
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null); // Active dropdown in mobile view

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".main-nav") && isOpen) {
        setIsOpen(false);
      }

      if (
        !(event.target as Element).closest(".category-dropdown") &&
        dropdownOpen
      ) {
        setDropdownOpen(null); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, dropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contactus" },
    {
      label: "All Categories",
      href: "/categories",
      dropdown: true,
      items: [
        { label: "Dairy", href: "/categories/dairy" },
        { label: "Meat", href: "/categories/meat" },
        { label: "Qurbani", href: "/categories/qurbani" },
      ],
    },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Services", href: "/services" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div
          className={`flex justify-between items-center px-32 py-2 font-bold transition-colors ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          <div className="hidden sm:flex items-center gap-2 text-sm text-white">
            <Image
              src="/mobile.png"
              alt="Mobile Icon"
              className="h-8 w-4"
              width={4}
              height={8}
            />
            <span className={`${isScrolled ? "text-black" : "text-white"}`}>
              Download App via SMS
            </span>
          </div>

          <div className="hidden sm:flex gap-4">
            <Link
              href="/signup"
              className={`hover:underline ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className={`hover:underline ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="main-nav flex justify-between items-center px-6 sm:px-8 md:px-32 py-4 w-full relative">
          {/* Logo */}
          <Link href="/" className="hidden sm:block">
            <Image
              src="/newlogo.png"
              alt="JM Logo"
              className="h-12 mb-2"
              width={48}
              height={48}
            />
          </Link>

          {/* Hamburger (Mobile) */}
          <div
            className={`hamburger md:hidden cursor-pointer text-2xl absolute top-4 right-4 z-50 ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)} // Toggle state here
          >
            ☰
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 mx-auto">
            {navLinks.map((link) => (
              <div key={link.href} className="relative category-dropdown">
                {link.dropdown ? (
                  <div className="relative group">
                    <button
                      onClick={() => setDropdownOpen((prev) => (prev === link.href ? null : link.href))}
                      className={`font-semibold flex items-center gap-1 ${
                        isScrolled ? "text-black" : "text-white"
                      } ${
                        pathname === link.href ||
                        pathname?.startsWith(link.href + "/")
                          ? "text-orange-500 font-bold"
                          : ""
                      } hover:text-yellow-400 transition-colors duration-200`}
                    >
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-200 ${
                          dropdownOpen === link.href ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg min-w-[180px] border border-gray-200 opacity-0 ${
                        dropdownOpen === link.href ? "opacity-100" : ""
                      } transition-all duration-300 ease-in-out z-50`}
                    >
                      {link.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 hover:text-orange-600 transition-colors duration-200 whitespace-nowrap"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`font-semibold relative ${
                      isScrolled ? "text-black" : "text-white"
                    } ${
                      pathname === link.href ? "text-orange-500 font-bold" : ""
                    } hover:text-yellow-400 transition-colors`}
                  >
                    {link.label}
                    <span className="absolute left-0 bottom-[-5px] w-full h-[2px] bg-yellow-300 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Explore Button */}
          <Button className="hidden md:flex bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md">
            Explore Animals
          </Button>

        </nav>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`nav-links md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl flex flex-col px-6 py-8 space-y-4 z-50 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4 w-full">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="w-full">
                <div className="flex justify-between items-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-black font-semibold text-base ${
                      pathname === link.href ||
                      pathname?.startsWith(link.href + "/")
                        ? "text-orange-600"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  <button
                    onClick={() =>
                      setOpenMobileDropdown((prev) =>
                        prev === link.href ? null : link.href
                      )
                    }
                    className="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform duration-200 ${
                        openMobileDropdown === link.href ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Dropdown Content */}
                <div
                  className={`mt-2 transition-all duration-300 overflow-hidden ${
                    openMobileDropdown === link.href
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {link.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 pl-8 text-sm text-gray-800 hover:bg-yellow-100 hover:text-orange-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-semibold text-base text-black ${
                  pathname === link.href ? "text-orange-600" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
