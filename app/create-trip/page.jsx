"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";
import { createTrip } from "@/api/trip.api";

export default function CreateTripPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budgetType: "medium",
    interests: "",
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

      const payload = {
        destination: formData.destination,
        days: Number(formData.days),
        budgetType: formData.budgetType,
        interests: formData.interests.split(",").map((item) => item.trim()),
      };

      const response = await createTrip(payload);

      toast.success(response.message);

      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="container-custom py-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-white shadow-2xl grid lg:grid-cols-2">
          {/* Left */}

          <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-violet-700 via-indigo-600 to-blue-600 p-10 text-white">
            <div className="text-6xl mb-8">🌎</div>

            <h1 className="text-5xl font-bold leading-tight">
              Create Your
              <br />
              Dream Trip
            </h1>

            <p className="mt-6 text-blue-100 leading-8">
              Tell us your destination, travel duration, budget and interests.
              Our AI will generate a complete personalized itinerary.
            </p>

            <div className="mt-10 space-y-4 text-blue-100">
              <p>✈ AI Itinerary</p>

              <p>🏨 Hotel Suggestions</p>

              <p>💰 Budget Planning</p>

              <p>🎒 Packing List</p>
            </div>
          </div>

          {/* Right */}

          <div className="p-8 md:p-12">
            <h2 className="text-4xl font-bold">Create Trip</h2>

            <p className="mt-2 text-gray-500">
              Fill the details below to begin your next adventure.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block mb-2 font-medium">Destination</label>

                <input
                  type="text"
                  name="destination"
                  placeholder="Goa"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Number of Days</label>

                <input
                  type="text"
                  min={1}
                  name="days"
                  placeholder="5"
                  value={formData.days}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Budget</label>

                <select
                  name="budgetType"
                  value={formData.budgetType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="low">Low Budget</option>

                  <option value="medium">Medium Budget</option>

                  <option value="high">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">Interests</label>

                <input
                  type="text"
                  name="interests"
                  placeholder="beaches, food, adventure"
                  value={formData.interests}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-sm text-gray-500">
                  Separate multiple interests with commas.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Trip..." : "Create Trip"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
