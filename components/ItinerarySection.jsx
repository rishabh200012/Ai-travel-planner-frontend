"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  generateItinerary,
  regenerateDay,
  addActivity,
  removeActivity,
} from "@/api/trip.api";

export default function ItinerarySection({ trip, setTrip }) {
  const [loading, setLoading] = useState(false);
  const [newActivity, setNewActivity] = useState({});
  const [regeneratingDay, setRegeneratingDay] = useState(null);

  const handleGenerateItinerary = async () => {
    try {
      setLoading(true);

      const response = await generateItinerary(trip._id);

      setTrip(response.trip);

      toast.success("Itinerary generated successfully");
    } catch (error) {
      toast.error("Failed to generate itinerary. Ai is busy");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateDay = async (dayNumber) => {
    try {
      setRegeneratingDay(dayNumber);
      const response = await regenerateDay(trip._id, dayNumber);

      setTrip(response.trip);

      toast.success(response.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to regenerate day. Ai is busy");
    } finally {
      setRegeneratingDay(null);
    }
  };

  const handleAddActivity = async (dayNumber) => {
    const activity = newActivity[dayNumber];

    if (!activity?.trim()) {
      return toast.error("Enter activity");
    }

    try {
      const response = await addActivity(trip._id, {
        day: dayNumber,
        activity,
      });

      setTrip(response.trip);

      setNewActivity((prev) => ({
        ...prev,
        [dayNumber]: "",
      }));

      toast.success(response.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add activity");
    }
  };

  const handleRemoveActivity = async (dayNumber, activityIndex) => {
    try {
      const response = await removeActivity(trip._id, {
        day: dayNumber,
        activityIndex,
      });

      setTrip(response.trip);

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove activity",
      );
    }
  };

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-lg">
      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[3px] text-blue-600">
            AI Generated Plan
          </p>

          <h2 className="mt-2 text-3xl font-bold">Travel Itinerary</h2>

          <p className="mt-2 text-gray-500">
            Organize every day of your trip with AI generated activities.
          </p>
        </div>

        {(!trip.itinerary || trip.itinerary.length === 0) && (
          <button
            onClick={handleGenerateItinerary}
            disabled={loading}
            className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "✨ Generate Itinerary"}
          </button>
        )}
      </div>

      {/* Empty State */}

      {!trip.itinerary || trip.itinerary.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed py-16 text-center">
          <div className="text-7xl">🗺️</div>

          <h3 className="mt-5 text-2xl font-bold">No Itinerary Generated</h3>

          <p className="mx-auto mt-3 max-w-md text-gray-500">
            Click the button above and let AI create a complete travel itinerary
            for you.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {trip.itinerary.map((day) => (
            <div
              key={day.day}
              className="overflow-hidden rounded-2xl border shadow-sm"
            >
              {/* Day Header */}

              <div className="flex flex-col gap-4 bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-blue-100">Travel Day</p>

                  <h3 className="mt-1 text-3xl font-bold">Day {day.day}</h3>
                </div>

                <button
                  onClick={() => handleRegenerateDay(day.day)}
                  disabled={regeneratingDay === day.day}
                  className="rounded-xl cursor-pointer bg-white px-5 py-3 font-semibold text-blue-700 transition hover:scale-105"
                >
                  {regeneratingDay === day.day
                    ? "Regenrating..."
                    : "🔄 Regenerate Day"}
                </button>
              </div>

              {/* Activities */}

              <div className="space-y-4 p-6">
                {/* Activities List */}

                <div className="space-y-3">
                  {day.activities?.length ? (
                    day.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 rounded-2xl border bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                            {index + 1}
                          </div>

                          <div className="space-y-1">
                            <p className="font-semibold text-blue-700">
                              {typeof activity === "object"
                                ? activity.time
                                : "Custom"}
                            </p>

                            <p className="leading-7 text-gray-700">
                              {typeof activity === "object"
                                ? activity.description
                                : activity}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveActivity(day.day, index)}
                          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed py-8 text-center text-gray-500">
                      No activities for this day.
                    </div>
                  )}
                </div>

                {/* Add Activity */}

                <div className="mt-6 rounded-2xl border bg-white p-5">
                  <label className="mb-3 block font-semibold">
                    Add New Activity
                  </label>

                  <div className="flex flex-col gap-3 lg:flex-row">
                    <input
                      type="text"
                      placeholder="Visit museum, Beach walk..."
                      value={newActivity[day.day] || ""}
                      onChange={(e) =>
                        setNewActivity((prev) => ({
                          ...prev,
                          [day.day]: e.target.value,
                        }))
                      }
                      className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      onClick={() => handleAddActivity(day.day)}
                      className="rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
                    >
                      + Add Activity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
