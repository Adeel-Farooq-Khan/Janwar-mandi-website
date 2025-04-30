"use client";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "../types/index";

interface DashboardNavbarProps {
  user: User;
  showProfileMenu: boolean;
  toggleProfileMenu: () => void;
  handleSignOut: () => Promise<void>;
}

const DashboardNavbar = ({
  user,
  showProfileMenu,
  toggleProfileMenu,
  handleSignOut,
}: DashboardNavbarProps) => {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      await handleSignOut();
      // Redirect to login page after successful sign out
      router.push("/login");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <nav className="bg-green-700 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="text-lg font-semibold">Janwar Mandi</div>
          <div className="hidden sm:flex space-x-4 gap-0">
            <Link 
              href="/dashboard/animals" 
              className="hover:text-green-200 transition-colors mr-4 ml-64"
            >
              My Animals
            </Link>
            <Link 
              href="/dashboard/messages" 
              className="hover:text-green-200 transition-colors"
            >
              Messages
            </Link>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-2xl" />
            <span className="hidden sm:inline-block">{user.name}</span>
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg origin-top-right focus:outline-none z-10 text-gray-700">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                >
                  Account Settings
                </Link>
                <button
                  onClick={onSignOut}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;