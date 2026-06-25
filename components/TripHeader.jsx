"use client";

export default function TripHeader({ trip }) {
  return (
    <section className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-600 to-violet-700 text-white shadow-2xl">
      <div className="p-8 md:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-blue-100 text-sm uppercase tracking-[3px]">
              AI Travel Plan
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold capitalize">
              {trip.destination}
            </h1>

            <p className="mt-4 max-w-2xl text-blue-100 leading-7">
              Your personalized travel itinerary with AI generated plans, hotel
              recommendations, budget estimation and packing list.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/20 backdrop-blur-md px-5 py-2 font-medium">
                📅 {trip.days} Day{trip.days > 1 ? "s" : ""}
              </span>

              <span className="rounded-full bg-white/20 backdrop-blur-md px-5 py-2 font-medium capitalize">
                💰 {trip.budgetType} Budget
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-white/15 backdrop-blur-lg p-8 min-w-60">
            <div className="text-6xl text-center">✈️</div>

            <h3 className="mt-5 text-center text-xl font-semibold">
              Ready to Explore
            </h3>

            <p className="mt-3 text-center text-sm text-blue-100">Created on</p>

            <p className="mt-2 text-center font-semibold">
              {new Date(trip.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Interests */}

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">Interests</h3>

          <div className="flex flex-wrap gap-3">
            {trip.interests?.length ? (
              trip.interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm backdrop-blur-md"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-blue-100">No interests selected</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
