"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaSearch, FaFilter } from "react-icons/fa"
import { useState } from "react"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")

  const users = [
    { id: 1, displayName: "John Doe", email: "john@example.com", phone: "123-456-7890", location: "Lahore", createdAt: new Date(), isAdmin: true },
    { id: 2, displayName: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", location: "Karachi", createdAt: new Date(), isAdmin: false },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearchTerm = user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUserType = userTypeFilter === "all" || (userTypeFilter === "admin" && user.isAdmin) || (userTypeFilter === "regular" && !user.isAdmin)
    return matchesSearchTerm && matchesUserType
  })

  return (
    <AdminLayout>
      <div className="admin-users-page p-6">
        <div className="admin-page-header mb-6">
          <h1 className="admin-page-title text-3xl font-semibold">Manage Users</h1>
        </div>

        <div className="admin-filters mb-6 flex gap-4">
          <div className="admin-search flex items-center gap-2">
            <FaSearch className="admin-search-icon text-xl" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md w-64"
            />
          </div>

          <div className="admin-filter flex items-center gap-2">
            <FaFilter className="admin-filter-icon text-xl" />
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="all">All Users</option>
              <option value="admin">Admins Only</option>
              <option value="regular">Regular Users</option>
            </select>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table min-w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Joined</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">
                      <div className="admin-user-info flex items-center gap-2">
                        <div className="admin-user-avatar w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-white">
                          {user.displayName.charAt(0)}
                        </div>
                        <span>{user.displayName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone || "—"}</td>
                    <td className="px-4 py-2">{user.location || "—"}</td>
                    <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span className={`admin-user-status ${user.isAdmin ? "text-blue-500" : "text-gray-500"}`}>
                        {user.isAdmin ? "Admin" : "Regular User"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
