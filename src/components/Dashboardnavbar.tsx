"use client"

import { useState, useEffect } from "react"
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaPaw, FaEnvelope, FaCog } from "react-icons/fa"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { User } from "../types/index"
import Image from "next/image"

interface DashboardNavbarProps {
  user: User
  handleSignOut: () => Promise<void>
}

const DashboardNavbar = ({ user, handleSignOut }: DashboardNavbarProps) => {
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [username, setUsername] = useState<string>("")

  // Set username when component mounts or user changes
  useEffect(() => {
    if (user && user.name) {
      setUsername(user.name)
    } else if (user && user.email) {
      // Fallback to email if name is not available
      setUsername(user.email.split("@")[0])
    } else {
      setUsername("User")
    }
  }, [user])

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const onSignOut = async () => {
    try {
      await handleSignOut()

      // Clear all auth-related data
      localStorage.removeItem("token")
      sessionStorage.removeItem("token")
      localStorage.removeItem("user")

      // Clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      // Redirect to login page after successful sign out
      router.push("/login")

      // Force a hard navigation to prevent back button from working
      window.location.href = "/login"
    } catch (error) {
      console.error("Failed to sign out:", error)
    }
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest("[data-profile-menu]") && showProfileMenu) {
        setShowProfileMenu(false)
      }
      if (!target.closest("[data-mobile-menu]") && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showProfileMenu, isMobileMenuOpen])

  return (
    <nav className="bg-green-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-white text-xl font-bold">
                Janwar Mandi
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                href="/dashboard/animals"
                className="text-white hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <FaPaw className="mr-2" />
                My Animals
              </Link>
              <Link
                href="/dashboard/messages"
                className="text-white hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <FaEnvelope className="mr-2" />
                Messages
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              data-mobile-menu
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* User profile dropdown */}
          <div className="hidden md:flex md:items-center">
            <div className="ml-3 relative" data-profile-menu>
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL || "/placeholder.svg"}
                    alt={username}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-xl" />
                )}
                <span>{username}</span>
              </button>

              {/* Profile dropdown panel */}
              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <Link
                    href="/dashboard/settings"
                    className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaCog className="mr-2" />
                    Account Settings
                  </Link>
                  <button
                    onClick={onSignOut}
                    className="w-full text-left  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-800" data-mobile-menu>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/dashboard/animals"
              className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaPaw className="mr-2" />
              My Animals
            </Link>
            <Link
              href="/dashboard/messages"
              className="text-white hover:bg-green-600  px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <FaEnvelope className="mr-2" />
              Messages
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-green-600">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL || "/placeholder.svg"}
                    alt={username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-white" />
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{username}</div>
                <div className="text-sm font-medium text-green-200">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/dashboard/settings"
                className=" px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 flex items-center"
              >
                <FaCog className="mr-2" />
                Account Settings
              </Link>
              <button
                onClick={onSignOut}
                className="w-full text-left  px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default DashboardNavbar
