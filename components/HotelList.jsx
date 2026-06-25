"use client";

export default function HotelsList({ hotels }) {
  if (!hotels || hotels.length === 0) return null;

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">Recommended Hotels</h2>

      <ul className="space-y-2">
        {hotels.map((hotel, index) => (
          <li key={index} className="border p-3 rounded-lg">
            {typeof hotel === "string" ? hotel : hotel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
