// Option 1: Declare and then export default
const DashboardNavbar = ({
  user,
  showProfileMenu,
  toggleProfileMenu,
  handleSignOut,
}) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3 h-16">
        <div className="font-bold text-2xl text-gray-800">
          <a href="#">Janwar Mandi </a>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="/dashboard"
            className="text-gray-800 font-medium border-b-2 border-blue-500"
          >
            Dashboard
          </a>
          <a
            href="/messages"
            className="text-gray-500 hover:text-blue-500 relative"
          >
            Messages
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
              3
            </span>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-500">
            Favorites
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-transparent border-none w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-blue-500 relative">
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-[18px] h-[18px] rounded-full flex items-center justify-center">
              2
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="bg-transparent border-none p-0 cursor-pointer flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold text-base border-2 border-gray-200">
                {user?.name?.charAt(0) || "U"}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute top-[calc(100%+0.5rem)] right-0 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800 text-[0.95rem]">
                      {user?.name || "User"}
                    </span>
                    <span className="text-gray-500 text-[0.85rem]">
                      {user?.email}
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  <a
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 text-[0.9rem]"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Profile
                  </a>
                  <a
                    className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 text-[0.9rem]"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Settings
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 text-[0.9rem] font-inherit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 2v3.586l3.293 3.293a1 1 0 01.293.707V16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1h4.586a1 1 0 01.707.293l3 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
