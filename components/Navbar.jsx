"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { logoutUser } from "@/api/auth.api";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify-otp";

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully");

      router.push("/login");

      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="container-custom h-16 flex items-center justify-between">
        {/* Logo */}

        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
            ✈
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Travel</h1>

            <p className="text-xs text-gray-500">Planner</p>
          </div>
        </Link>

        {isAuthPage ? (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`px-4 py-2 rounded-xl transition-all ${
                pathname === "/login"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-5 py-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-xl transition ${
                pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/create-trip"
              className={`px-4 py-2 rounded-xl transition ${
                pathname === "/create-trip"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Create Trip
            </Link>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-red-500 text-white shadow hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
