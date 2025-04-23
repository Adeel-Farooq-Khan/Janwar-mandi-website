"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".main-nav") && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contactus" },
    { label: "All Categories", href: "/categories" },
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
        {/* Top Bar (Download text left, Auth right on large screens) */}
        <div
          className={`flex justify-between items-center px-32 py-2 font-bold ${
            isScrolled ? "text-black bg-white" : "text-white"
          }`}
        >
          {/* Left (Desktop only): Download Text */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-white">
          <Image src="/mobile.png" alt="Mobile Icon" className="h-8 w-4" />
            <span>Download App via SMS</span>
          </div>

          {/* Right: Sign Up / Sign In */}
          <div className="hidden sm:flex gap-4">
            <Link href="/signup" className="hover:underline text-white">
              Sign Up
            </Link>
            <Link href="/login" className="hover:underline text-white">
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile: Logo + Download text centered */}
        <div className="sm:hidden flex flex-col items-center justify-center w-full pb-3  border-gray-300">
          <Image src="/newlogo.png" alt="JM Logo" className="h-12 mb-2" />
          <div className="flex items-center gap-2 text-white text-sm">
            <Image src="/mobile.png" alt="Mobile Icon" className="h-4 w-4" />
            <span>Download App via SMS</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="main-nav flex justify-between items-center px-32 py-4 w-full transition-all duration-300 relative">
          {/* Logo (Desktop only, centered-ish) */}
          <Link href="/" className="hidden sm:block">
            <Image src="/newlogo.png" alt="JM Logo" className="h-12" />
          </Link>

          {/* Hamburger (Mobile only) */}
          <div
            className={`hamburger block md:hidden cursor-pointer text-2xl absolute right-6 -top-18 ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
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
            ))}
          </div>

          {/* Explore Button (Desktop only) */}
          <Button className="hidden md:flex bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md">
            Explore Animals
          </Button>

          {/* Mobile Sidebar Menu */}
          <div
            className={`nav-links md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col justify-start items-start px-6 py-8 space-y-4 z-50 transition-transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-4 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-black font-medium text-base ${
                    pathname === link.href
                      ? "text-orange-600 font-semibold"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 w-full border-t pt-4 flex flex-col gap-3">
              <Link
                href="/signup"
                className="w-full border border-green-700 text-green-700 font-semibold py-2 rounded-md text-center hover:bg-green-100"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="w-full border border-blue-700 text-blue-700 font-semibold py-2 rounded-md text-center hover:bg-blue-100"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
