"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/Dashboardnavbar";
import type { User } from "@/types/index";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async (token: string) => {
      try {
        const response = await fetch("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
      }
    };

    // Check if user is authenticated
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      // No token found, redirect to login
      router.push("/login");
      return;
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        router.push("/login");
      }
    } else {
      // No user data found, fetch it from API
      fetchUserData(token);
    }

    setLoading(false);
  }, [router]);

  const handleSignOut = async () => {
    try {
      // Call your sign-out API if needed
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Clear all auth data regardless of API response
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("user");

      return Promise.resolve();
    } catch (error) {
      console.error("Error during sign out:", error);
      return Promise.reject(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar user={user} handleSignOut={handleSignOut} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
