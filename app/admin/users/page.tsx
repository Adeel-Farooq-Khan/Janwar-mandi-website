"use client"

import AdminLayout from "@/components/AdminLayout"
import { FaSearch, FaFilter, FaEdit, FaCheck, FaTimes, FaClock } from "react-icons/fa"
import { useState } from "react"

// Subscription types
const SUBSCRIPTION_TYPES = [
  { id: "free", name: "Free Trial", color: "gray" },
  { id: "silver", name: "Silver", color: "silver" },
  { id: "gold", name: "Gold", color: "gold" },
  { id: "platinum", name: "Platinum", color: "purple" },
  { id: "expired", name: "Expired", color: "red" },
]

// Mock user data with subscription information
const MOCK_USERS = [
  {
    id: 1,
    displayName: "Waleed",
    email: "waleed@gmail.com",
    phone: "123-456-7890",
    location: "Lahore",
    createdAt: new Date(2023, 5, 15),
    subscription: {
      type: "gold",
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      listingsUsed: 4,
      listingsTotal: 10,
      paymentVerified: true,
    },
  },
  {
    id: 2,
    displayName: "Adeel",
    email: "adeel@example.com",
    phone: "987-654-3210",
    location: "Karachi",
    createdAt: new Date(2023, 8, 22),
    subscription: {
      type: "silver",
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      listingsUsed: 2,
      listingsTotal: 3,
      paymentVerified: true,
    },
  },
  {
    id: 3,
    displayName: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "333-444-5555",
    location: "Islamabad",
    createdAt: new Date(2023, 10, 5),
    subscription: {
      type: "platinum",
      expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      listingsUsed: 7,
      listingsTotal: 19,
      paymentVerified: true,
    },
  },
  {
    id: 4,
    displayName: "Sara Malik",
    email: "sara@example.com",
    phone: "111-222-3333",
    location: "Multan",
    createdAt: new Date(2023, 11, 12),
    subscription: {
      type: "free",
      expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (expired)
      listingsUsed: 1,
      listingsTotal: 1,
      paymentVerified: true,
    },
  },
  {
    id: 5,
    displayName: "Ali Hassan",
    email: "ali@example.com",
    phone: "444-555-6666",
    location: "Faisalabad",
    createdAt: new Date(2024, 0, 10),
    subscription: {
      type: "silver",
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      listingsUsed: 3,
      listingsTotal: 3,
      paymentVerified: false,
    },
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")
  const [users, setUsers] = useState(MOCK_USERS)
  const [editingUser, setEditingUser] = useState<number | null>(null)
  const [selectedSubscription, setSelectedSubscription] = useState("")

  // Calculate days remaining for subscription
  const getDaysRemaining = (expiresAt: Date) => {
    const now = new Date()
    const diffTime = expiresAt.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get appropriate status badge color
  const getStatusColor = (type: string, daysRemaining: number, verified: boolean) => {
    if (!verified) return "bg-yellow-100 text-yellow-800"
    if (daysRemaining <= 0) return "bg-red-100 text-red-800"
    if (daysRemaining <= 3) return "bg-orange-100 text-orange-800"

    switch (type) {
      case "free":
        return "bg-gray-100 text-gray-800"
      case "silver":
        return "bg-blue-100 text-blue-800"
      case "gold":
        return "bg-amber-100 text-amber-800"
      case "platinum":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Handle subscription update
  const handleSubscriptionUpdate = (userId: number) => {
    if (!selectedSubscription) return

    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          // Calculate new expiry date (30 days from now for paid plans)
          const expiryDate = new Date()
          if (selectedSubscription === "free") {
            expiryDate.setDate(expiryDate.getDate() + 7) // 7 days for free
          } else {
            expiryDate.setDate(expiryDate.getDate() + 30) // 30 days for paid plans
          }

          // Set listings based on subscription type
          let listingsTotal = 1
          switch (selectedSubscription) {
            case "silver":
              listingsTotal = 3
              break
            case "gold":
              listingsTotal = 10
              break
            case "platinum":
              listingsTotal = 19
              break
          }

          return {
            ...user,
            subscription: {
              ...user.subscription,
              type: selectedSubscription,
              expiresAt: expiryDate,
              listingsTotal,
              paymentVerified: true,
            },
          }
        }
        return user
      }),
    )

    setEditingUser(null)
    setSelectedSubscription("")
  }

  // Handle payment verification
  const handleVerifyPayment = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            subscription: {
              ...user.subscription,
              paymentVerified: true,
            },
          }
        }
        return user
      }),
    )
  }

  // Filter users based on search term and subscription filter
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSubscription =
      subscriptionFilter === "all" ||
      user.subscription.type === subscriptionFilter ||
      (subscriptionFilter === "expired" && getDaysRemaining(user.subscription.expiresAt) <= 0)

    return matchesSearchTerm && matchesSubscription
  })

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Users & Subscriptions</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            View and manage user subscriptions and posting privileges
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-grow">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2.5 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Subscriptions</option>
                <option value="free">Free Trial</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Contact
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subscription
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                  >
                    Listings
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                  >
                    Time Remaining
                  </th>
                  <th
                    scope="col"
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const daysRemaining = getDaysRemaining(user.subscription.expiresAt)
                    const statusColor = getStatusColor(
                      user.subscription.type,
                      daysRemaining,
                      user.subscription.paymentVerified,
                    )

                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-semibold">
                              {user.displayName.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3 sm:ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                              <div className="text-xs sm:text-sm text-gray-500">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500 sm:hidden">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone || "—"}</div>
                          <div className="text-sm text-gray-500">{user.location || "—"}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          {editingUser === user.id ? (
                            <div className="flex items-center space-x-2">
                              <select
                                value={selectedSubscription}
                                onChange={(e) => setSelectedSubscription(e.target.value)}
                                className="border border-gray-300 rounded-md p-1 text-sm"
                              >
                                <option value="">Select plan...</option>
                                {SUBSCRIPTION_TYPES.map((type) => (
                                  <option key={type.id} value={type.id}>
                                    {type.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleSubscriptionUpdate(user.id)}
                                className="p-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                                disabled={!selectedSubscription}
                              >
                                <FaCheck className="text-xs" />
                              </button>
                              <button
                                onClick={() => setEditingUser(null)}
                                className="p-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                              >
                                <FaTimes className="text-xs" />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}
                              >
                                {user.subscription.type.charAt(0).toUpperCase() + user.subscription.type.slice(1)}
                                {!user.subscription.paymentVerified && " (Pending)"}
                              </span>
                              <div className="text-xs mt-1 md:hidden">
                                <span
                                  className={`${daysRemaining <= 0 ? "text-red-500" : daysRemaining <= 3 ? "text-orange-500" : "text-green-500"}`}
                                >
                                  {daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}
                                </span>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-sm text-gray-900">
                            {user.subscription.listingsUsed} / {user.subscription.listingsTotal}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{
                                width: `${(user.subscription.listingsUsed / user.subscription.listingsTotal) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          {daysRemaining > 0 ? (
                            <div className="flex items-center">
                              <FaClock
                                className={`mr-1 ${daysRemaining <= 3 ? "text-orange-500" : "text-green-500"}`}
                              />
                              <span
                                className={`${daysRemaining <= 3 ? "text-orange-500" : "text-green-500"} font-medium`}
                              >
                                {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-red-500 font-medium">Expired</span>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingUser(user.id)
                                setSelectedSubscription("")
                              }}
                              className="text-green-600 hover:text-green-900 bg-green-50 p-1.5 rounded-md"
                            >
                              <FaEdit className="text-sm" />
                            </button>

                            {!user.subscription.paymentVerified && (
                              <button
                                onClick={() => handleVerifyPayment(user.id)}
                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-1.5 rounded-md"
                                title="Verify Payment"
                              >
                                <FaCheck className="text-sm" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 sm:px-6 py-4 text-center text-gray-500">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
