"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaGoogle,
  FaFacebook,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export default function Signup() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Account created successfully!");
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // The signed-in user info
      const user = result.user;
      console.log("Google sign in successful", user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google sign in error", error);
      setError(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignup = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      // The signed-in user info
      const user = result.user;
      console.log("Facebook sign in successful", user);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Facebook sign in error", error);
      setError(error.message || "Failed to sign in with Facebook");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full min-h-screen">
      {/* Left side - Image */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
        <Image
          src="/signup-image.jpg"
          alt="Sign up"
          className="w-full h-full object-cover"
          width={80}
          height={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 flex items-center justify-center p-8">
          <div className="text-white text-center max-w-4/5">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4 drop-shadow-md">
              Join Our Community
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 drop-shadow">
              Create an account to get started
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-md p-2 sm:p-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Social login buttons */}
          <div className="flex flex-col gap-4 mb-6">
            <button
              className="flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleGoogleSignup}
              disabled={isLoading}
              type="button"
            >
              <FaGoogle className="mr-3 text-xl text-red-600" />
              <span>Continue with Google</span>
            </button>

            <button
              className="flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleFacebookSignup}
              disabled={isLoading}
              type="button"
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

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-500">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={isLoading}
                className="w-full py-3 pl-11 pr-4 border border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

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

            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-500">
                <FaLock />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full py-3 pl-11 pr-10 border border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-4 bg-transparent border-none text-gray-500 cursor-pointer text-base"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="text-sm">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1" />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="py-3 px-4 bg-blue-500 text-white border-none rounded-lg font-medium cursor-pointer transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
