"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-gray-200">
      <div className="container-custom h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          AI Travel Planner
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 rounded-lg border">
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
