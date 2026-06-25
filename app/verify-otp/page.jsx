"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import { verifyOtp, resendOtp } from "@/api/auth.api";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await verifyOtp({
        email,
        otp,
      });

      toast.success(response.message);

      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);

      const response = await resendOtp(email);

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border bg-white shadow-2xl overflow-hidden">
          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white text-center">
            <div className="text-5xl mb-4">📧</div>

            <h1 className="text-3xl font-bold">Verify Your Email</h1>

            <p className="mt-3 text-blue-100 break-all">
              We've sent a verification code to
            </p>

            <p className="font-semibold mt-2 break-all">{email}</p>
          </div>

          {/* Body */}

          <div className="p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">Enter OTP</label>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4 digit OTP"
                  maxLength={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl tracking-[10px] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={handleResendOtp}
                disabled={resending}
                className="w-full rounded-xl border border-gray-300 bg-white py-4 font-medium transition hover:bg-gray-50 disabled:opacity-60"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Didn't receive the code?
              <br />
              Check your spam folder or resend it.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
