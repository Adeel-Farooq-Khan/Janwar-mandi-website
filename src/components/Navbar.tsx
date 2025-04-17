"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".main-nav") && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2  text-white  font-bold">
        <div className="flex items-center gap-2">
          <span>📱</span> Download App via SMS
        </div>
        <div className="flex gap-4">
          <Link href="/signup" className="hover:underline">
            Sign Up
          </Link>
          <Link href="/login" className="hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`main-nav flex justify-between items-center px-6 py-4 w-full transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
        {/* Logo */}
        <Link href="/">
          <img src="/logo.png" alt="JM Logo" className="h-12" />
        </Link>

        {/* Hamburger for mobile */}
        <div
          className="hamburger block md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold relative ${
                isScrolled ? 'text-white' : 'text-white'
              } ${
                pathname === link.href ? "text-orange-500 font-bold" : ""
              } hover:text-yellow-400 transition-colors`}
            >
              {link.label}
              <span className="absolute left-0 bottom-[-5px] w-full h-[2px] bg-yellow-300 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Explore Button */}
        <Button className="hidden md:flex bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-md">
          Explore Animals
        </Button>

        {/* Mobile Sidebar */}
        <div
          className={`nav-links md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col items-start px-6 py-8 space-y-4 z-50 transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-black font-medium text-base ${
                pathname === link.href ? "text-orange-600 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}