"use client";

import { useRouter } from "next/navigation";

export default function TripCard({ trip, onDelete }) {
  const router = useRouter();

  return (
    <div className="border rounded-xl p-5">
      <h2 className="text-xl font-bold">{trip.destination}</h2>

      <p className="mt-2">Days: {trip.days}</p>

      <p>Budget: {trip.budgetType}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => router.push(`/trips/${trip._id}`)}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          View
        </button>

        <button
          onClick={() => onDelete(trip._id)}
          className="px-4 py-2 rounded-lg border"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
