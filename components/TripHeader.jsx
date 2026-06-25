"use client";

export default function TripHeader({ trip }) {
  return (
    <div className="border rounded-xl p-6">
      <h1 className="text-3xl font-bold">{trip.destination}</h1>

      <div className="mt-4 flex flex-wrap gap-3">
        <span className="border px-3 py-1 rounded-full">{trip.days} Days</span>

        <span className="border px-3 py-1 rounded-full">{trip.budgetType}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {trip.interests?.map((interest, index) => (
          <span
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            {interest}
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Created: {new Date(trip.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
