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
    <section className="rounded-3xl border bg-white p-8 shadow-lg">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-600">
            Travel Essentials
          </p>

          <h2 className="mt-2 text-3xl font-bold">Packing List</h2>

          <p className="mt-2 text-gray-500">
            AI generated checklist based on your destination and trip duration.
          </p>
        </div>

        {(!trip.packingList || trip.packingList.length === 0) && (
          <button
            onClick={handleGeneratePackingList}
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "🎒 Generate Packing List"}
          </button>
        )}
      </div>

      {/* Empty */}

      {!trip.packingList || trip.packingList.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed py-16 text-center">
          <div className="text-7xl">🎒</div>

          <h3 className="mt-5 text-2xl font-bold">No Packing List Yet</h3>

          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Generate an AI packing checklist so you don't forget anything during
            your journey.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trip.packingList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border bg-slate-50 p-4 transition hover:shadow-md"
            >
              <div className="flex h-10 w-10  shrink-0 items-center justify-center rounded-full bg-green-600 text-lg text-white">
                ✓
              </div>

              <p className="font-medium text-gray-700 wrap-break-word">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
