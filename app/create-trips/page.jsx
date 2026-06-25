"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    <main className="container-custom section-padding">
      <div className="max-w-xl mx-auto border rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Create Trip</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="days"
            placeholder="Days"
            value={formData.days}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <select
            name="budgetType"
            value={formData.budgetType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="low">Low</option>

            <option value="medium">Medium</option>

            <option value="high">High</option>
          </select>

          <input
            type="text"
            name="interests"
            placeholder="beaches, food, adventure"
            value={formData.interests}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Creating..." : "Create Trip"}
          </button>
        </form>
      </div>
    </main>
  );
}
