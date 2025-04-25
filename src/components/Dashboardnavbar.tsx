"use client";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
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
  return (
    <nav className="bg-green-700 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">Animal Management Dashboard</div>
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
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                >
                  Account Settings
                </a>
                <button
                  onClick={handleSignOut}
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
