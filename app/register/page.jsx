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

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>

          <p className="text-gray-500 mb-6">
            Register to start planning trips.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2">Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2">Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* FORM KE NICHE YAHAN */}

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
