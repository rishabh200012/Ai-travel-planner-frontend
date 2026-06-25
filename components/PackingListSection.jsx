"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { generatePackingList } from "@/api/trip.api";

export default function PackingListSection({ trip, setTrip }) {
  const [loading, setLoading] = useState(false);

  const handleGeneratePackingList = async () => {
    try {
      setLoading(true);

      const response = await generatePackingList(trip._id);

      setTrip((prev) => ({
        ...prev,
        packingList: response.packingList,
      }));

      toast.success("Packing list generated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate packing list",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Packing List</h2>

        {(!trip.packingList || trip.packingList.length === 0) && (
          <button
            onClick={handleGeneratePackingList}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            {loading ? "Generating..." : "Generate Packing List"}
          </button>
        )}
      </div>

      {!trip.packingList || trip.packingList.length === 0 ? (
        <p className="text-gray-500">No packing list generated yet.</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {trip.packingList.map((item, index) => (
            <li key={index} className="border rounded-lg p-3">
              ✓ {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
