"use client";

import { useRouter } from "next/navigation";

export default function TripCard({ trip, onDelete }) {
  const router = useRouter();

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Banner */}

      <div className="h-28 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 relative">
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-3xl font-bold capitalize">{trip.destination}</h2>

          <p className="text-sm text-blue-100 mt-1">
            {trip.days} Day{trip.days > 1 ? "s" : ""} Trip
          </p>
        </div>
      </div>

      {/* Body */}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold capitalize text-blue-700">
            {trip.budgetType} Budget
          </span>

          <span className="text-sm text-gray-500">
            {new Date(trip.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Interests */}

        <div className="mt-6 flex flex-wrap gap-2">
          {trip.interests?.length ? (
            trip.interests.map((interest, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
              >
                {interest}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">No interests selected</span>
          )}
        </div>

        {/* Divider */}

        <div className="my-6 h-px bg-gray-200" />

        {/* Buttons */}

        <div className="flex gap-3">
          <button
            onClick={() => router.push(`/trips/${trip._id}`)}
            className="flex-1 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            View Details
          </button>

          <button
            onClick={() => onDelete(trip._id)}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-medium text-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
