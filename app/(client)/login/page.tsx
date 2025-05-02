"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function Login() {
  const router = useRouter();
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      const contentType = res.headers.get("Content-Type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || "Invalid response from server");

      }

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Store token in localStorage if rememberMe is checked
      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }

      // Redirect to dashboard or home page
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError("");
    setIsLoading(true);

    // Mock Google login
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in with Google");
    }, 1500);
  };

  const handleFacebookLogin = () => {
    setError("");
    setIsLoading(true);

    // Mock Facebook login
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in with Facebook");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);

    try {
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
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
        <Image
          src="/signup-image.jpg"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center p-8">
          <div className="text-white text-center max-w-4/5">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
              Welcome Back
            </h1>
            <p className="text-xl opacity-90 drop-shadow">
              Sign in to continue your journey with us
            </p>
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
