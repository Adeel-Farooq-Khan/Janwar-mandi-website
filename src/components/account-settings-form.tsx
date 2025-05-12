"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaLock,
  FaUpload,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa"
import type { User } from "@/types/index"

interface AccountSettingsFormProps {
  user: User
}

interface FormData {
  name: string
  email: string
  bio: string
  phone: string
  address: string
  city: string
  country: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface FormErrors {
  [key: string]: string
}

export default function AccountSettingsForm({ user }: AccountSettingsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [photoPreview, setPhotoPreview] = useState<string | null>(user.photoURL || null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const [photoSuccess, setPhotoSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Reset success/error messages after 5 seconds
  useEffect(() => {
    if (submitSuccess || submitError || photoSuccess || photoError) {
      const timer = setTimeout(() => {
        setSubmitSuccess(null)
        setSubmitError(null)
        setPhotoSuccess(null)
        setPhotoError(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [submitSuccess, submitError, photoSuccess, photoError])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Reset messages when changing tabs
    setSubmitSuccess(null)
    setSubmitError(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image size should be less than 5MB")
      return
    }

    setPhotoFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Clear error if any
    setPhotoError(null)
  }

  const uploadPhoto = async () => {
    if (!photoFile) return

    setUploadingPhoto(true)
    setPhotoError(null)
    setPhotoSuccess(null)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("photo", photoFile)

      // Get token
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")

      // Upload photo
      const response = await fetch("/api/user/upload-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to upload photo")
      }

      const data = await response.json()

      // Update user data in localStorage
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsedUser = JSON.parse(userData)
        parsedUser.photoURL = data.photoURL
        localStorage.setItem("user", JSON.stringify(parsedUser))
      }

      setPhotoSuccess("Profile photo updated successfully")
    } catch (error) {
      console.error("Error uploading photo:", error)
      setPhotoError(error instanceof Error ? error.message : "Failed to upload photo")
    } finally {
      setUploadingPhoto(false)
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    // Validate based on active tab
    if (activeTab === "profile") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
      }
    } else if (activeTab === "contact") {
      if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number"
      }
    } else if (activeTab === "password") {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required"
      }

      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required"
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters"
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) return

    setSubmitting(true)
    setSubmitSuccess(null)
    setSubmitError(null)

    try {
      // Get token
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")

      // Prepare data based on active tab
      let endpoint = ""
      let data = {}

      if (activeTab === "profile") {
        endpoint = "/api/user/update-profile"
        data = {
          name: formData.name,
          email: formData.email,
          bio: formData.bio,
        }
      } else if (activeTab === "contact") {
        endpoint = "/api/user/update-contact"
        data = {
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        }
      } else if (activeTab === "password") {
        endpoint = "/api/user/change-password"
        data = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      }

      // Submit data
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update settings")
      }

      // Update user data in localStorage if profile was updated
      if (activeTab === "profile") {
        const userData = localStorage.getItem("user")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          parsedUser.name = formData.name
          parsedUser.email = formData.email
          parsedUser.bio = formData.bio
          localStorage.setItem("user", JSON.stringify(parsedUser))
        }
      }

      // Clear password fields
      if (activeTab === "password") {
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }

      setSubmitSuccess("Settings updated successfully")
    } catch (error) {
      console.error("Error updating settings:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to update settings")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "profile" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("profile")}
        >
          Profile Information
        </button>
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "contact" ? "border-b-2 border-green-500 text-green-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("contact")}
        >
          Contact & Location
        </button>
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === "password"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => handleTabChange("password")}
        >
          Change Password
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        {/* Profile Photo (shown in all tabs) */}
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer border-4 border-white shadow-md"
              onClick={handlePhotoClick}
            >
              {photoPreview ? (
                <Image
                  src={photoPreview || "/placeholder.svg"}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                  <FaUser size={40} />
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
            <p className="text-sm text-gray-500 mb-3">Upload a new profile photo. JPG, PNG or GIF, max 5MB.</p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handlePhotoClick}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <FaUpload className="mr-2 -ml-1 h-4 w-4" />
                Choose Photo
              </button>

              {photoFile && (
                <button
                  type="button"
                  onClick={uploadPhoto}
                  disabled={uploadingPhoto}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingPhoto ? (
                    <>
                      <div className="animate-spin mr-2 -ml-1 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaCheck className="mr-2 -ml-1 h-4 w-4" />
                      Upload Photo
                    </>
                  )}
                </button>
              )}
            </div>

            {photoError && (
              <div className="mt-2 text-sm text-red-600">
                <FaExclamationTriangle className="inline mr-1" />
                {photoError}
              </div>
            )}

            {photoSuccess && (
              <div className="mt-2 text-sm text-green-600">
                <FaCheck className="inline mr-1" />
                {photoSuccess}
              </div>
            )}
          </div>
        </div>

        {/* Success/Error Messages */}
        {submitSuccess && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
            <FaCheck className="mr-2" />
            {submitSuccess}
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
            <FaExclamationTriangle className="mr-2" />
            {submitError}
          </div>
        )}

        {/* Profile Information Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    placeholder="Your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Tell us a little about yourself"
              />
              <p className="mt-1 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
            </div>
          </div>
        )}

        {/* Contact & Location Tab */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCity className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="New York"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaGlobe className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.currentPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder="Enter your current password"
                />
              </div>
              {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.newPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder="Enter new password"
                />
              </div>
              {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
              <p className="mt-1 text-sm text-gray-500">Password must be at least 8 characters long.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500`}
                  placeholder="Confirm new password"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
