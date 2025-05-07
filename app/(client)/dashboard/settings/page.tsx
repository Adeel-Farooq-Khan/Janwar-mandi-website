"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AccountSettingsForm from "@/components/account-settings-form"
import type { User } from "@/types/index"

export default function AccountSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    // Fetch user data
    const fetchUserData = async () => {
      try {
        // First try to get from localStorage
        const userData = localStorage.getItem("user")

        if (userData) {
          setUser(JSON.parse(userData))
          setLoading(false)
        } else {
          // If not in localStorage, fetch from API
          const response = await fetch("/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) {
            throw new Error("Failed to fetch user data")
          }

          const data = await response.json()
          setUser(data)
          localStorage.setItem("user", JSON.stringify(data))
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">Error loading user data</h1>
        <p className="mt-2">Please try refreshing the page or log in again.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
      <AccountSettingsForm user={user} />
    </div>
  )
}
