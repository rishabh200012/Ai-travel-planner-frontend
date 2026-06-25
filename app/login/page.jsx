"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>

          <p className="text-gray-500 mb-6">Login to continue.</p>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
            />

            <button className="w-full bg-black text-white py-3 rounded-lg">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold underline">
              Register
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
