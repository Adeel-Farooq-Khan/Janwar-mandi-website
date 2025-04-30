"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChartBar, FaPaw, FaUsers, FaListAlt, FaCog } from "react-icons/fa"

const navLinks = [
  { href: "/", label: "Dashboard", icon: <FaChartBar /> },
  { href: "/animals", label: "Animals", icon: <FaPaw /> },
  { href: "/users", label: "Users", icon: <FaUsers /> },
  { href: "/categories", label: "Categories", icon: <FaListAlt /> },
  { href: "/settings", label: "Settings", icon: <FaCog /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[250px] bg-[#2c3e50] text-white flex flex-col fixed h-screen z-10 max-md:w-[60px] overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold max-md:hidden">Janwar Mandi Admin</h2>
      </div>

      <nav className="flex-1 py-4 flex flex-col">
        {navLinks.map(({ href, label, icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-all ${
                isActive
                  ? "bg-white/15 text-white border-l-4 border-blue-400"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              } max-md:justify-center max-md:px-3 max-md:gap-0`}
            >
              <span className="text-base">{icon}</span>
              <span className="max-md:hidden">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 text-xs text-white/50 max-md:hidden">
        © {new Date().getFullYear()} PetBazar
      </div>
    </aside>
  )
}
