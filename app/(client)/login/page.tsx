"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// Initialize Firebase (only for social logins)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on client side
const app =
  typeof window !== "undefined" ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Create a wrapper component that uses useSearchParams within Suspense
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "session_expired") {
      setError("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  // Function to set cookies
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Email/Password login (using your MongoDB API)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      console.log("Attempting login with:", { email, password: "***" });

      // Call your existing API endpoint
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", res.status);

      // Get response data
      let data;
      try {
        data = await res.json();
        console.log("Response data:", data);
      } catch (parseError) {
        console.error("Parse error:", parseError);
        const text = await res.text();
        console.error("Failed to parse JSON response:", text);
        throw new Error("Invalid response format from server");
      }

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (!data.token) {
        console.error("No token in response:", data);
        throw new Error("No authentication token received");
      }

      console.log("Login successful, storing token");

      // Set token in cookie for middleware
      setCookie("token", data.token, rememberMe ? 7 : 1);

      // Store token in localStorage/sessionStorage as before
      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      // Store user data if available
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Get redirect path from URL or default to dashboard
      const redirectTo = searchParams.get("from") || "/dashboard";
      router.push(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Google login (using Firebase)
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!auth) {
        throw new Error("Firebase auth not initialized");
      }

      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get Firebase ID token
      const firebaseToken = await user.getIdToken();

      // Exchange Firebase token for your JWT token
      const response = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "google",
          token: firebaseToken,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to authenticate with Google"
        );
      }

      const data = await response.json();

      // Set token in cookie for middleware
      setCookie("token", data.token, 7);

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Get redirect path from URL or default to dashboard
      const redirectTo = searchParams.get("from") || "/dashboard";
      router.push(redirectTo);
    } catch (error) {
      console.error("Google login error:", error);

      // If user cancelled the popup
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "auth/popup-closed-by-user"
      ) {
        setError("Login cancelled");
      } else if (error instanceof Error) {
        setError(error.message || "Failed to sign in with Google");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Facebook login (using Firebase)
  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      setError("");

      if (!auth) {
        throw new Error("Firebase auth not initialized");
      }

      // Sign in with Facebook popup
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Get Firebase ID token
      const firebaseToken = await user.getIdToken();

      // Exchange Firebase token for your JWT token
      const response = await fetch("/api/auth/social-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: "facebook",
          token: firebaseToken,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to authenticate with Facebook"
        );
      }

      const data = await response.json();

      // Set token in cookie for middleware
      setCookie("token", data.token, 7);

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Get redirect path from URL or default to dashboard
      const redirectTo = searchParams.get("from") || "/dashboard";
      router.push(redirectTo);
    } catch (error) {
      console.error("Facebook login error:", error);

      // If user cancelled the popup
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "auth/popup-closed-by-user"
      ) {
        setError("Login cancelled");
      } else if (error instanceof Error) {
        setError(error.message || "Failed to sign in with Facebook");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);

    try {
      // Call your existing forgot password API
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resetEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      setResetEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        setResetError(error.message);
      } else {
        setResetError("An unknown error occurred");
      }
    } finally {
      setResetLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setResetEmail(email); // Pre-fill with the email from login form
    setResetEmailSent(false);
    setResetError("");
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-screen">
      {/* Left side - Image */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-screen">
              <Image src="/signup-image.jpg" alt="Login" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center p-8">
                <div className="text-white text-center max-w-md">
                  <h1 className="text-4xl font-bold mb-4 drop-shadow-md">Welcome Back</h1>
                  <p className="text-xl opacity-90 drop-shadow">Sign in to continue your journey with us</p>
                </div>
              </div>
            </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-md p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Social login buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FaGoogle className="mr-3 text-xl text-red-600" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleFacebookLogin}
              disabled={isLoading}
            >
              <FaFacebook className="mr-3 text-xl text-blue-600" />
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6 text-gray-400">
            <div className="flex-1 border-b border-gray-200"></div>
            <span className="px-4 text-sm">OR</span>
            <div className="flex-1 border-b border-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-500">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full py-3 pl-11 pr-4 border border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-500">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full py-3 pl-11 pr-10 border border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 bg-transparent border-none text-gray-500 cursor-pointer text-base"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="py-3 px-4 bg-blue-500 text-white border-none rounded-lg font-medium cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800">
                Reset Password
              </h2>
              <button
                className="text-3xl text-gray-400 hover:text-gray-700 transition-colors"
                onClick={toggleForgotPassword}
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              {resetEmailSent ? (
                <div className="text-center py-4">
                  <p className="text-green-700 mb-6">
                    Password reset email sent! Check your inbox for further
                    instructions.
                  </p>
                  <button
                    className="py-3 px-4 bg-blue-500 text-white border-none rounded-lg font-medium cursor-pointer transition-colors hover:bg-blue-600"
                    onClick={toggleForgotPassword}
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <p className="mb-6 text-gray-600">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password.
                  </p>

                  {resetError && (
                    <div className="bg-red-100 text-red-500 p-3 rounded-lg mb-6 text-sm">
                      {resetError}
                    </div>
                  )}

                  <div className="relative flex items-center mb-6">
                    <div className="absolute left-4 text-gray-500">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      disabled={resetLoading}
                      className="w-full py-3 pl-11 pr-4 border border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-500 text-white border-none rounded-lg font-medium cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    disabled={resetLoading}
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// The main component just wraps the content in Suspense
export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}