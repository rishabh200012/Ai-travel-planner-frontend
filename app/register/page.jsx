"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { registerUser } from "@/api/auth.api";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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

      const response = await registerUser(formData);

      toast.success(response.message);

      router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border grid lg:grid-cols-2">
          {/* Left Section */}

          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-blue-600 via-indigo-600 to-violet-700 p-12 text-white">
            <div className="text-6xl mb-8">✈️</div>

            <h1 className="text-5xl font-bold leading-tight">
              Plan Smart.
              <br />
              Travel Better.
            </h1>

            <p className="mt-6 text-blue-100 text-lg leading-8">
              Generate AI powered itineraries, discover hotels, estimate budgets
              and create packing lists in just a few seconds.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✔ AI Trip Planner</p>

              <p>✔ Budget Estimation</p>

              <p>✔ Hotel Suggestions</p>

              <p>✔ Packing List Generator</p>
            </div>
          </div>

          {/* Right Section */}

          <div className="flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-bold">Create Account</h2>

              <p className="mt-2 text-gray-500">
                Start planning your next adventure.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block mb-2 font-medium">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3.5 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
