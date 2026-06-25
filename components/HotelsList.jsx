"use client";

export default function HotelsList({ hotels }) {
  if (!hotels || hotels.length === 0) return null;

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[3px] text-blue-600 font-semibold">
            Stay
          </p>

          <h2 className="mt-2 text-3xl font-bold">Recommended Hotels</h2>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-3xl text-white shadow-lg">
          🏨
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {hotels.map((hotel, index) => {
          const hotelName = typeof hotel === "string" ? hotel : hotel.name;

          return (
            <div
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl text-white">
                  🛏️
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Recommended
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-800">
                {hotelName}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                AI recommended accommodation based on your destination and
                travel preferences.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  Smart Recommendation
                </span>

                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  AI
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
