"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import { loginUser } from "@/api/auth.api";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      toast.success(response.message);

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border grid lg:grid-cols-2">
          {/* Left Side */}

          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-indigo-700 via-blue-600 to-cyan-500 p-12 text-white">
            <div className="text-6xl mb-8">🌍</div>

            <h1 className="text-5xl font-bold leading-tight">
              Welcome
              <br />
              Back.
            </h1>

            <p className="mt-6 text-blue-100 text-lg leading-8">
              Continue planning your next journey with AI powered itineraries,
              smart hotel recommendations and personalized travel experiences.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✈ AI Trip Planning</p>

              <p>🏨 Hotel Suggestions</p>

              <p>💰 Budget Estimation</p>

              <p>🎒 Packing List Generator</p>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold">Welcome Back</h2>

              <p className="mt-2 text-gray-500">
                Login to continue planning your trips.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block mb-2 font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Password</label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
